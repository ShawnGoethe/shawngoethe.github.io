---
title: LeetCodeWeek1
date: 2020-04-05 22:32:05
tags:
- Easy
categories:
- LeetCode
---

# Problem  Single Number

好久没有刷题了，刚好遇到LeetCode，30天计划，打算强迫自己完成

Given a **non-empty** array of integers, every element appears *twice* except for one. Find that single one.

**Note:**

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**Example 1:**

```
Input: [2,2,1]
Output: 1
```

**Example 2:**

```
Input: [4,1,2,1,2]
Output: 4
```

# Key

思路

- 第一个思路O(n^2)去做类似于冒泡遍历的办法
- 借助Array.sort()可以迅速排序，然后O(n)的办法遍历得到结果
- （以上是自己的思路，以下为LeetCode代码思考）
- [通过异或操作迅速比较](## 异或)
- 通过 Arrays.stream(nums).reduce(0, (x, y) -> x ^ y)来更快迭代每个元素



## Array.steam()

以下参考[CSDN](<https://blog.csdn.net/a13662080711/article/details/84928181>)

Stream 不是集合元素，它不是数据结构并不保存数据，它是有关算法和计算的，它更像一个高级版本的 Iterator。原始版本的 Iterator，用户只能显式地一个一个遍历元素并对其执行某些操作；高级版本的 Stream，用户只要给出需要对其包含的元素执行什么操作，比如 “过滤掉长度大于 10 的字符串”、“获取每个字符串的首字母”等，Stream 会隐式地在内部进行遍历，做出相应的数据转换。

Stream 就如同一个迭代器（Iterator），单向，不可往复，数据只能遍历一次，遍历过一次后即用尽了，就好比流水从面前流过，一去不复返。

而和迭代器又不同的是，Stream 可以并行化操作，迭代器只能命令式地、串行化操作。顾名思义，当使用串行方式去遍历时，每个 item 读完后再读下一个 item。而使用并行去遍历时，数据会被分成多个段，其中每一个都在不同的线程中处理，然后将结果一起输出。Stream 的并行操作依赖于 Java7 中引入的 Fork/Join 框架（JSR166y）来拆分任务和加速处理过程

简单说，对 Stream 的使用就是实现一个 filter-map-reduce 过程，产生一个最终结果，或者导致一个副作用（side effect）。

（以下为个人理解）

相对于Java中的Stream流，Java中也有，比如Array.reduce(),Array.foreach()等，通过回调函数的方式进行，

## 异或

|=：两个二进制对应位都为0时，结果等于0，否则结果等于1；

&=：两个二进制的对应位都为1时，结果为1，否则结果等于0；

^=：两个二进制的对应位相同，结果为0，否则结果为1。

对于这道题来说，[2,2,1]

第零次遍历：init res=0,题目要求找出出现一次的数，所以这个数肯定存在

第一次遍历：res=2

第二次遍历：res=0，因为res^=2（即res=res^2）

第三次遍历：res=1结束遍历



**综上：常用^= 以及>>位运算符，C级别的性能**

# Solution

- 对于异或方法（0ms）

```java
class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        
        for (int n : nums) {
            result ^= n;
        }
        return result;
    }
}
```

自己的方法就不贴了。。==感觉好蠢==写了半天。

# Problem  Move Zeroes

Given an array `nums`, write a function to move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

**Example:**

```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Note**:

1. You must do this **in-place** without making a copy of the array.
2. Minimize the total number of operations.

# Solution

第一版：

```java
class Solution {
    public void moveZeroes(int[] nums) {
          for(int i=0;i<nums.length;i++){
            if(nums[i]==0){
                for(int j=i;j<nums.length-1;j++){
                    nums[j]=nums[j+1];
                }
                nums[nums.length-1]=0;
            }
        }
    }
}
```

原本根据题目的意思，想法就是找到一个0，整体往前移动一位，一把梭，但写完发现，**本身没有必要整体前移**，因为我的判断是num[i]是不是为0，所以只需要将0的个数记录下来，非0的元素前移，最后补0就可以了

第二版

```
class Solution {
    public void moveZeroes(int[] nums) {
         if (nums == null || nums.length == 0) return;        
 
        int insertPos = 0;
        for (int num: nums) {
            if (num != 0) nums[insertPos++] = num;
        }        

        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}
```
# Problem Best Time to Buy and Sell Stock II
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:

Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
# key
题目获取最大利润，本以为是通过动态规划DP来做，但是仔细一想，差值就能解决问题
```
class Solution {
    public int maxProfit(int[] prices) {
        int res = 0;
        for (int i = 0; i < prices.length - 1; ++i) {
            if (prices[i] < prices[i + 1]) {
                res += prices[i + 1] - prices[i];
            }
        }
        return res;
    }
}
```
# Problem happy Number

Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

**Example:** 

```
Input: 19
Output: true
Explanation: 
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

# Solution

第一版

```
class Solution {
    public boolean isHappy(int n) {
         int sum =0;
        while (sum != 1) {
            if(sum!=0){
                n=sum;sum=0;
            }
            while (n > 0) {
                int t = n % 10;
                sum += t * t;
                n /= 10;
            }
            if(sum==0)return false;
        }
        return true;
       
    }
}
```
其实写完这个框架我就想起来了，可能在计算上存在死循环，就比如

![在这里插入图片描述](../img/aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMjAyL2ltYWdlMi5wbmc.jfif)

如果这样的题目就进入了死循环，所以干脆直接通过hashset的方式进行过滤

添加了

```java
if(set.contains(sum)){
    return false;
}else{
    set.add(sum);
}
```

整体代码如下：

Runtime: 5 ms, faster than 9.41% of Java online submissions for Happy Number.

```java
    public boolean isHappy(int n) {
        Set<Integer> set = new HashSet<>();
        int sum =0;
        while (sum != 1) {
            if(sum!=0){
                n=sum;sum=0;
            }
            while (n > 0) {
                int t = n % 10;
                sum += t * t;
                n /= 10;
            }
            if(sum==0)return false;
            if(set.contains(sum)){
                return false;
            }else{
                set.add(sum);
            }
        }
        return true;

    }
```

