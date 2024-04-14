## [230824 Multiply two strings](https://practice.geeksforgeeks.org/problems/multiply-two-strings/1)

【题意】：两个数字相乘

【Excepted】：
- Time Complexity: O(n1* n2)
- Auxiliary Space: O(n1 + n2); where n1 and n2 are sizes of strings s1 and s2 respectively.

没想到原生 py 计算的那么快！只需要 0.03s, 而我使用字符串的方式需要 5s 多。
知道有差距，但没想到差距这么大！

### [Python3](https://discuss.geeksforgeeks.org/comment/82b95b0351b29a35c23b6f270a7e95af)

```py
class Solution:
    def multiplyStrings(self,s1,s2):
        return int(s1) * int(s2)
```

```py
from functools import reduce
class Solution:
    def multiplyStrings(self,s1,s2):
        if s1[0] == '-' and s2[0] != '-':
            return '-' + self.multiplyStrings(s1[1:], s2)

        if s1[0] != '-' and s2[0] == '-':
            return '-' + self.multiplyStrings(s1, s2[1:])

        if s1[0] == '-' and s2[0] == '-':
            return self.multiplyStrings(s1[1:], s2[1:])

        ans = [0] * (len(s1) + len(s2))
        # Remember reverse list
        num_arr_1 = list(map(int, [*s1][::-1]))
        num_arr_2 = list(map(int, [*s2][::-1]))

        def multiply(num1, num2, idx):
            mul = num1 * num2 + ans[idx]
            ans[idx] = mul % 10
            ans[idx+1] += mul // 10

        for idx1, num1 in enumerate(num_arr_1):
            for idx2, num2 in enumerate(num_arr_2):
                multiply(num1, num2, idx1+idx2)


        def arr2str(prev, cur):
            if prev == '0':
                return '' if cur == 0 else str(cur)
            return prev + str(cur)
        return reduce(arr2str, ans[::-1], '')
```