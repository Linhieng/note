## [230823 Find the string in grid](https://practice.geeksforgeeks.org/problems/find-the-string-in-grid0111/1)

【题意】：在网格中查看有多少个位置能够正确匹配给定的字符串。某个位置成功匹配的定义是：从该位置开始，四面八方共八个方向，有一个方向成功匹配到字符串就算匹配成功。

【Excepted】：
- Time Complexity: O(n*m*k) where k is constant
- Space Complexity: O(1)

遍历，然后依次匹配八个方向，完事！

### [Python3](https://discuss.geeksforgeeks.org/comment/e2decc630bd22eec40bfc224afc56d91)

【DFS 解决】
```py
class Solution:
    def searchWord(self, grid, word):
        n, m, k = len(grid), len(grid[0]), len(word)

        D = [ [-1,-1], [-1, 0], [-1,1],
              [ 0,-1],          [ 0,1],
              [ 1,-1], [ 1, 0], [ 1,1]  ]
        def getNextIJ(i, j, direction):
            return i+D[direction][0], j+D[direction][1]


        def dfs(direction, curLen, curI, curJ):
            if curLen == k:
                return True
            if not (0<=curI<n and 0<=curJ<m):
                return False
            if word[curLen] != grid[curI][curJ]:
                return False
            nextI, nextJ = getNextIJ(curI, curJ, direction)
            return dfs(direction, curLen+1, nextI, nextJ)
        def match(i, j):
            for dire in range(8):
                nextI, nextJ = getNextIJ(i, j, dire)
                if dfs(dire, 1, nextI, nextJ):
                    return True
        ans = []
        for i in range(n):
            for j in range(m):
                if grid[i][j] == word[0] and match(i, j):
                    ans.append([i, j])
        return ans
```

【减少代码量】
```py
class Solution:
    def searchWord(self, grid, word):
        n, m, k = len(grid), len(grid[0]), len(word)

        row = [
            -k+1, -k+1, -k+1,
            0,             0,
            k-1,   k-1,  k-1
        ]
        col = [
            -k+1, 0, k-1,
            -k+1,    k-1,
            -k+1, 0, k-1
        ]

        def get(a, b):
            if a == b:
                return [a] * k
            elif a < b:
                return range(a, b+1)
            else:
                return range(a, b-1, -1)

        def f(i, j):
            direction = []
            for a in range(8):
                iEnd, jEnd = i+row[a], j+col[a]
                if 0<=iEnd<n and 0<=jEnd<m:
                    direction.append(( get(i, iEnd), get(j, jEnd) ))

            for r,l in direction:
                match = True
                for a in range(k):
                    if word[a] != grid[r[a]][l[a]]:
                        match = False
                        break
                if match:
                    return True
            return False

        ans = []
        for i in range(n):
            for j in range(m):
                if word[0] == grid[i][j] and f(i, j): # 如果没有先判断开头，那么就会超时！因为 f 中始终都会先计算出 direction。
                    ans.append([i, j])

        return ans
```

【懒惰~慢慢敲呀慢慢敲呀】
```py
class Solution:
    def searchWord(self, grid, word):
        n, m, k = len(grid), len(grid[0]), len(word)

        def f(i, j):
            if i+k <= n:
                flag = True
                for a in range(k):
                    if word[a] != grid[i+a][j]:
                        flag = False
                        break
                if flag:
                    return True

            if j+k <= m:
                flag = True
                for a in range(k):
                    if word[a] != grid[i][j+a]:
                        flag = False
                        break
                if flag:
                    return True

            if i+k <= n and j+k <= m:
                flag = True
                for a in range(k):
                    if word[a] != grid[i+a][j+a]:
                        flag = False
                        break
                if flag:
                    return True

            if i+k <= n and j-k >= -1:
                flag = True
                for a in range(k):
                    if word[a] != grid[i+a][j-a]:
                        flag = False
                        break
                if flag:
                    return True

            if j-k >= -1:
                flag = True
                for a in range(k):
                    if word[a] != grid[i][j-a]:
                        flag = False
                        break
                if flag:
                    return True

            if i-k >= -1 and j-k >= -1:
                flag = True
                for a in range(k):
                    if word[a] != grid[i-a][j-a]:
                        flag = False
                        break
                if flag:
                    return True

            if i-k >= -1:
                flag = True
                for a in range(k):
                    if word[a] != grid[i-a][j]:
                        flag = False
                        break
                if flag:
                    return True

            if i-k >= -1 and j+k <= m:
                flag = True
                for a in range(k):
                    if word[a] != grid[i-a][j+a]:
                        flag = False
                        break
                if flag:
                    return True
            return False

        ans = []
        for i in range(n):
            for j in range(m):
                ans.append([i, j]) if f(i, j) else None

        return ans
```