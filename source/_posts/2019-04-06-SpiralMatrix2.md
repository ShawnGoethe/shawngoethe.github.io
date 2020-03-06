---
title: SpiralMatrix2-59
date: 2019-04-06 16:16:18
tags:
- medium
categories:
- LeetCode
---

# problem

>Given a positive integer *n*, generate a square matrix filled with elements from 1 to *n*2 in spiral order.
>
>**Example:**
>
>```
>Input: 3
>Output:
>[
> [ 1, 2, 3 ],
> [ 8, 9, 4 ],
> [ 7, 6, 5 ]
>]
>```

# key

虽然标了medium，但是确实很简单，形成一个口字型闭环，一层层去处理就好了，然后再主要就是控制口字循环时候的边界，以及最后一个元素的判断

# solution

```
public int[][] generateMatrix(int n) {
		int [][]res = new int[n][n];
        int left = 0;
        int right = n-1;
        int top = 0;
        int bottom = n-1;
        int index = 1;
        int quit = n*n;
        while(index<=quit){
            for(int i=left;i<=right;i++) {
            	res[top][i] = (index++);
            }
            top++;
            for(int i=top;i<=bottom;i++){
            	res[i][right] = (index++);
                }
            right--;
            for(int i=right;i>=left;i--) {
                res[bottom][i]=(index++);
            }
            bottom--;
            for(int i=bottom;i>=top;i--) {
            	res[i][left]=(index++);
            }
            left++;
        }
        return res;
	}
```



# perfect

no