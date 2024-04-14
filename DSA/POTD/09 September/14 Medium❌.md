# [230914 Perfect Sum Problem](https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1)

【题意】：给你一个不含负数的数组 arr 和一个数值 sum，计算出数组中有多少个子集，其和等于 sum。

【Excepted】

- Time Complexity: O(N*sum)
- Auxiliary Space: O(N*sum)

## Solution

```py
class Solution:

    def perfectSum(self, numbers, length, targetSum):
        dp = [1] + [0] * targetSum
        MOD = int(1e9 + 7)

        for number in numbers:
            for currentSum in range(targetSum, number - 1, -1):
                dp[currentSum] = (dp[currentSum] + dp[currentSum - number]) % MOD

        return dp[targetSum]
```

```py
class Solution:

    def perfectSum(self, arr, n, sum):
        dp = [[-1] * (sum + 2) for _ in range(n + 1)]
        MOD = int(1e9 + 7)

        def process(pos, sum):
            if sum < 0:
                return 0
            if pos >= n:
                return int(sum == 0)

            ans = dp[pos][sum]
            if ans != -1:
                return ans

            ans = 0

            ans += process(pos + 1, sum) # not take
            ans %= MOD
            ans += process(pos + 1, sum - arr[pos]) # take
            ans %= MOD

            dp[pos][sum] = ans
            return ans

        return process(0, sum)
```
