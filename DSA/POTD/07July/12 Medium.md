## [230712 - Power Of Numbers](https://practice.geeksforgeeks.org/problems/power-of-numbers-1587115620/1)

- 【题意】 R 是 N 的反转数, 比如 2 和 2, 12 和 21。 求 $N^R$ 的值, 结果过大时, 对 $10^9$+7 求模后再输出。
- 【要求】
    - Time Complexity O(logN)
    - Auxiliary Space O(logN)
- 【Constraints】
    - 1 <= N <= $10^9$;

本来有挺多想说的, 毕竟这道题花了近两个小时呢, 前面走了很多坑, 核心思路是会的 —— 二分, 递归, 存表。 但是被题意的求模输出给弄混了。
看完 Hint 后才发现有多简单。 所以也不想说什么了。 现在写得再多, 以后也不会看, 因为这题太简单了。

但是看到别人写出的算法后, 又会发现, 一道题你会做, 不代表你做的好 !

### Python3 代码

【评论区】【极其优秀的算法, 时间复杂度 logN, 空间复杂度 O(1)】:
```py
class Solution:
    #Complete this function

    def power(self, N, R):
        result = 1
        MOD = 10**9 + 7

        while R > 0:
            if R % 2 == 1:
                result = (result * N) % MOD
            N = (N * N) % MOD
            R //= 2

        return result
```

【我的】
```py
class Solution:
    #Complete this function

    # 对阶乘的数值进行二分处理。
    def process(self, table, N, R):
        if R in table:
            return table[R]

        a = int(R / 2)
        b = R - a

        if a not in table:
            table[a] = self.process(table, N, a)
        if b not in table:
            table[b] = self.process(table, N, b)
        table[R] = table[a] * table[b] % self.M
        return table[R]



    def power(self, N, R):
        self.M = 1000000007

        # 利用一张表加快运算速度。
        table = {}
        table[1] = N

        return self.process(table, N, R) % self.M
```