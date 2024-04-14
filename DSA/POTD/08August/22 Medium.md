## [230822 Make Matrix Beautiful](https://practice.geeksforgeeks.org/problems/make-matrix-beautiful-1587115620/1)

【题意】：给你一个方阵 matrix, 将该方阵变漂亮，意味着要让该方阵的每一行每一列都相等。问：漂亮的方阵的元素总和和原方阵的元素总和的最小差值是多少？

【Excepted】：
- Time Complexity: O(N * N)
- Auxiliary Space: O(N)

乍一看似乎很难，但静下来想一想会发现很简单，因为只要求输出差值，并没有问你每一个元素都要加上多少。

这道题应该是使用“贪心算法”吧，因为很容易有思路：每一行每一列都相等，那么最终漂亮的方阵，他的一行元素只和会是多少呢？很明显应该是原方阵中，数值最大的那一行（或者那一列）。有了这个想法后，直接完成代码，提交，✔️。耗时 10 分钟。

### python3

【我的 - 贪心算法】
```py
class Solution:
    def findMinOpeartion(self, matrix, n):
        all_total = 0
        col_total = [0] * n
        max_sum = 0
        for i in range(n):
            row_total = 0
            for j in range(n):
                all_total += matrix[i][j]
                row_total += matrix[i][j]
                col_total[j] += matrix[i][j]
            max_sum = max(max_sum, row_total)
        max_sum = max(max_sum, *col_total)

        return max_sum * n - all_total
```