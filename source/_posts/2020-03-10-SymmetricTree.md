---
title: SymmetricTree
date: 2020-03-10 18:33:33
tags:
- Easy
categories:
- LeetCode
---

# Problem101

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree `[1,2,2,3,4,4,3]` is symmetric:

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

 

But the following `[1,2,2,null,3,null,3]` is not:

```
    1
   / \
  2   2
   \   \
   3    3
```

 

**Note:**
Bonus points if you could solve it both recursively and iteratively.

## key 

一道验证树是否是对称的问题，主要采取递归的方法

```
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
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root,root);
    }
    public boolean isMirror(TreeNode root,TreeNode self){
        if(root==null && self==null)return true;
        if(root==null ||self==null) return false;
        return root.val==self.val && isMirror(root.left,self.right)&&isMirror(root.right,self.left);
        
    }
}
```

