## [230812 Longest Increasing Subsequence](https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1)

【题意】：最长递增子序列 LIS

【 Excepted 】：
- Time Complexity : O( N*log(N) )
- Auxiliary Space: O(N)

又是 90 分钟……

### PYthon3

【暴力递归，超时 10/1120】
```py
class Solution:
    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self, nums, n):
        maxLen = [0]

        def dfs(p, tail, curMaxLen):
            if p == n:
                maxLen[0] = max(maxLen[0], curMaxLen)
                return
            dfs(p+1, tail, curMaxLen)
            if tail < 0 or nums[tail] < nums[p]:
                dfs(p+1, p, curMaxLen+1)

        dfs(0, -1, 0)
        return maxLen[0]
```

【优化 562/1120】
```py
class Solution:
    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self, nums, n):
        dp = [1] * n

        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], 1 + dp[j])
        return max(dp)
```

【优化查找 - 二分查找 ✔️】
```py
class Solution:
    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self, A, size):
        tailTable = []

        for a in A:
            lo, hi = 0, len(tailTable)
            while lo < hi:
                mid = (lo + hi) // 2
                if tailTable[mid] < a: # 这个是有顺序要求的。如果先判断 hi 的情况，则是 bisect_right
                    lo = mid + 1
                else:
                    hi = mid
            # 上面代码等同 lo = bisect.bisect_left(tailTable, a)
            if lo == len(tailTable):
                tailTable.append(a)
            else:
                tailTable[lo] = a
        return len(tailTable)
```

### 我的超时代码（TC: 2^N），均为 10/1120

【深度优先遍历】
```py
class Solution:
    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self,a,n):
        if n < 1:
            return 0

        def dfs(prev, curr):
            if curr == n:
                return 0

            if prev == -1 or a[prev] < a[curr]:
                return max(
                    dfs(prev, curr+1),
                    1 + dfs(curr, curr+1)
                )
            else:
                return dfs(prev, curr+1)

        return dfs(-1, 0)
```

【从左到右】
```py
class Solution:
    def recursive(self, a, n, i, maxValue, maxLen):

        if i == n:
            return maxLen

        if a[i] > maxValue:
            return max(
                self.recursive(a, n, i+1, maxValue, maxLen),
                self.recursive(a, n, i+1, a[i], maxLen + 1)
            )
        else:
            return self.recursive(a, n, i+1, maxValue, maxLen)

    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self,a,n):
        if n < 1:
            return 0

        return self.recursive(a, n, 0, -1, 0)
```

【从右到左】
```py
class Solution:
    def recursive(self, a, n, i, minValue):

        if i < 0:
            return 0

        if a[i] >= minValue:
            return self.recursive(a, n, i-1, minValue)
        else:
            return max(
                self.recursive(a, n, i-1, minValue),
                1 + self.recursive(a, n, i-1, a[i]),
            )

    #Function to find length of longest increasing subsequence.
    def longestSubsequence(self,a,n):
        if n < 1:
            return 0

        return self.recursive(a, n, n-1, float('inf'))
```