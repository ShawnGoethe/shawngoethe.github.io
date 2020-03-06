---
title: SpiralMatrix
date: 2019-03-12 21:33:48
tags:
- Medium
categories:
- LeetCode
---
# 54.problem

> Given a matrix of *m* x *n* elements (*m* rows, *n* columns), return all elements of the matrix in spiral order.
>
> **Example 1:**
>
> ```
> Input:
> [
>  [ 1, 2, 3 ],
>  [ 4, 5, 6 ],
>  [ 7, 8, 9 ]
> ]
> Output: [1,2,3,6,9,8,7,4,5]
> ```
>
> **Example 2:**
>
> ```
> Input:
> [
>   [1, 2, 3, 4],
>   [5, 6, 7, 8],
>   [9,10,11,12]
> ]
> Output: [1,2,3,4,8,12,11,10,9,5,6,7]
> ```

# key

很简单的循环输出的例子，从【0,0】的位置顺时针扫一圈，然后缩小一圈，继续扫描，不过有一个细节就是第三次第四循环前，要判断一下,防止最后一层循环只有一行

# solution

```java
public List<Integer> spiralOrder(int[][] matrix) {

		List<Integer> ans = new ArrayList<Integer>();
		if (matrix.length == 0)
			return ans;
		int rs = 0, re = matrix.length - 1;// rowStart rowEnd
		int cs = 0, ce = matrix[0].length - 1;// columnStart columnEnd
		while (rs <= re && cs <= ce) {
			for (int i = cs; i <= ce; i++) {
				ans.add(matrix[rs][i]);
			}
			for(int j=rs+1;j<=re;j++) {
				ans.add(matrix[j][ce]);
			}
			if(rs<re&&cs<ce) {
				for(int k=ce-1;k>cs;k--) {
					ans.add(matrix[re][k]);
				}
				for(int l=re;l>rs;l--) {
					ans.add(matrix[l][cs]);
				}
			}
			
			rs++;
			re--;
			cs++;
			ce--;
		}
		return ans;
	}
```

# perfect

```
yehh,I'm the perfect
```

