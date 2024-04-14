# [230924 Replace O's with X's](https://practice.geeksforgeeks.org/problems/replace-os-with-xs0052/1)

【题意】：将被围起来的 O 替换为 X

【Excepted】

- Time Complexity: O(n*m)
- Auxiliary Space: O(n*m)

我的思路是：遇到 `O` 时就使用 DFS 遍历，如果能走到边界上则说明没有被包围。

更好的思路是：在边界上找 `O` 进行 DFS 遍历，遍历结束后，没遍历到的内容就全部都是 `X`

## Solution

```py
class Solution:
    def fill(self, n, m, mat):
        if n < 3 or m < 3:
            return mat

        def DFS(x, y):
            if not (0<=x<n and 0<=y<m):
                return
            if mat[x][y] != 'O':
                return
            mat[x][y] = '#'
            DFS(x-1, y)
            DFS(x+1, y)
            DFS(x, y-1)
            DFS(x, y+1)

        for x in range(n):
            if mat[x][0] == 'O':
                DFS(x, 0)
            if mat[x][m-1] == 'O':
                DFS(x, m-1)
        for y in range(m):
            if mat[0][y] == 'O':
                DFS(0, y)
            if mat[n-1][y] == 'O':
                DFS(n-1, y)

        for x in range(n):
            for y in range(m):
                mat[x][y] = 'O' if mat[x][y] == '#' else 'X'
        return mat
```
