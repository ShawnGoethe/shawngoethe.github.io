---
title: BinaryTreeInorderTraversal
date: 2020-03-06 11:55:16
tags:
- Medium
categories:
- LeetCode
---

# Problem94

Given a binary tree, return the *inorder* traversal of its nodes' values.

> 给定一二叉树，中序遍历输出
>
> ps:preorder,inorder,postorder，前中后

# Key

## recursive approach

利用递归解决B树的遍历问题，这种问题的代码其实大同小异，前中后的遍历输出，只需要调整递归部分即可

```java
//preorder
public void preorder(node t)
	if (t != null) {
		System.out.print(t.value + " ");
		preorder(t.left);
		preorder(t.right);
	}
}
//inorder
public void inorder(node t)
{
	if (t != null) {
		inorder(t.left);
		System.out.print(t.value + " ");
		inorder(t.right);
	}
}
//postorder
public void postorder(node t)
{
    if (t != null) {
        postorder(t.left);
        postorder(t.right);
        System.out.print(t.value + " ");
    }
}
//leverorder

```

Solution

>Runtime: 0 ms, faster than 100.00% of Java online submissions for Binary Tree Inorder Traversal.
>
>Memory Usage: 37.9 MB, less than 5.11% of Java online submissions for Binary Tree Inorder Traversal.

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List < Integer > res = new ArrayList < > ();
        inorder(root, res);
        return res;
    }
     public void inorder(TreeNode root, List < Integer > res) {
        if (root != null) {
            inorder(root.left, res);
            res.add(root.val);
            inorder(root.right, res);
        }
    }
}
```

Complexity Analysis

- Time complexity : O(n)*O*(*n*). The time complexity is O(n)*O*(*n*) because the recursive function is T(n) = 2 \cdot T(n/2)+1*T*(*n*)=2⋅*T*(*n*/2)+1.
- Space complexity : The worst case space required is O(n)*O*(*n*), and in the average case it's O(\log n)*O*(log*n*) where n*n* is number of nodes.

## stack

solution还提供了另外一种方法通过stack pop的方式来完成：

[<https://leetcode.com/problems/binary-tree-inorder-traversal/solution/>](<https://leetcode.com/problems/binary-tree-inorder-traversal/solution/>)

## Morris

同上