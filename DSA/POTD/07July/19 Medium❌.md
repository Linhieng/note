## [230719 - Longest Palindromic Subsequence](https://practice.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612327878/1)

- 【题意】 LCS 最长公共子序列 问题

首先，区分两个概念：
- 子序列(Subsequence)：不需要连续
- 子字符串(substring): 需要连续

然后，这道题和昨天的题目本质是一样的，都是最长公共子序列问题。
只不过这道题问的是回文子序列，需要 “脑筋转一下” —— 求字符串和反转字符串的最长公共子序列。

没什么好说的，挣扎了一个多小时，然后放弃了。

### Python3 代码

【评论区 - 递归 ❌】:
```py
class Solution:
    def lcs(self, i, j, A, B):
        if i < 0 or j < 0:
            return 0
        if A[i] == B[j]:
            return 1 + self.lcs(i-1, j-1, A, B)
        return max(self.lcs(i-1, j, A, B), self.lcs(i, j-1, A, B))

    def longestPalinSubseq(self, S):
	    n = len(S)
	    return self.lcs(n-1, n-1, S, S[::-1])
```

【评论区 - 递归填表】:
```py
class Solution:
    def lcs(self, i, j, A, B, dp):
        if i < 0 or j < 0:
            return 0
        if dp[i][j] != -1:
            return dp[i][j]
        if A[i] == B[j]:
            return 1 + self.lcs(i-1, j-1, A, B, dp)
        dp[i][j] = max(self.lcs(i-1, j, A, B, dp), self.lcs(i, j-1, A, B, dp))
        return dp[i][j]

    def longestPalinSubseq(self, S):
	    n = len(S)
	    dp = [[-1] * n for _ in range(n)]
	    return self.lcs(n-1, n-1, S, S[::-1], dp)
```

【评论区 - 动态规划】:
```py
class Solution:
    def longestPalinSubseq(self, S):
	    n = len(S)
	    RS = S[::-1]
	    dp = [[0] * (n+1) for _ in range(n+1)]
	    for i in range(1, n+1):
	        for j in range(1, n+1):
	            if (S[i-1] == RS[j-1]):
	                dp[i][j] = 1 + dp[i-1][j-1]
                else:
                    dp[i][j] = max(dp[i][j-1], dp[i-1][j])
	    return dp[n][n]
```

【评论区 - 动态规划优化空间】:
```py
class Solution:
    def longestPalinSubseq(self, S):
	    n = len(S)
	    RS = S[::-1]
	    prev = [0] * (n+1)
	    curr = [0] * (n+1)

	    for i in range(1, n+1):
	        for j in range(1, n+1):
	            if S[i-1] == RS[j-1]:
	                curr[j] = 1 + prev[j-1]
                else:
                    curr[j] = max(curr[j-1], prev[j])
            prev = [*curr]
	    return prev[n]
```
