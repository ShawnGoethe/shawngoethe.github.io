---
title: 2020-01-10-MatrixZero
date: 2020-01-10 23:15:26
tags:
- Medium
categories:
- LeetCode
---
# LeetCode 73
```
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
Follow up:

A straight forward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?
```
# Solution
一开始以为递归可以解决，可以将矩阵一层层拆开，写下了如下的代码：
```
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length-1;
        int cols = matrix[0].length-1;
        regression(matrix, rows>=cols?cols:rows);
    }
    public void regression(int[][] matrix,int index){
        if(index<0){
            return;
        }
        boolean flag = false;
        for(int i =index;i<matrix[0].length;i++){
            if(matrix[index][i]==0)
            {
                handleZero(matrix,i);
                flag=true;
                break;
            }
        }
        if(flag==false){
            for(int j =index;j<matrix.length;j++){
                if(matrix[j][index]==0)
                {
                    handleZero(matrix,j);
                    break;
                }
            }
        }

        regression(matrix, --index);
    }
    private void handleZero(int[][] matrix,int pos) {

        for(int i=matrix[0].length-1;i>=pos;i--){
            matrix[pos][i]=0;
        }
        for(int j=matrix.length-1;j>=pos;j--){
            matrix[j][pos]=0;
        }
    }
```
写完后很快发现不能够实现，原因就在于他只能管理到内层，外层标为0后，没办法做额外的标记（其实生产代码可以打一些标记），所以只能抛弃这个本以为很简单的方法，该用了set合集去记录要设置0行列的行号或者列号，这个复杂度并不是很复杂，但是执行完发现代码的效率还是很低，先放代码：
```
class Solution {
  public void setZeroes(int[][] matrix) {
    int R = matrix.length;
    int C = matrix[0].length;
    Set<Integer> rows = new HashSet<Integer>();
    Set<Integer> cols = new HashSet<Integer>();

    for (int i = 0; i < R; i++) {
      for (int j = 0; j < C; j++) {
        if (matrix[i][j] == 0) {
          rows.add(i);
          cols.add(j);
        }
      }
    }

    for (int i = 0; i < R; i++) {
      for (int j = 0; j < C; j++) {
        if (rows.contains(i) || cols.contains(j)) {
          matrix[i][j] = 0;
        }
      }
    }
  }
}
```
代码低效的原因在于动用了两层循环，时间复杂度非常低，题目的置0是有规律的，不是无规律的，所以我开始寻求更新简单的方法,先贴最优解，要睡觉了，我的头发啊

```
class Solution {
    public void setZeroes(int[][] matrix) {
		int R = matrix.length;
		int C = matrix[0].length;
		boolean isCol = false;
		
		for(int i=0; i<R; i++) {
			if (matrix[i][0] == 0) {
		        isCol = true;
		    }
			for(int j=1; j<C; j++) {
				if(matrix[i][j]==0) {
					matrix[0][j] = 0;
					matrix[i][0] = 0;
				}	
			}
		}
		
		// Iterate over the array once again and using the first row and first column, update the elements.
		for(int i=1; i<R; i++) {
			for(int j=1; j<C; j++) {
				if(matrix[i][0]==0 || matrix[0][j]==0) {
					matrix[i][j] = 0;
				}
			}
		}
		
		// See if the first row needs to be set to zero as well
		if(matrix[0][0]==0) {
			for(int j=0; j<C; j++) {
				matrix[0][j] = 0;
			}
		}
		
		// See if the first column needs to be set to zero as well
		if(isCol) {
			for(int i=0; i<R; i++) {
				matrix[i][0] = 0;
			}
		}
    }
}
```
