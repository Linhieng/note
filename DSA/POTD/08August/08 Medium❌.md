## [230808 Fraction pairs with sum 1](https://practice.geeksforgeeks.org/problems/fraction-pairs-with-sum-1/1)

【题意】： 给你 N 个分数，问有多少个分数对，他们的和为 1

【 Excepted 】：
- Time Complexity: O(N*log(N))
- Auxiliary Space: O(N)

暴力方法很容易就写出来了，结果很明显超时。
但让我没想到的是，我想要使用哈希表的方式优化，结果运行速度反而更慢！最后又是 90m+ 都没做出来。

在看完评论区的答案后，我发现代码思路没问题，但化简分数耗时过长。

简单说一下本题思路：
- 首先，确保每一个分数都是最简分数
- 利用一个 map 来存储某个分数出现的次数
- 依次遍历每一个分数，然后在 map 中查看是否有一个分数和该分数的和为 1

对我来说，本题的重点在于化简分数。化简分数

### [求取最大公约数](https://practice.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1)

【非递归】：
```py
class Solution:
    def gcd(self, A, B):
        while A != 0:
            rem = B % A
            B = A
            A = rem
        return B
```
【递归】：
```py
class Solution:
    def gcd(self, A, B):
        return B if A == 0 else self.gcd(B % A, A)
```

### Python3

【我的 - 通过调包化简分数】：
```py
from math import gcd
class Solution:
    def simplify(self, nu, de):
        g = gcd(nu, de)
        return nu//g, de//g

    def countFractions(self, n, numerator, denominator):
        ans = 0

        map = {}

        for i in range(n):
            a, b = self.simplify(numerator[i], denominator[i])

            frac = str(a) + ',' + str(b)
            sub = str(b-a) + ',' + str(b)

            if sub in map:
                ans += map[sub]

            if frac not in map:
                map[frac] = 1
            else:
                map[frac] += 1

        return ans
```

【我的 - 超时 281/1121】：
```py
class Solution:
    def sum(self, numerator, denominator, i, j):
        n1, n2 = numerator[i], numerator[j]
        d1, d2 = denominator[i], denominator[j]
        return (n1*d2 + n2*d1) == d1*d2

    def countFractions(self, n, numerator, denominator):
        ans = 0
        for i in range(0, n-1):
            for j in range(i+1, n):
                if self.sum(numerator, denominator, i, j) == 1:
                    ans += 1
        return ans
```