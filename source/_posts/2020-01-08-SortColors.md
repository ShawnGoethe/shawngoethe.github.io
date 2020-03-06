---
title: 2020-01-08-SortColors
date: 2020-01-08 22:42:06
tags:
- Medium
categories:
- LeetCode
---

# Leetcode-75
```
Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Follow up:

A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
Could you come up with a one-pass algorithm using only constant space?
```

# solution 

题目乍一看非常简单,但确实说使用简单的sort方法以及o(n^2)的排序确实会浪费时间复杂度，本着好奇心，我试了一下，果然成了吊车尾

```java
class Solution {
    public void sortColors(int[] nums) {
        for(int i =0;i<nums.length-1;i++){
            for(int j=i+1;j<nums.length;j++){
                if(nums[i]>nums[j]){
                    int tmp=nums[i];
                    nums[i]=nums[j];
                    nums[j]=tmp;
                }
            }
        }
    }
}
Runtime: 1 ms, faster than 6.35% of Java online submissions for Sort Colors.
```
该题优化的核心位置是该数组是一个一维数组，设置两个指针，左边遍历0，遇到0往左放，遇到2往右放，r和l为左右分界线，index记录最后一个0的位置
```java
class Solution {
    public void sortColors(int[] nums) {
        int l = 0;
        int r = nums.length - 1;
        int index = 0;
        while(l <= r) {
            if(nums[l] == 0) {
                if(l > index) {
                    int tmp = nums[index];
                    nums[index] = nums[l];
                    nums[l] = tmp;
                    index++;
                }
                else {
                    l++;
                    index++;
                }
            }
            else if(nums[l] == 2) {
                int tmp = nums[r];
                nums[r] = 2;
                nums[l] = tmp;
                r--;
            }
            else l++;
        }
        
    }
}
```

