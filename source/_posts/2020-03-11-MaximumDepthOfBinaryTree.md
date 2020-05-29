---
etitle: MaximumDepthOfBinaryTree
date: 2020-03-11 17:47:55
tags:
- Easy
categories:
- LeetCode
---
# Prolem 104

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Note:** A leaf is a node with no children.

**Example:**

Given binary tree `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

return its depth = 3.

## key

判断树的深浅，采用

> int left = max(root.left);
> **int** right = max(root.right);
> **return** Math.max(left,right) + 1; 

> //或者简写
>
> return Math.max(max(root.left) + 1, max(root.right) + 1);

进行递归

> Runtime: 0 ms, faster than 100.00% of Java online submissions for Maximum Depth of Binary Tree.
>
> Memory Usage: 39.2 MB, less than 94.62% of Java online submissions for Maximum Depth of Binary Tree.

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
    public int maxDepth(TreeNode root) {
         return max(root);
    }
    public int max(TreeNode root){
        if (root == null) {
            return 0;
        }
        return Math.max(max(root.left) + 1, max(root.right) + 1);
    }
}
```

