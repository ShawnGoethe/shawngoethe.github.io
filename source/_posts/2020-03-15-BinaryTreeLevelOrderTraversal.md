---
layout: 2020-03-15-Binary Tree Level Order Traversal
title: Traversal
date: 2020-03-15 17:23:39
tags:
- Medium
categories:
- LeetCode
---

# Problem 102 107

Given a binary tree, return the *level order* traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```



return its level order traversal as:

```
[
  [3],
  [9,20],
  [15,7]
]
```

# Solution

key：

- 层序遍历
- 递归

在Java中可以先定义一个List保存结果,List里面再嵌入ArrayList来记录每一层的数据

> List<List<Integer>> res = new ArrayList<>();
>
> res.add(new ArrayList<>());

将递归中的root节点追加进入res.get(level)的数组中

>   res.get(level).add(root.val);

通过递归完成算法

> travelsal(root.left,level+1);
travelsal(root.right,level+1);


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
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> levelOrder(TreeNode root) {
        travelsal(root, 0);
        return  res;
    }

    private void travelsal(TreeNode root,int level) {
        if(root==null){
            return;
        }
        if(level==res.size()){
            res.add(new ArrayList<>());
        }
        res.get(level).add(root.val);
        travelsal(root.left,level+1);
        travelsal(root.right,level+1);
    }
}
```

---

接下来是107，是102的变种，改成了叶节点开始遍历

difficulty：Easy

Given a binary tree, return the *bottom-up level order* traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

return its bottom-up level order traversal as:

```
[
  [15,7],
  [9,20],
  [3]
]

```
# key
题目本身没有设置太多的难度，我们只需要将**level**实现数组的内层数组的倒序就可以了
>  res.get(level).add(root.val);
>  change this code to 
>  res.get(res.size()-i-1).add(root.val);

原本判断新增数组的语句变成在第0个位置新增一个数组

> if(i >= res.size()){
>     res.add(0,new ArrayList<Integer>());
>}