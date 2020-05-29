---
title: LeetCodeWeek2
date: 2020-04-19 13:23:52
tags:
- Easy
categories:
- LeetCode
---

# Problem Product of Array Except Self

Given an array `nums` of *n* integers where *n* > 1,  return an array `output` such that `output[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

**Example:**

```
Input:  [1,2,3,4]
Output: [24,12,8,6]
```

**Constraint:** It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

**Note:** Please solve it **without division** and in O(*n*).

**Follow up:**
Could you solve it with constant space complexity? (The output array **does not** count as extra space for the purpose of space complexity analysis.)

## key

## solution

```
//3ms
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int sum =1;
        int hasZero =0;
        for(int num :nums){
            if(num!=0){
                sum*=num;
            }else{
                hasZero++;
            }
        }

        for(int i=0;i<nums.length;i++){
            if(hasZero>=2){
                nums[i]=0;
            }else if(hasZero==1){
                if(nums[i]==0){
                    nums[i]=sum;
                }else{
                    nums[i]=0;
                }
            }else{
                nums[i]=sum/nums[i];
            }
        }
        return nums;
    }
}
```

```
//1ms
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        left[0] = 1;
        for (int i = 1; i < n; i++) {
            left[i] = left[i-1] * nums[i-1];
        }
        int product = 1;
        for (int i = n - 1; i >= 0; i--) {
            left[i] *= product;
            product *= nums[i];
        }
        return left;
    }
}
```



# Problem-678Valid Parenthesis String

**Medium**

Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

1. Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
2. Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
3. Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
4. `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string.
5. An empty string is also valid.



**Example 1:**

```
Input: "()"
Output: True
```



**Example 2:**

```
Input: "(*)"
Output: True
```



**Example 3:**

```
Input: "(*))"
Output: True
```



**Note:**

1. The string size will be in the range [1, 100].

## key

## solution

```java
class Solution {
    public boolean checkValidString(String s) {
        if (s.length() == 0) return true;
        int left = 0;int star=0;
        char[] c = s.toCharArray();
        for (char i : c) {
            switch (i) {
                case '(':
                    left++;
                    break;
                case ')':
                    left--;
                    break;
                case '*':
                    star++;
                    break;
                default:
                    break;
            }
        }
        if (left == 0 || left - star == 0 || left + star == 0) return true;
        return false;
    }
}
```
## Brute Force
```java
 
 class Solution {
    boolean ans = false;

    public boolean checkValidString(String s) {
        solve(new StringBuilder(s), 0);
        return ans;
    }

    public void solve(StringBuilder sb, int i) {
        if (i == sb.length()) {
            ans |= valid(sb);
        } else if (sb.charAt(i) == '*') {
            for (char c: "() ".toCharArray()) {
                sb.setCharAt(i, c);
                solve(sb, i+1);
                if (ans) return;
            }
            sb.setCharAt(i, '*');
        } else
            solve(sb, i + 1);
    }

    public boolean valid(StringBuilder sb) {
        int bal = 0;
        for (int i = 0; i < sb.length(); i++) {
            char c = sb.charAt(i);
            if (c == '(') bal++;
            if (c == ')') bal--;
            if (bal < 0) break;
        }
        return bal == 0;
    }
}
```

#### Dynamic Programming

```java
class Solution {
    public boolean checkValidString(String s) {
        int n = s.length();
        if (n == 0) return true;
        boolean[][] dp = new boolean[n][n];

        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '*') dp[i][i] = true;
            if (i < n-1 &&
                    (s.charAt(i) == '(' || s.charAt(i) == '*') &&
                    (s.charAt(i+1) == ')' || s.charAt(i+1) == '*')) {
                dp[i][i+1] = true;
            }
        }

        for (int size = 2; size < n; size++) {
            for (int i = 0; i + size < n; i++) {
                if (s.charAt(i) == '*' && dp[i+1][i+size] == true) {
                    dp[i][i+size] = true;
                } else if (s.charAt(i) == '(' || s.charAt(i) == '*') {
                    for (int k = i+1; k <= i+size; k++) {
                        if ((s.charAt(k) == ')' || s.charAt(k) == '*') &&
                                (k == i+1 || dp[i+1][k-1]) &&
                                (k == i+size || dp[k+1][i+size])) {
                            dp[i][i+size] = true;
                        }
                    }
                }
            }
        }
        return dp[0][n-1];
    }
}
```

## Greedy

```java
class Solution {
    public boolean checkValidString(String s) {
       int lo = 0, hi = 0;
       for (char c: s.toCharArray()) {
           lo += c == '(' ? 1 : -1;
           hi += c != ')' ? 1 : -1;
           if (hi < 0) break;
           lo = Math.max(lo, 0);
       }
       return lo == 0;
    }
}
```

