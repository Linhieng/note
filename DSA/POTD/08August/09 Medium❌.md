## [230809 Largest prime factor](https://practice.geeksforgeeks.org/problems/largest-prime-factor2601/1)

【题意】： 求最大的质因数

【 Excepted 】：
-  Time Complexity: O(sqrt(N))
-  Space Complexity: O(1)

### 方案一

任意一个合数 $N$ 都可以拆分成若干个质数相乘：$N$ = $P_1^?$ × $P_2^?$ × $P_3^?$ ...

这道题目中，我们要求的就是最右侧的 $P^?$ （从左到右依次递增）。方法很简单，那就是从左到右依次消掉那些质因数 $P_i^?$，当 $N$ 除以 $P$ 等于 1 的时候，这个 $P$ 就是最左侧。

代码如下，使用 py 会超时，不过其他语言就不会【 1062/1257 】
```py
class Solution:
    def is_prime(self, N):
        sqrt_N = int(N ** 0.5) + 1
        for i in range(2, sqrt_N):
            if N % i == 0:
                return False
        return True

    def largestPrimeFactor (self, N):
        if self.is_prime(N):
            return N
        lpf = 1
        while N != 1:
            lpf += 1
            # 下面的 while 循环保证了 lpf 是质因数
            while N % lpf == 0: # 这里的遍历次数就是 P^? 中的问号的值
                N //= lpf
        return lpf
```

### 方案二

想要继续优化，需要了解质因数的一个性质：**对于数字 $N$, 大于 $\sqrt{N}$ 的质因数最多只有一个。**

使用反证法可以很简单的证明这个性质：如果存在两个大于 $\sqrt{N}$ 的质因数，则两个质因数相乘结果一定大于 $N$

有了这个性质后，意味着我们求取质因数时，只需要遍历到 $\sqrt{N}$。

这个时候你可能会疑惑，不是还有大于 $\sqrt{N}$ 的质因数吗？要怎么求它？
对于这个疑问，我举一个例子你就明白了：比如 111，$\sqrt{111}$ ≈ 11
- 2, 不整除，跳过
- 3, 111 ÷ 3 = 37 整除，所以 3 是质因数。这个是否你会发现，大于 $\sqrt{111}$（≈ 11）已经出现了。并且我们不需要主动去判断这个数字是不是质数。
    - 如果它不是质数，那么它迟早会再次被某个数整除
    - 如果它是质数，那么它一定会留到最后
    - 也就是说，这个流程走完后， N 要么是 1，要么是一个质数。

代码如下：
```py
class Solution:
    def largestPrimeFactor (self, N):
        pf = 1
        # 每一次循环，我们都会重新求取根号 N
        # 这里和方案一的不同在于，这个循环结束后，最大质因数不一定是 pf，也可能是 N
        while pf < int(N ** 0.5) + 1:
            pf += 1
            while N % pf == 0:
                N //= pf
        # 当存在大于根号 N 的质因数时，该质因数就是最终的 N
        # 否则，最大质因数就是 pf
        return N if N != 1 else pf
```

### 最终代码

如果在方案二的代码上，提前判断一些是否是质数，算法执行效率能够更快。
虽然判断质数和方法二的时间复杂度都是 $\sqrt{N}$，但方案二中每一轮循环都会进行依次求根运算，该常数时间是比较大的。

```py
class Solution:
    def is_prime(self, N):
        sqrt_N = int(N ** 0.5) + 1
        for i in range(2, sqrt_N):
            if N % i == 0:
                return False
        return True

    def largestPrimeFactor (self, N):
        if self.is_prime(N):
            return N

        lpf = 1
        while lpf < int(N ** 0.5) + 1:
            lpf += 1
            while N % lpf == 0:
                N //= lpf
        return N if N != 1 else lpf
```