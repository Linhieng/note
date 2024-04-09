## [230815 Flip Bits](https://practice.geeksforgeeks.org/problems/flip-bits0240/1)

【题意】：一个只包含 0,1 的数组，允许你在 [l,r] 范围上进行翻转（0 变 1, 1 变 0）。问如何翻转能让数组中的 1 数量最多？

【 Excepted 】：
- Time Complexity: O(N)
- Auxiliary Space: O(1)

虽然是 easy, 但我却花了 40 多分钟。
一开始还想着是不是有什么妙解，但做出来后发现，这道题之所以是 easy, 可能是因为什么什么优化空间吧。
但即便如此，但别人的代码，依旧比我的更简洁。

### Python3

【改写评论区】
```py
class Solution:
    def maxOnes(self, A, N):
        maxSubarraySum, zero, one = 0, 0, 0
        for a in A:
            if a == 0:
                zero += 1
                maxSubarraySum = max(zero, maxSubarraySum)
            else:
                zero = max(0, zero - 1)
                one += 1
        return maxSubarraySum + one
```

【我的 - 不值得看】
```py
class Solution:
    def maxOnes(self, A, N):
        maxLenZero = 0
        maxL, maxR = 0, 0
        lenZero, l = 0, -1
        for i in range(N):
            if A[i] == 0:
                lenZero += 1
                if lenZero == 1 and l == -1:
                    l = i
            else:
                lenZero -= 1
                if lenZero <= 0:
                   lenZero = 0
                   l = -1

            if lenZero > maxLenZero:
                maxLenZero = lenZero
                maxL, maxR = l, i


        ans = 0
        for i in range(maxL, maxR+1):
            if A[i] == 0:
                ans += 1
        for i in [*range(maxL), *range(maxR, N)]: # maxR
            ans += A[i]

        return ans
```