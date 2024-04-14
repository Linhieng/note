## [230806 String Permutations](https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string-1587115620/1)

【题意】： 字符串的全排列

【 Excepted 】：
- Time Complexity: O(N * N!), N = length of string.
- Auxiliary Space: O(1)

我只想说：你管这叫简单题……

一道简单题花了 67 分钟。

看了一下评论区，发现最后都是先排序再输出。看样子我的解题思路没问题。

### Python3

【 评论区 - py 调包】：
```py
import itertools
class Solution:
    def permutation(self,s):
        ans = list(itertools.permutations(s, len(s)))
        ans = [''.join(each) for each in ans]
        return sorted(ans)
```

【我的 - 最后利用排序解决】：
```py
class Solution:
    def full_permutation(self, s, curr, ans):
        if curr == len(s):
            ans.append(''.join(s))
            return
        # 基本思路： curr 前面的字符是固定不变的，我们需要负责的只是 curr 位置能有几种情况。
        for possible_char in range(curr, len(s)):
            s[curr], s[possible_char] = s[possible_char], s[curr]
            self.full_permutation(s, curr + 1, ans)
            s[curr], s[possible_char] = s[possible_char], s[curr]

    def permutation(self,s):
        ans = []
        s = [*s]
        self.full_permutation(s, 0, ans)
        ans.sort() # 最终结果不是正序的
        return ans
```