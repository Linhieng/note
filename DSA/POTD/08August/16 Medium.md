## [230816 Nth catalan number](https://practice.geeksforgeeks.org/problems/nth-catalan-number0817/1)

【题意】：卡特兰数

【 Excepted 】：
- Time Complexity: O(N^2).
- Auxiliary Space: O(N).

设 $h(n)$ 为 catalan 数的第 n 项，各项值如下：
$$h(0) = 1$$
$$h(1) = 1$$
$$h(n) = h(0) × h(n-1) + h(1) × h(n-2) + ... + h(n-2) × h(1) + h(n-1) × h(0), (n ≥ 2)$$

或者：
$$h(n) = \frac{h(n-1) × (4 × n - 2)}{n + 1}, (n ≥ 2)$$
或者：
$$h(n+1) = \frac{h(n) × (4 × n + 2)}{n + 2}, (n ≥ 2)$$
或者：
$$h(n) = \frac{C(2n, n)}{n + 1}, (n ≥ 0)$$
或者：
$$h(n) = C(2n, n) - C(2n, n-1), (n ≥ 0)$$

### Python3（py 代码无需考虑溢出）

【超时，1086/1120】$h(n) = h(0) × h(n-1) + h(1) × h(n-2) + ... + h(n-2) × h(1) + h(n-1) × h(0), (n ≥ 2)$
```py
class Solution:
    def findCatalan(self, N : int) -> int:
        catalan = [0] * (N + 1)
        catalan[0] = catalan[1] = 1
        for n in range(2, N+1):
            for j in range(n):
                catalan[n] += catalan[j] * catalan[n-j-1]
        MOD = 10**9 + 7
        return catalan[N] % MOD
```

【循环减半】$h(n) = h(0) × h(n-1) + h(1) × h(n-2) + ... + h(n-2) × h(1) + h(n-1) × h(0), (n ≥ 2)$
```py
class Solution:
    def findCatalan(self, N : int) -> int:
        catalan = [0] * (N + 1)
        catalan[0] = catalan[1] = 1
        for n in range(2, N+1):
            for j in range(n//2):
                catalan[n] += catalan[j] * catalan[n-1-j]
            catalan[n] *= 2
            if n % 2 == 1:
                catalan[n] += (catalan[n//2] ** 2)
        MOD = 10**9 + 7
        return catalan[-1] % MOD
```

$h(n) = C(2n, n) - C(2n, n-1), (n ≥ 0)$
```py
class Solution:
    def findCatalan(self, n : int) -> int:
        def C(a, b):
            nu, de = 1, 1
            for _ in range(b):
                nu *= a
                de *= b
                a -= 1
                b -= 1
            return nu // de

        MOD = 10**9 + 7
        return ( C(2*n, n) - C(2*n, n-1) ) % MOD
```

$h(n) = \frac{C(2n, n)}{n + 1}, (n ≥ 0)$
```py
class Solution:
    def findCatalan(self, n : int) -> int:
        def C(n2, n):
            nu, de = 1, 1
            for _ in range(n):
                nu *= n2
                de *= n
                n2 -= 1
                n -= 1
            return nu // de

        MOD = 10**9 + 7
        return ( C(2*n, n) // (n+1) ) % MOD
```

$h(n) = \frac{h(n-1) × (4 × n - 2)}{n + 1}, (n ≥ 2)$
```py
class Solution:
    def findCatalan(self, nth : int) -> int:
        if nth < 2:
            return 1

        MOD = 10**9 + 7
        ans = 1
        for n in range(2, nth+1):
            ans = ans * (4 * n - 2) // (n + 1)
        return ans % MOD
```

$h(n+1) = \frac{h(n) × (4 × n + 2)}{n + 2}, (n ≥ 2)$
```py
class Solution:
    def findCatalan(self, nth : int) -> int:
        if nth < 2:
            return 1

        MOD = 10**9 + 7
        ans = 1
        for n in range(1, nth):
            ans = ans * (4 * n + 2) // (n + 2)
        return ans % MOD
```