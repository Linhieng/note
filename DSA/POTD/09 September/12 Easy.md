# [230912 Perfect Numbers](https://practice.geeksforgeeks.org/problems/perfect-numbers3207/1)

【题意】：如果一个数字等于它所有因子（不包含自身）之和，则称这个数字为完美数字。

【Excepted】

- Time Complexity: O(sqrt(N))
- Auxiliary Space: O(1)

## Solution

```py
class Solution:
    def isPerfectNumber(self, N):
        if N <= 1:
            return 0
        sum_exclude_self = 1
        a, b = 2, int(N ** 0.5) + 1 # 记得加 1
        while a < b: # 不能相等
            if N % a == 0:
                b = N // a
                sum_exclude_self += (a + b)
            a += 1

        return int(sum_exclude_self == N)
```
