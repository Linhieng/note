# 质数

## 生成某个范围内的质数

优化：

- 开平方。这个是优化效果最明显的！。
- 欧拉筛选。找到一个质数后，将其所有倍数标记为合数。

其他注意事项：

- 大部分情况下，开平方就够用的了，其他的优化只在大数据（比如1e7以上才看得出效果）
- py 的 `num ** 0.5` 和 `math.sqrt(num)` 效果一样
- `int(num ** 0.5) + 1` 放在 range 中和提取成一个变量效果一样
- `[True] * n` 和 `[True  for _ in range(n)]` 效果差不多
- 当使用欧拉筛选时，就不需要 isPrime 函数了！

```py
def getPrimeArr1(n = 10**7):

    def isPrime(num):
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                return False
        return True

    primeArr = []

    for i in range(2, n+1):
        primeArr.append(i) if isPrime(i) else None
    return primeArr

def getPrimeArr2(n = 10**7):
    def isPrime(num):
        if not map_isPrime[num]:
            return False
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                return False
        return True

    primeArr = []
    map_isPrime = [True] * (n+1)

    for i in range(2, n+1):
        if isPrime(i):
            primeArr.append(i)
            for i in range(i, n+1, i):
                map_isPrime[i] = False
    return primeArr

def getPrimeArr3(n = 10**7):
    isPrime = [True] * (n+1)
    isPrime[0], isPrime[1] = False, False

    for i in range(2, int(n ** 0.5) + 1):
        if isPrime[i]:
            for i in range(i, n + 1, i):
                isPrime[i] = False
    return [i for i in range(n+1) if isPrime[i]]

getPrimeArr1() # 73s
getPrimeArr2() # 57s
getPrimeArr3() # 1s
# 更多的优化只有在更大的数据量时才有效果，这里就不记录了。更多的可查看 https://www.zhihu.com/question/24942373
```

## 分解质因数

```py
class Solution:
    def primeFactorization(self , n ):
        ans = []
        factor = 2
        while factor <= n:
            while n % factor == 0:
                n //= factor
                ans.append(factor)
            factor += 1
        return ans
```

由于偶数只有 2 是质数，所以可以简单的优化一下，让时间减半

```py
class Solution:
    def primeFactorization(self , n ):
        ans = []

        while n % 2 == 0:
            n //= 2
            ans.append(2)
        factor = 3
        while factor <= n:
            while n % factor == 0:
                n //= factor
                ans.append(factor)
            factor += 2
        return ans
```
