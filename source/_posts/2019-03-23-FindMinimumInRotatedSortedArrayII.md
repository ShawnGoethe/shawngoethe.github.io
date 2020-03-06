---
title: FindMinimumInRotatedSortedArrayII
date: 2019-03-23 11:56:47
tags:
- Hard
categories:
- LeetCode
---
# problem

>154. Find Minimum in Rotated Sorted Array II
>
>Hard
>
>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
>
>(i.e.,  `[0,1,2,4,5,6,7]` might become  `[4,5,6,7,0,1,2]`).
>
>Find the minimum element.
>
>The array may contain duplicates.
>
>**Example 1:**
>
>```
>Input: [1,3,5]
>Output: 1
>```
>
>**Example 2:**
>
>```
>Input: [2,2,2,0,1]
>Output: 0
>```
>
>**Note:**
>
>- This is a follow up problem to [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/).
>- Would allow duplicates affect the run-time complexity? How and why?

# key

???

# solution

```java
class Solution {
    public int findMin(int[] nums) {
		for (int i = 0; i < nums.length - 1; i++) {
			if (nums[i] > nums[i + 1]) {
				return nums[i + 1];
			}
		}
		return nums[0];
	}
}
```



# perfect

