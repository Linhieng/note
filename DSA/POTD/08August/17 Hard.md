## [230817 Next Smallest Palindrome](https://practice.geeksforgeeks.org/problems/next-smallest-palindrome4740/1)

【题意】：下一个回文数字

【 Excepted 】：
- Time Complexity: O(N)
- Auxiliary Space: O(1)

虽然是 hard, 但要想出一个思路还是很容易的。

最终花了得有 3 小时才做出来。先是考虑的情况不全，出现错误答案。后是耗时过长，在考虑优化速度。
所以，虽然做出来了，但代码并不美观。原因在于对情况的划分不够好。

参考 Hint + 评论区后整理出来的思路。一共只有三种情况：
- 情况一：全为 9。这可以确保下面的两种情况的最高位一定无进位。这省下了很多脑细胞和代码量。
- 情况二：“左边”大于“右边”。直接根据给定数字的前半部分生成回文数字，然后判断该回文数字是否大于给定数字。如果大于，则说明“左边”大于“右边”，此时直接返回生成的回文数字。
- 情况三：“左边”小于等于“右边”。此时直接将给定数字的前半部分 +1, 然后生成回文数字。

### Python3

【py 改写 + 评论区 + Hint】：
```py
class Solution:

	def generateNextPalindrome(self,num, n ) :

        def isAll9():
            for i in num:
                if i != 9:
                    return False
            return True

        def gt(arr1, arr2):
            s1, s2 = '', ''
            for i in arr1:
                s1 += str(i)
            for i in arr2:
                s2 += str(i)
            return s1 > s2

        # 情况一
        if isAll9():
            ans = [0] * (n+1)
            ans[0] = ans[-1] = 1
            return ans

        # 情况二
        pal = [*num]
        pal[(n+1)//2:] = (pal[:n//2])[::-1]
        if gt(pal, num):
            return pal

        # 情况三
        for left in range((n-1)//2, -1, -1):
            if num[left] < 9:
                num[left] += 1
                break
            num[left] = 0
        num[(n+1)//2:] = (num[:n//2])[::-1]
        return num
```

【我的，仅做保留，不建议看】
```py
#User function Template for python3
class Solution:


    def generateNextPalindrome(self,num, n ) :
        def big():
            res = []
            half = num[:(n//2)]
            res = [*half, *(half[::-1])]
            if n % 2 == 0:
                return res
            res.insert(n//2, num[n//2])
            return res

        def small(half):
            half.extend(half[::-1])
            if n % 2 == 0:
                return half

            mid = n // 2
            mid_val = num[mid]
            if mid_val < 9:
                res = num[:mid]
                res.extend(res[::-1])
                res.insert(mid, mid_val + 1)
                return res

            half.insert(mid, 0)
            return half



        if n == 1:
            if num[0] == 9:
                return [1, 1]
            else:
                return [num[0] + 1]

        res = []
        left = n//2 - 1
        right = (n+1) // 2
        half = [ *(num[:n//2]) ]
        carry = 1
        while left >= 0:
            l,r = num[left], num[right]
            if l > r:
                return big()
            elif l < r:
                # l != 9
                half[left] += carry
                return small(half)
            else:
                if carry == 1:
                    if num[left] == 9:
                        half[left] = 0
                    else:
                        half[left] = 1 + num[left]
                        carry = 0
                left -= 1
                right += 1

        mid = n//2
        mid_val = num[mid]
        if n % 2 == 1 and mid_val < 9:
            half = num[:mid]
            res = [*half, *(half[::-1])]
            res.insert(mid, mid_val + 1)
            return res


        if carry == 1:
            res = [0] * (n+1)
            res[0] = res[-1] = 1
            return res

        res = [*half, *(half[::-1])]
        if n % 2 == 1:
            res.insert(mid, 0)
        return res
```
