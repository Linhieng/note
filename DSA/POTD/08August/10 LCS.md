## [230810 Longest Common Subsequence](https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1)

【题意】： 纯 LCS

【 Excepted 】：
- Time Complexity : O(|str1|*|str2|)
- Auxiliary Space: O(|str1|*|str2|)

关键点在于理解 “暴力递归” 的版本。后续的三个优化是模板套路。

### Python3

【暴力递归 - 10/1120】：
```py
class Solution:
    def lcs(self,x,y,s1,s2):
        if x < 1 or y < 1:
            return 0
        if s1[x-1] == s2[y-1]:
            return 1 + self.lcs(x-1, y-1, s1, s2)
        return max(
            self.lcs(x-1, y, s1, s2),
            self.lcs(x, y-1, s1, s2)
        )
```

【优化 1 - 递归填表 1010/1120】：
```py
class Solution:

    def process(self, x, y, s1, s2, dp):
        if x < 0 or y < 0:
            return 0

        if dp[x][y] != -1:
            return dp[x][y]

        if s1[x] == s2[y]:
            dp[x][y] = 1 + self.process(x-1, y-1, s1, s2, dp)
            return dp[x][y]

        dp[x][y] = max(
            self.process(x-1, y, s1, s2, dp),
            self.process(x, y-1, s1, s2, dp)
        )

        return dp[x][y]

    def lcs(self,x,y,s1,s2):
        dp = [ [-1] * y for _ in range(x) ]
        return self.process(x-1, y-1, s1, s2, dp)
```

【优化 2 - 非递归填表（动态规划）】：
```py
class Solution:
    #Function to find the length of longest common subsequence in two strings.
    def lcs(self,x,y,s1,s2):
        dp = [ [0] * (y+1) for _ in range(x + 1) ]

        for i in range(1, x+1):
            for j in range(1, y+1):
                i1, i2 = i-1, j-1
                if s1[i1] == s2[i2]:
                    dp[i][j] = 1 + dp[i-1][j-1]
                else:
                    dp[i][j] = max(
                        dp[i-1][j],
                        dp[i][j-1],
                    )
        return dp[x][y]
```

【优化 3 - 优化表结构】：
```py
class Solution:
    def lcs(self,x,y,s1,s2):
        curr = [0] * (y+1)
        prev = [*curr]

        for i in range(1, x+1):
            for j in range(1, y+1):
                i1, i2 = i-1, j-1
                if s1[i1] == s2[i2]:
                    curr[j] = 1 + prev[j-1]
                else:
                    curr[j] = max(
                        prev[j],
                        curr[j-1],
                    )
            prev = [*curr]
        return prev[y]
```