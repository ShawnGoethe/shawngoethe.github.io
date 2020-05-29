---
title: Construct Binary Tree from Preorder and Inorder Traversal
date: 2020-03-08 11:31:16
tags:
- Medium
categories:
- LeetCode
---

# Problem105

Given preorder and inorder traversal of a tree, construct the binary tree.

**Note:**
You may assume that duplicates do not exist in the tree.

For example, given

```
preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
```

Return the following binary tree:

```
    3
   / \
  9  20
    /  \
   15   7
```

## key

 题目是一个根据前序中序，生成二叉树的题目

前序遍历有个特点：根节点在前面，root -left-right

则遍历到3作为root，根据中序可以知道左子树是9，右子树是15 20 7

然后遍历9作为root，根据中序得到没有左子树，没有右子树

然后遍历20作为root，依次类推可以得到

```
TreeNode root = new TreeNode(rootVal);
root.left = buildTree(pre, preStart+1, preStart+len, in, inStart, rootIndex-1);
root.right = buildTree(pre, preStart+len+1, preEnd, in, rootIndex+1, inEnd);
```

其中insort比较好理解，确定root后

左子树在inStart, rootIndex-1之间

右子树在rootIndex+1, inEnd之间



对于presort

int len = rootIndex - inStart;获得root的左子树长度（根据中序获取rootIndex）

左子树在preStart+1, preStart+len之间

右子树在preStart+len+1, preEnd之间

## Solution

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
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return buildTree(preorder, 0, preorder.length-1, inorder, 0, inorder.length-1);
    }
    public TreeNode buildTree(int[] pre, int preStart, int preEnd, int[] in, int inStart, int inEnd){
        if(inStart > inEnd || preStart > preEnd)
            return null;

        int rootVal = pre[preStart];
        int rootIndex = 0;
        for(int i = inStart; i <= inEnd; i++){
            if(in[i] == rootVal){
                rootIndex = i;
                break;
            }
        }

        int len = rootIndex - inStart;
        TreeNode root = new TreeNode(rootVal);
        root.left = buildTree(pre, preStart+1, preStart+len, in, inStart, rootIndex-1);
        root.right = buildTree(pre, preStart+len+1, preEnd, in, rootIndex+1, inEnd);

        return root;
    }
}
```

## tip

参考于百度，在递归条件乱了