## [230720 - Non Repeating Character](https://practice.geeksforgeeks.org/problems/non-repeating-character-1587115620/1)

- 【题意】 第一个不重复字符
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(Number of distinct characters)
- 【Constraints】
    - 1 ≤ N ≤ $10^5$

今天的题目和 [230717 - First non-repeating character in a stream](17%20Medium.md) 的题目很类似。（做题时我居然没注意到）

先按简单思路来了一遍：一个 map 存储每个字符出现的次数，一个 queue 存储每个字符串的顺序。

做完后发现和 17 号的题目一样，于是又使用当天相处的 “妙招” 再次解决。

突然想到最大空间复杂度居然写的是 “不重复字符数量”，还可以官网能有什么“妙解”，没想到也是两个循环，一个数组。也是，评论区都没有，官方题解怎么可能有。

简单说一下官方题解: 一个 256 位数组存储各个字符的出现次数。第一轮遍历获取每个字符次数，第二轮继续遍历原字符串，返回第一个次数为１的。


### Python3 代码

【我的 - 一个26位数组】:
```py
class Solution:
    def nonrepeatingCharacter(self,s):
        alphabet = [0] * 26
        for c in s:
            ci = ord(c) - 97
            if alphabet[ci] != -1:
                if alphabet[ci] > 0: # have repeat
                    alphabet[ci] = -1
                else:
                    alphabet = [ (i+1 if i > 0 else i) for i in alphabet  ] # keep order
                    alphabet[ci] = 1
        mi = max(alphabet)
        return '$' if mi < 1 else chr( alphabet.index(mi) + 97 )
```

【我的 - 两个数组】:
```py
class Solution:
    def nonrepeatingCharacter(self,s):
        nonRepeat = []
        repeat = []
        for c in s:
            if c in repeat:
                continue
            if c in nonRepeat:
                repeat.append(c)
                nonRepeat.pop( nonRepeat.index(c) )
            else:
                nonRepeat.append(c)
        return '$' if len(nonRepeat) < 1 else nonRepeat[0]
```

【我的 - map + queue】:
```py
from queue import Queue
class Solution:
    def nonrepeatingCharacter(self,s):
        non_rep = {}
        next = Queue()
        for c in s:
            if c not in non_rep:
                non_rep[c] = 1
                next.put(c)
            else:
                non_rep[c] += 1
        res = '$'
        while not next.empty():
            item = next.get()
            if non_rep[ item ] == 1:
                res = item
                break
        return res
```