## [230811 Coin Change](https://practice.geeksforgeeks.org/problems/coin-change2448/1)

【题意】： 凑零钱

【 Excepted 】：
- Time Complexity: O(sum*N)
- Auxiliary Space: O(sum)

裂开，即使已经过了 90m，但还是觉得快做出来了快做出来了。于是又挣扎了一小时。做算法题还是得定个时间，90m 内没做出来就别挣扎了，效率太低！

凑零钱有两类，一种是限制数量，另一种是不限制数量。这道题就属于不限制数量的题目。此时可以利用 DFS 的思路求解（评论区方案二）。即每一个数额都看成一个节点，并且节点是成环的，点与点之间也是双向连接。

### 评论区方案二 Python3 改写

【评论区方案二 - 暴力递归，超时❌ 10/1120】
```py
class Solution:
    def dfs(self, coins, N, sum):
        if sum == 0:
            return 1
        if sum < 0 or N <= 0:
            return 0
        return self.dfs(coins, N-1, sum) + self.dfs(coins, N, sum - coins[N - 1])

    def count(self, coins, N, sum):
        return self.dfs(coins, N, sum)
```

【评论区方案二 - 记忆递归，超时❌ 90/1120】
```py
class Solution:
    def dfs(self, coins, N, sum, dp):
        if sum == 0:
            return 1
        if sum < 0 or N <= 0:
            return 0
        if dp[N][sum] != 0:
            return dp[N][sum]
        dp[N][sum] = self.dfs(coins, N-1, sum, dp) + self.dfs(coins, N, sum - coins[N - 1], dp)
        return dp[N][sum]

    def count(self, coins, N, sum):
        dp = [ [0] * (sum+1) for _ in range(N+1) ]
        return self.dfs(coins, N, sum, dp)
```

【评论区方案二 - 循环填表✔️】
```py
class Solution:
    def count(self, coins, N, sum):
        dp = [ [0] * (sum+1) for _ in range(N+1) ]

        for i in range(N+1):
            dp[i][0] = 1

        for i in range(1, N+1):
            for s in range(sum+1):
                if s >= coins[i-1]:
                    dp[i][s] = dp[i-1][s] + dp[i][s - coins[i-1]]
                else:
                    dp[i][s] = dp[i-1][s]

        return dp[N][sum]
```

【评论区方案二 - 极致优化！✔️】
```py
class Solution:
    def count(self, coins, N, sum):
        dp = [0] * (sum+1)
        dp[0] = 1
        for c in coins:
            for s in range(c, sum+1):
                dp[s] += dp[s-c]
        return dp[sum]
```

### 评论区方案一 Python3 改写

【评论区方案一 - 暴力递归，超时❌ 10/1120】
```py
class Solution:
    def recursion(self, coins, idx, amount):
        if idx == 0:
            return 1 if amount % coins[0] == 0 else 0

        notTake = self.recursion(coins, idx-1, amount)
        take = 0
        if coins[idx] <= amount:
            take = self.recursion(coins, idx, amount-coins[idx])

        return take + notTake

    def count(self, coins, N, sum):
        return self.recursion(coins, N-1, sum)
```

【评论区方案一 - 记忆递归，超时❌ 801/1120】
```py
class Solution:
    def recursion(self, coins, idx, amount, dp):
        if idx == 0:
            return 1 if amount % coins[0] == 0 else 0

        if dp[idx][amount] != -1:
            return dp[idx][amount]

        notTake = self.recursion(coins, idx-1, amount, dp)
        take = 0
        if coins[idx] <= amount:
            take = self.recursion(coins, idx, amount-coins[idx], dp)

        dp[idx][amount] = take + notTake
        return dp[idx][amount]

    def count(self, coins, N, sum):
        dp = [ [-1] * (sum+1) for _ in range(N) ]
        return self.recursion(coins, N-1, sum, dp)
```

【评论区方案一 - 循环填表✔️】
```py
class Solution:
    def count(self, coins, N, sum):
        dp = [ [0] * (sum+1) for _ in range(N) ]

        for s in range(sum + 1):
            if s % coins[0] == 0:
                dp[0][s] = 1

        for idx in range(1, N):
            for s in range(sum + 1):
                notTake = dp[idx - 1][s]
                take = 0
                if coins[idx] <= s:
                    take = dp[idx][s - coins[idx]]
                dp[idx][s] = notTake + take
        return dp[N-1][sum]
```

【评论区方案一 - 优化表格✔️】
```py
class Solution:

    def count(self, coins, N, sum):
        curr = [0] * (sum + 1)
        prev = [*curr]

        for s in range(sum + 1):
            if s % coins[0] == 0:
                prev[s] = 1

        for idx in range(1, N):
            for s in range(sum + 1):
                notTake = prev[s]
                take = 0
                if coins[idx] <= s:
                    take = curr[s - coins[idx]]
                curr[s] = notTake + take
            prev = [*curr]
        return prev[sum]
```

### 我的方案（超时❌）

【我的 - 循环填表，超时❌ 72/1120】
```py
class Solution:
    def count(self, coins, N, sum):
        coins.sort()
        table = [ [0] * N for _ in range(sum+1) ]

        for i in range(N):
            table[0][i] = 1

        # 很多不需要的数据，我们也把他填进去了
        for s in range(1, sum+1):
            for i in range(N):
                # count table[s][i]
                for j in range(i, N):
                    sum_j = s-coins[j]
                    if sum_j < 0:
                        break
                    table[s][i] += table[sum_j][j]
        return table[sum][0]
```

【我的 - 记忆递归，超时❌ 60/1120】
```py
class Solution:
    def recursion(self, coins, N, sum, start, table):

        if table[sum][start] != -1:
            return table[sum][start]

        if sum == 0:
            table[sum][start] = 1
            return 1
        elif sum < 0:
            table[sum][start] = 0
            return 0

        ans = 0
        for i in range(start, N):
            if sum < coins[i]:
                break
            ans += self.recursion(coins, N, sum-coins[i], i, table)

        table[sum][start] = ans
        return ans

    def count(self, coins, N, Sum):
        coins.sort()
        table = [ [-1] * N for _ in range(Sum+1) ]
        return self.recursion(coins, N, Sum, 0, table)
```

【我的 - 暴力递归，超时❌ 10/1120】
```py
class Solution:
    def recursion(self, coins, N, sum, start):

        if sum == 0:
            return 1
        elif sum < 0:
            return 0

        ans = 0
        for i in range(start, N):
            if sum < coins[i]:
                break
            ans += self.recursion(coins, N, sum-coins[i], i)
        return ans

    def count(self, coins, N, Sum):
        coins.sort()
        return self.recursion(coins, N, Sum, 0)
```