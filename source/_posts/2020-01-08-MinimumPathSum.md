---
title: 2020-01-08-MinimunPathSum
date: 2020-01-08 22:42:06
tags:
- Medium
categories:
- LeetCode
---

# Leetcode-64
```
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
```

# solution 

解法为简单的动态规划，只要找到比较该元素，上方和左方的值的最小值，然后与该值相加，就可以得到解

```
class Solution {
    public int minPathSum(int[][] grid) {
        for(int i=1; i<grid.length; i++) grid[i][0] += grid[i-1][0];
        for(int j=1; j<grid[0].length; j++) grid[0][j] += grid[0][j-1];
        for (int i=1; i<grid.length; i++) {
            for (int j=1; j<grid[0].length; j++) {
                grid[i][j] = Math.min(grid[i][j-1], grid[i-1][j]) + grid[i][j];
            }
        }
        return grid[grid.length-1][grid[0].length-1];
    }
}
```

