# [230918 Power of 2](https://practice.geeksforgeeks.org/problems/power-of-2-1587115620/1)

【题意】：判断一个数字是否 2 的阶乘

【Excepted】：

- Time Complexity:O(log N).
- Auxiliary Space:O(1).

## Solution

```py
class Solution:
    def isPowerofTwo(self,n):
        while n > 1 and n % 2 == 0:
            n //= 2
        return n == 1
```

```py
class Solution:
    def isPowerofTwo(self,n):
        return bin(n)[2:].count('1') == 1
```
