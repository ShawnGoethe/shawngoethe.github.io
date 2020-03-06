---
title: ShoppingOffers
date: 2019-03-02 11:00:46
tags:
categories:
- LeetCode
---
# problem

> In LeetCode Store, there are some kinds of items to sell. Each item has a price.
>
> However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price.
>
> You are given the each item's price, a set of special offers, and the number we need to buy for each item. The job is to output the lowest price you have to pay for **exactly** certain items as given, where you could make optimal use of the special offers.
>
> Each special offer is represented in the form of an array, the last number represents the price you need to pay for this special offer, other numbers represents how many specific items you could get if you buy this offer.
>
> You could use any of special offers as many times as you want.

# examples

> **Example 1:**
>
> ```
> Input: [2,5], [[3,0,5],[1,2,10]], [3,2]
> Output: 14
> Explanation: 
> There are two kinds of items, A and B. Their prices are $2 and $5 respectively. 
> In special offer 1, you can pay $5 for 3A and 0B
> In special offer 2, you can pay $10 for 1A and 2B. 
> You need to buy 3A and 2B, so you may pay $10 for 1A and 2B (special offer #2), and $4 for 2A.
> ```
>
> **Example 2:**
>
> ```
> Input: [2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1]
> Output: 11
> Explanation: 
> The price of A is $2, and $3 for B, $4 for C. 
> You may pay $4 for 1A and 1B, and $9 for 2A ,2B and 1C. 
> You need to buy 1A ,2B and 1C, so you may pay $4 for 1A and 1B (special offer #1), and $3 for 1B, $4 for 1C. 
> You cannot add more items, though only $9 for 2A ,2B and 1C.
> ```

# solution

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ShoppingOffers {
	public static void main(String[] args) {
	/*以下贴出测试方式，因为对ArrayList不熟悉，如有更好的方式，欢迎指出*/
		List<Integer> price = new ArrayList<Integer>();
		List<List<Integer>> special = new ArrayList<List<Integer>>();
		List<Integer> needs = new ArrayList<Integer>();
		price.add(0, 2);price.add(1, 5);
		Integer[][] arr = new Integer[][] {{3,0,5},{1,2,10}};
		special.add((List<Integer>)Arrays.asList(arr[0]));
		special.add((List<Integer>)Arrays.asList(arr[1]));
		needs.add(0,3);needs.add(1,2);
		ShoppingOffers so = new ShoppingOffers();
		int res = so.shoppingOffers(price, special, needs);
		System.out.println(res);
	}
	public  int shoppingOffers(List < Integer > price, List < List < Integer >> special, List < Integer > needs) {
        return shopping(price, special, needs);
    }
    public  int shopping(List < Integer > price, List < List < Integer >> special, List < Integer > needs) {
        int j = 0, res = dot(needs, price);
        for (List < Integer > s: special) {
            ArrayList < Integer > clone = new ArrayList < > (needs);
            for (j = 0; j < needs.size(); j++) {
                int diff = clone.get(j) - s.get(j);
                if (diff < 0)
                    break;
                clone.set(j, diff);
            }
            if (j == needs.size())
                res = Math.min(res, s.get(j) + shopping(price, special, clone));
        }
        return res;
    }
    public int dot(List < Integer > needs, List < Integer > price) {
        int sum = 0;
        for (int i = 0; i < needs.size(); i++) {
            sum += needs.get(i) * price.get(i);
        }
        return sum;
    }
}
```



# key

本题目采用动态规划的思路，我们带入测试样例1的

>```
>Input: [2,5], [[3,0,5],[1,2,10]], [3,2]
>即A=$2,B=$5
>3A=5$,1A+2B=10$
>需购买3A+2B
>```

| 尝试                                                         | price        |
| :----------------------------------------------------------- | ------------ |
| 1:单买                                                       | 16           |
| 2单买302套餐，还差2个B，则先算出2B的res为10，先试305套餐，A买超了，则退出305套餐，此时还有1210套餐，A买多了，退出套餐，两个套餐试完了，得到了单买两个B，$10的套餐，总价就为15元， | 15（覆盖16） |
| 3单买1210套餐，还差2A，0B，费用目前10元，先单买2A，费用4元，总价14元，然后先尝试305套餐，发现超，然后再试1210套餐，发现B超了，得到目前最低费用为14元 | 14（覆盖15） |

问题的关键就在于clone的精髓之处，用来记录还需要多少零件的个数，使用递归，进行操作。如果不符合，（如买超了）直接break后，重新计算clone，直到special方法都试完了，然后才返回，如果一直都是break的状态则会返回单买的价格。

# perfect

```java
class Solution {
    
    private Integer res;
    
    public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {
        res=Integer.MAX_VALUE;
        int[] parr=new int[price.size()];
        int[] aarr=new int[needs.size()];
        for(int i=0;i<parr.length; i++){
            parr[i]=price.get(i);
            aarr[i]=needs.get(i);
        }
        findMinimum(special, 0, aarr, parr, 0);
        return res;
    }
    
    private void findMinimum(List<List<Integer>> special, int curOffer, int[] remain, int[] single, int total){
        if(total>=res||curOffer==special.size()) return;
        int buyNow=buySingle(remain, single, total);
        if(buyNow<res) res=buyNow;
        int[] newRemain=remainAfterUse(special.get(curOffer), remain);
        if(newRemain!=null) findMinimum(special, curOffer, newRemain, single, total+special.get(curOffer).get(remain.length));
        findMinimum(special, curOffer+1, remain, single, total);
    }
    
    private int[] remainAfterUse(List<Integer> special, int[] remain){
        int[] res=new int[remain.length];
        for(int i=0;i<remain.length;i++){
            res[i]=remain[i]-special.get(i);
            if(res[i]<0) return null;
        }
        return res;
    }
    
    private int buySingle(int[] remain, int[] single, int total){
        for(int i=0; i<remain.length; i++){
            total+=remain[i]*single[i];
        }
        return total;
    }
    
}
```

