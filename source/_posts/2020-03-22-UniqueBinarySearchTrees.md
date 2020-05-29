---
title: UniqueBinarySearchTrees
date: 2020-03-22 12:37:47
tags:
- Medium
categories:
- LeetCode
---
# Problem 96
Given *n*, how many structurally unique **BST's** (binary search trees) that store values 1 ... *n*?

**Example:**

```
Input: 3
Output: 5
Explanation:
Given n = 3, there are a total of 5 unique BST's:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```

# Solution

题目其实相对比较简单，给出1~n，给出能够成的BST的数目，题目一开始的想法是用1~n去生成BST，看一下有多少种情况，然后做了很多无用功=.=

越写越不对劲后来查了一下，这道题是有数学规律的

BST有几个特点

- 中序遍历依次增（大于等于）
- 左右自述也是BST（recursion）

所以在i作为根节点时，左子树i-1个节点，右子树n-i个节点

数学的思想在于**唯一二叉树的个数为左子树结点的个数乘以右子树的个数。而根节点可以从1到n 中选择**，所以有

> for(int i=1;i<=n;++i)
>            sum+=numTrees(i-1)*numTrees(n-i);

再加上边际控制n<=1-->sum=1



就有了解题的代码：

```java
class Solution {
    public int numTrees(int n) {
        if(n<=1)    return 1;
        int sum=0;
        for(int i=1;i<=n;++i)
            sum+=numTrees(i-1)*numTrees(n-i);

        return sum;    
    }
}
```

## Solution 95 Unique Binary Search Trees II

万幸，自己折腾的生成BST的代码没白写

Given an integer *n*, generate all structurally unique **BST's** (binary search trees) that store values 1 ... *n*.

**Example:**

```
Input: 3
Output:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
Explanation:
The above output corresponds to the 5 unique BST's shown below:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```

看题目是前序遍历,我们从上向下查找，外面一层大循环遍历根节点

> for(int i=start ;i<=end;i++){}

确定了i节点后可以通过递归写出根节点i的情况下的左右子树

>  List<TreeNode> leftChild = recursion(start, i - 1);
>
> List<TreeNode> rightChild = recursion(i + 1, end);

然后遍历左右子树的每个元素，两层for循环嵌套

>   for(TreeNode left : leftChild) {
>                 for(TreeNode right : rightChild) {
>                     TreeNode root = new TreeNode(i);
>                     root.left = left;
>                     root.right = right;
>                     res.add(root);
>                 }
>             }

得到最后的res进行返回，以及处理一下start>end的边际条件就完成了

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<TreeNode> generateTrees(int n) {
         if(n < 1)
            return new ArrayList<TreeNode>();
        return recursion(1, n);
    }
    public List<TreeNode> recursion(int start,int end){
        List<TreeNode> res = new ArrayList();
        if(start > end) {
            res.add(null);
            return res;
        }
        for(int i = start;i<=end;i++){
            List<TreeNode> leftChild = recursion(start, i - 1);
            List<TreeNode> rightChild = recursion(i + 1, end);
            for(TreeNode left : leftChild) {
                for(TreeNode right : rightChild) {
                    TreeNode root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    res.add(root);
                }
            }
        }
        return res;
    }
}
```

问题当时卡在   

List<TreeNode> leftChild = recursion(start, i - 1);
List<TreeNode> rightChild = recursion(i + 1, end);

当然采用recursion虽然简洁易懂，但两条题目的复杂度都相对较高，是递归的压栈造成的，很多可能相同点的地方可能计算了两遍，导致了两道题目都是打败了5%的solution，当然我们可以通过dp(来自LeetCode)的方式来进行完成

```java
class Solution {
    public List<TreeNode> generateTrees(int n) {
        if(n == 0)
            return new ArrayList<>();
        List<TreeNode>[][] dp = new ArrayList[n][n];
        return helper(1, n, dp);
    }
    private List<TreeNode> helper(int start, int end, List<TreeNode>[][] dp){
        List<TreeNode> res = new ArrayList<>();
        if(start > end){
            res.add(null);
            return res;
        }
        
        if(dp[start - 1][end - 1] != null && !dp[start - 1][end - 1].isEmpty()){
            return dp[start - 1][end - 1];
        }

        for (int i = start ; i <= end ; i++) {
            List<TreeNode> left = helper(start, i - 1, dp);
            List<TreeNode> right = helper(i + 1, end, dp);
            for(TreeNode a : left){
                for(TreeNode b : right){
                    TreeNode node = new TreeNode(i);
                    node.left = a;
                    node.right = b;
                    res.add(node);
                }
            }
        }
        return dp[start - 1][end - 1] = res;
        
    }
}
```

