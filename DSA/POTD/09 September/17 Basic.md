# [230917 Print first n Fibonacci Numbers](https://practice.geeksforgeeks.org/problems/print-first-n-fibonacci-numbers1002/1)

【题意】斐波那契数列

【Excepted】

- Time Complexity: O(N).
- Auxiliary Space: O(N).

## Solution

```py
class Solution:
    def printFibb(self,n):
        if n == 1: return [1]
        if n == 2: return [1, 1]

        pre, cur = 1, 1
        ans = [1, 1]

        for _ in range(3, n+1):
            pre, cur = cur, pre + cur
            ans.append(cur)

        return ans
```
