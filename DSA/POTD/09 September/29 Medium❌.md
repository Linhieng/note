# [230929 Number Of Enclaves](https://practice.geeksforgeeks.org/problems/number-of-enclaves/1)

【题意】：计算图中有多少个点无法通过边界到达

【Excepted】

- Time Complexity: O(n * m)
- Space Complexity: O(n * m)

## Solution

```py
from typing import List

class Solution:

    def numberOfEnclaves(self, grid: List[List[int]]) -> int:

        ROW = len(grid)
        COL = len(grid[0])
        enclaves = 0

        boundary = []

        for r in range(ROW):
            for c in range(COL):
                if grid[r][c] == 0:
                    continue
                enclaves += 1
                if r == 0 or r == ROW-1 or c == 0 or c == COL-1:
                    boundary.append([r, c])

        # DFS
        while boundary:
            r, c = boundary.pop()
            if not (0<=r<ROW and 0<=c<COL):
                continue
            if grid[r][c] == 0:
                continue

            grid[r][c] = 0
            enclaves -= 1
            boundary.append([r-1, c])
            boundary.append([r+1, c])
            boundary.append([r, c-1])
            boundary.append([r, c+1])

        return enclaves
```

【栈溢出】

```py
from typing import List

class Solution:
    def infect(self, i, j, N, M, grid):
        if i < 0 or i >= N or j < 0 or j >= M or grid[i][j] == 0 :
            return

        grid[i][j] = 0

        self.infect(i+1, j, N, M, grid)
        self.infect(i-1, j, N, M, grid)
        self.infect(i, j+1, N, M, grid)
        self.infect(i, j-1, N, M, grid)

    def numberOfEnclaves(self, grid: List[List[int]]) -> int:

        N = len(grid)
        M = len(grid[0])
        ans = 0

        for i in range(N):
            self.infect(i, 0, N, M, grid)
            self.infect(i, M-1, N, M, grid)
        for j in range(M):
            self.infect(0, j, N, M, grid)
            self.infect(N-1, j, N, M, grid)

        for i in range(N):
            for j in range(M):
                if grid[i][j] == 1:
                    ans += 1

        return ans
```

```py
from typing import List

class Solution:
    def infect(self, i, j, N, M, grid):
        if i < 0 or i >= N or j < 0 or j >= M or grid[i][j] != 1 :
            return 0

        grid[i][j] = 2
        return ( 1
            + self.infect(i+1, j, N, M, grid)
            + self.infect(i-1, j, N, M, grid)
            + self.infect(i, j+1, N, M, grid)
            + self.infect(i, j-1, N, M, grid)
        )

    def numberOfEnclaves(self, grid: List[List[int]]) -> int:

        N = len(grid)
        M = len(grid[0])
        ans = 0

        for i in range(N):
            self.infect(i, 0, N, M, grid)
            self.infect(i, M-1, N, M, grid)
        for j in range(M):
            self.infect(0, j, N, M, grid)
            self.infect(N-1, j, N, M, grid)

        for i in range(N):
            for j in range(M):
                if grid[i][j] == 1:
                    ans += self.infect(i, j, N, M, grid)

        return ans
```
