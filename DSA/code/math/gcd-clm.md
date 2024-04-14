# 最大公因数和最小公倍数

- `math.gcd` 最大公因数（Greatest Common Divisor）
- `math.lcm` 最小公倍数（Least Common Multiple）

## gcd 实现

借助欧几里得算法：两个数字连续计算余数，直到余数是 0，剩下的另一个数字就是最大公因数。

```py
def gcd(a, b):
    remainder = None

    while a > 0:
        remainder = a % b
        a = b
        b = remainder
    return a

```

## lcm 实现

两种方法

- 分解质因数：若干个数字的最小公倍数等于它们的所有质因数之和，如果有几个质因数相同，则取质因数较多的那个数。
- 公式法：最小公倍数 = 两个数字的乘积除以其最大公因数。

```py
def
```

## [练习：最小公倍数为 k 的子数组](https://leetcode.cn/problems/number-of-subarrays-with-lcm-equal-to-k/description/)

- 暴力解法：
    - 最暴力，双循环，没有缓存 lcm 结果，没有剪枝，超时。
    - 优化1：双循环，没有缓存 lcm 结果，剪枝，超时
    - 优化3：双循环，缓存 lcm 结果，没有剪枝，险过
    - 优化4：双循环，缓存 lcm 结果，剪枝，通过！

```py
import math
class Solution:
    def subarrayLCM(self, nums: List[int], k: int) -> int:
        ans = 0
        for left in range(len(nums)):
            lcmCache = 1 # lcm 缓存
            for right in range(left, len(nums)):
                lcmCache = math.lcm(lcmCache, nums[right])
                if lcmCache > k: # 剪枝
                    break
                if lcmCache == k:
                    ans += 1
        return ans
```
