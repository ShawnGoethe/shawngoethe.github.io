---
title: MaximumSubarray
date: 2019-03-10 21:39:50
tags:
categories:
- LeetCode
---
# problem
> Maximum Subarray
>
> Easy
>
> Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
>
> **Example:**
>
> ```
> Input: [-2,1,-3,4,-1,2,1,-5,4],
> Output: 6
> Explanation: [4,-1,2,1] has the largest sum = 6.
> ```
>
> **Follow up:**
>
> If you have figured out the O(*n*) solution, try coding another solution using the divide and conquer approach, which is more subtle.

# key

我们定义一个和为第一位数，然后用curSum来保存递增量

ps ans-->answer  cur-->cursor

# solution

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int ans=nums[0], curSum=0;
        
        for (int i=0; i<nums.length; i++) {
            curSum = curSum + nums[i];
            ans = Math.max(ans, curSum);
            curSum = Math.max(0, curSum);
        }
        
        return ans;
    }
}
```

# perfect

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int dp = nums[0], maxSum=nums[0];
        for (int i=1; i<nums.length; i++) {
            dp = dp<0?nums[i]:nums[i]+dp;
            maxSum=Math.max(maxSum, dp);
        }
        return maxSum;
    }
}
```

