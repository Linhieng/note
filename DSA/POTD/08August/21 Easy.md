## [230821 Surround the 1's](https://practice.geeksforgeeks.org/problems/surround-the-1s2505/1)

【题意】：给你一个矩阵，矩阵元素值仅有 0 和 1 组成。定义一个元素周围有 8 个元素。求：有多少个值为 1 的元素，它周围值为 0 的元素个数为偶数个。

【Excepted】
- Time Complexity: O(n * m)
- Space Complexity: O(1)

### Python3

【玩具❌超时 751 /1120】
```py
from functools import reduce
class Solution:
    def Count(self, matrix):
        n, m= len(matrix), len(matrix[0])

        for i in range(n):
            matrix[i] = [1, *matrix[i], 1]
        matrix = [
            [1] * (m+2),
            *matrix,
            [1] * (m+2),
        ]

        ans = 0
        for i in range(1, n+1):
            for j in range(1, m+1):
                if matrix[i][j] == 0:
                    continue
                r = list(map(lambda x: i+x,
                    [-1, -1, -1,
                      0,      0,
                      1,  1,  1]
                ))
                c = list(map(lambda x: j+x,
                    [-1,  0,  1,
                     -1,      1,
                     -1,  0,  1]
                ))
                def func(count, k):
                    return count + int(not matrix[r[k]][c[k]])
                count = reduce(func, range(8), 0)
                ans += 1 if count != 0 and count % 2 == 0 else 0

        return ans
```

【改写评论区】
```py
class Solution:
    def Count(self, matrix):
        n, m= len(matrix), len(matrix[0])

        ans = 0
        for i in range(n):
            for j in range(m):
                if matrix[i][j] == 0:
                    continue
                r = [-1, -1, -1,
                      0,      0,
                      1,  1,  1]
                c = [-1,  0,  1,
                     -1,      1,
                     -1,  0,  1]
                count = 0
                for k in range(8):
                    _i = i + r[k]
                    _j = j + c[k]
                    if 0<=_i<n and 0<=_j<m and matrix[_i][_j] == 0:
                        count += 1
                ans += 1 if count != 0 and count % 2 == 0 else 0

        return ans
```

```py
class Solution:
    def Count(self, matrix):
        n, m= len(matrix), len(matrix[0])
        def f(r, c):
            num = 0
            num += 0 if r < 1                   else int(not matrix[r-1][c])    # top
            num += 0 if r == n-1                else int(not matrix[r+1][c])    # bottom
            num += 0 if             c < 1       else int(not matrix[r][c-1])    # left
            num += 0 if             c == m-1    else int(not matrix[r][c+1])    # right
            num += 0 if r < 1    or c < 1       else int(not matrix[r-1][c-1])  # left-top
            num += 0 if r == n-1 or c < 1       else int(not matrix[r+1][c-1])  # left-bottom
            num += 0 if r < 1    or c == m-1    else int(not matrix[r-1][c+1])  # right-top
            num += 0 if r == n-1 or c == m-1    else int(not matrix[r+1][c+1])  # right-bottom
            return 1 if num != 0 and num % 2 == 0 else 0

        ans = 0
        for i in range(n):
            for j in range(m):
                if matrix[i][j] == 1:
                    ans += f(i, j)

        return ans
```

```py
class Solution:
    def Count(self, matrix):
        n, m= len(matrix), len(matrix[0])
        def f(r, c):
            num = 0
            num += int(not matrix[r-1][c])   if r > 0               else 0 # top
            num += int(not matrix[r+1][c])   if r < n-1             else 0 # bottom
            num += int(not matrix[r][c-1])   if             c > 0   else 0 # left
            num += int(not matrix[r][c+1])   if             c < m-1 else 0 # right
            num += int(not matrix[r-1][c-1]) if r > 0   and c > 0   else 0 # left-top
            num += int(not matrix[r+1][c-1]) if r < n-1 and c > 0   else 0 # left-bottom
            num += int(not matrix[r-1][c+1]) if r > 0   and c < m-1 else 0 # right-top
            num += int(not matrix[r+1][c+1]) if r < n-1 and c < m-1 else 0 # right-bottom
            return 1 if num != 0 and num % 2 == 0 else 0

        ans = 0
        for i in range(n):
            for j in range(m):
                if matrix[i][j] == 1:
                    ans += f(i, j)

        return ans
```