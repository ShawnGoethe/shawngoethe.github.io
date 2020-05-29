---
title: LeetCodeWeek2
date: 2020-04-08 16:44:26
tags:
- Easy
categories:
- LeetCode
---

# Prolem876-Submission Detail

Given a non-empty, singly linked list with head node `head`, return a middle node of linked list.

If there are two middle nodes, return the second middle node.

**Example 1:**

```
Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])
The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
```

**Example 2:**

```
Input: [1,2,3,4,5,6]
Output: Node 4 from this list (Serialization: [4,5,6])
Since the list has two middle nodes with values 3 and 4, we return the second one.
```

**Note:**

- The number of nodes in the given list will be between `1` and `100`.

## key

题目输出单向链表的中间元素，有这么几个思路

- O(N)-->遍历放数组，1/2输出`return A[t / 2]`
- O(N)-->根据中间特点，mid前进一格，end前进两格

## Solution

第一次提交:0ms

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode mid = head;
        ListNode end = head;
        int i=0;
        while(end.next!=null){
            mid = head.next;
            ListNode tmp = mid;
            i++;
            int j=i;
            while(j>0){//搞复杂了
                if(tmp.next==null)return mid;
                end = tmp.next;
                tmp=tmp.next;
                j--;
            }
            head=head.next;
        }
        return mid;
        
    }
}
```

第二次参考其他代码-提交：

```
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode mid = head, end = head;
        while (mid != null && end.next != null) {
            mid = mid.next;
            end = end.next.next;
        }
        return mid;
    }
}
```



