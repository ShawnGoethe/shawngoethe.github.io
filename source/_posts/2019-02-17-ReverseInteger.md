---
title: ReverseInteger
date: 2019-02-17 12:38:41
tags:
categories:
- LeetCode
---
# Problem
Given a 32-bit signed integer, reverse digits of an integer.

Example 1:

Input: 123
Output: 321
Example 2:

Input: -123
Output: -321
Example 3:

Input: 120
Output: 21
Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

# Solution

```java
class Solution {
    public int reverse(int x) {
		if (x == 0) {
			return 0;
		}
		int result =0;
		long result_l = 0;
		while (x != 0) {
			result_l = result_l * 10 + x % 10;
			x = x / 10;
		}
		
		if(result_l >= Integer.MAX_VALUE||result_l <= Integer.MIN_VALUE) {
			return 0;
		}else {
			result = (int) result_l;
		}
		return result;
    }
}
```

# keys

1.倒序很简单，取余赋给新数就可以了，不过注意JavaScript或者Python的int-->float的情况

2.题目下面其实提示了int的范围，改题目1032个测试数据，有大概7个是超范围的验证数据，所以java中可以巧利用Integer.MAX来进行处理。

# perfect

```java
public int reverse(int x) {
        long res = 0;
        while (x != 0) {
            res = res * 10 + x % 10;
            x = x / 10;
        }
        return (int)res == res ? (int)res : 0;
    }
```

