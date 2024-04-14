# [230915 Partition Equal Subset Sum](https://practice.geeksforgeeks.org/problems/subset-sum-problem2014/1)

【题意】：数组是否能够划分为两个元素之和相等的子集

【Excepted】：

- Time Complexity: O(N*sum of elements)
- Auxiliary Space: O(N*sum of elements)

今天像往常一样，将自认为正确的思路转换为代码，然后提交，等待报错或超时。但没想到居然一次就过了！这倒是让我受宠若惊。

## Solution

```py
class Solution:
    def equalPartition(self, N, arr):
        total = sum(arr)
        if total % 2 != 0:
            return 0

        target = total // 2

        def canReach(index, target):
            if target < 0:
                return False
            if index >= N:
               return target == 0

            if canReach(index + 1, target - arr[index]): # take
                return True
            if canReach(index + 1, target): # not take
                return True
            return False

        return int(canReach(0, target))
```

下面代码中的 dp 是不必要的优化，原因在于 targetSum 的是递减的，当它小于零时就会将结束递归。而每次递归至少都会减去 1，所以最多迭代 sum of elements 次数。

```py
class Solution:
    def equalPartition(self, N, arr):
        total = sum(arr)
        if total % 2 != 0:
            return 0

        targetSum = total // 2

        dp = [ [-1] * (targetSum + 1) for _ in range (N) ]

        def canReach(index, targetSum):
            if targetSum < 0:
                return False
            if index >= N:
               return targetSum == 0

            if dp[index][targetSum] != -1:
                return dp[index][targetSum]

            if canReach(index + 1, targetSum - arr[index]): # take
                dp[index][targetSum] = True
                return True
            if canReach(index + 1, targetSum): # not take
                dp[index][targetSum] = True
                return True
            dp[index][targetSum] = False
            return False

        return int(canReach(0, targetSum))
```
