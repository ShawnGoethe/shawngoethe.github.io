---
title: 2020-01-03-SearchInsertPosition
date: 2020-01-03 17:01:03
tags:
- easy
categories:
- LeetCode
---

# LeetCode38

Easy

Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

**Example 1:**

```
Input: [1,3,5,6], 5
Output: 2
```

**Example 2:**

```
Input: [1,3,5,6], 2
Output: 1
```

**Example 3:**

```
Input: [1,3,5,6], 7
Output: 4
```

**Example 4:**

```
Input: [1,3,5,6], 0
Output: 0
```

离职后的第一题想先简单点热个身（后面有个难的目前还没做出来），就是说给一个target，返回它在数组中的位置

# How

该题目一上脑子就可以写下如下的代码

```java
public int searchInsert(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    if (target > nums[nums.length - 1]) {
        return nums.length;
    }
    int pos =1;
    for(int i =0;i<nums.length-1;i++){
         if(nums[i]<target && nums[i+1]>=target){
            pos = ++i;
            break;
        }
    }
    return  pos;
}
```

但转念一想，题目中给定的是一个sorted array这是一个优化的切口，可以将O(n)的复杂度降低到O(logn),通过递归来拆解完成这道题

```java
private int searchInsert(int[] nums, int target, int low, int high) {
        int mid = (low+high)/2;
        
        if (target < nums[mid]) {
            if (mid == 0 || target > nums[mid-1]) {
                return mid;
            }
            return searchInsert(nums, target, low, mid-1);
        }
        
        if (target > nums[mid]) {
            if (mid == nums.length-1 || target < nums[mid+1]) {
                return mid+1;
            }
            return searchInsert(nums, target, mid+1, high);
        }
        
        return mid;
    }
```

