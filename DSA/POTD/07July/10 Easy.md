## [230710 - Transpose of Matrix](https://practice.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1)

- 【题意】 转置矩阵
- 【要求】
    - Time Complexity O(N*N)
    - Auxiliary Space O(1)
- 【Constraints】
    - 1 <= N <= $10^3$;
    - -$10^9$ <= mat[i][j] <= $10^9$

走一半。
py Coding 过程中错了两次，马虎了，在交换那块。

### Python3 代码

【我的】
```py
class Solution:
    def transpose(self, matrix, n):
        for i in range(n):
            for j in range(i, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```