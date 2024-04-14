# [230916 Count number of hops](https://practice.geeksforgeeks.org/problems/count-number-of-hops-1587115620/1)

【题意】：青蛙跳(123)方法数

【Excepted】

- Time Complexity: O(N).
- Auxiliary Space: O(1).

## Solution

【数学公式 SC: O(1)】

```py
class Solution:
    #Function to count the number of ways in which frog can reach the top.
    def countWays(self,n):

        #we use similar algorithm as Fibonacci series to find the
        #number of ways in which frog can reach the top.

        mod = 1000000007
        #base cases
        if n == 1:
            return 1
        if n == 2:
            return 2
        if n == 3:
            return 4


        #initializing base values.
        a = 1
        b = 2
        c = 4

        for i in range (4, n+1):
            temp = (a + b + c) % mod
            #updating a as b and b as c and c as temp (sum of a, b and c).
            a = b
            b = c
            c = temp

        #returning the result.
        return c
```

【TC: O(N); SC: O(N)】

```py
class Solution:
    def countWays(self,n):
        if n < 1:
            return 0

        MOD = 1000000007
        dp = [-1] * (n + 1)

        def f(restStep):
            if restStep < 0:
                return 0
            if restStep == 0:
                return 1

            if dp[restStep] != -1:
                return dp[restStep]
            ways = 0

            for i in [1,2,3]:
                ways += f(restStep - i)
                ways %= MOD

            dp[restStep] = ways
            return ways

        return f(n)
```
