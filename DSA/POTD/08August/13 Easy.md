## [230813 Nth Fibonacci Number](https://practice.geeksforgeeks.org/problems/nth-fibonacci-number1335/1)

【题意】：斐波那契数列。输出值对 1000000007 求余

【 Excepted 】：
- Time Complexity: O(n)
- Auxiliary Space: O(n)

5 分半解决。

### Python3

```py
class Solution:
    def nthFibonacci(self, n : int) -> int:
        if n == 1:
            return 1
        if n == 2:
            return 1
        pq = [1, 1]
        ans = 0
        i = 2
        for i in range(n - 2):
            ans = sum(pq) % 1000000007
            pq.pop(0)
            pq.append(ans)
        return ans
```