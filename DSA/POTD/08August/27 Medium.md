# [230826 Longest K unique characters substring](https://practice.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1)

【题意】：在所有只含 k 种类型字符的子串中，找出最长的那一子串，返回它的长度。

【Excepted】：

- Time Complexity: O(|S|).
- Auxiliary Space: O(|S|).

这道题目的重点在于，当左侧的指针需要移动时，它应该移动到哪一个字符上面？

错误的思路1：直接让 left 从左侧开始移动，当遇到一个新类型字符时停止。

错误的思路2：从当前位置往左计算，当计算的字符类型数量达到 k 时就停止。虽然可以改正该思路，但复杂度提高了。

AC 思路：

- 子串用两个指针 left, right 来表示，同时用一个 set 保存子串中的字符类型
- 当 set 的大小等于 k 时，更新最大长度。
- 当 set 的大小大于 k 时，就需要移动（最短距离） left 来保证 set 大小等于 k。这里采用的方法如下：
    - 利用一个 map 存储当前子串中各类字符的数量
    - 让 left 移动，每次移动都从 map 中减去对应字符的数量，当该字符数量等于 0 时，说明当前 set 大小等于 k。

## Python3

【评论区】

```py
from collections import defaultdict
class Solution:

    def longestKSubstr(self, s, k):
        if k < 1 or len(s) < 1:
            return -1

        ans = -1
        left, right, n = 0, -1, len(s)
        map_char_idx = defaultdict(lambda: 0)

        while right < n-1:
            right += 1
            map_char_idx[s[right]] += 1

            if len(map_char_idx) < k:
                continue

            while len(map_char_idx) > k:
                map_char_idx[s[left]] -= 1
                if map_char_idx[s[left]] == 0:
                    del map_char_idx[s[left]]
                left += 1

            ans = max(ans, right - left + 1)

        return ans
```

【Hint 思路】

```py
from collections import defaultdict
class Solution:

    def longestKSubstr(self, s, k):
        if k < 1 or len(s) < 1:
            return -1

        max_len = -1
        left, right = 0, -1
        unique_char = set()
        char_num = defaultdict(lambda: 0)

        for char in s:
            right += 1
            unique_char.add(char)
            char_num[char] += 1

            if len(unique_char) == k:
                max_len = max(max_len, right - left + 1)
            elif len(unique_char) > k:
                while True:
                    if char_num[s[left]] > 1:
                        char_num[s[left]] -= 1
                        left += 1
                    else:
                        char_num[s[left]] -= 1
                        unique_char.remove(s[left])
                        left += 1
                        break

        return max_len
```

【866 /1120】超时代码，对我最开始的思路进行修正而实现的代码。说明思路大题每次，但是效率不行！

```py
class Solution:

    def longestKSubstr(self, s, k):
        if k < 1 or len(s) < 1:
            return -1

        max_len = -1
        left, right = 0, -1
        unique_set = set()

        def update_unique_set(right):
            new_set = set()
            while len(new_set) < k:
                new_set.add(s[right])
                right -= 1
            while s[right] in new_set:
                right -= 1
            return new_set, right + 1

        right = 0
        n = len(s)
        for right in range(n):
            char = s[right]
            unique_set.add(char)
            if len(unique_set) < k:
                continue
            if len(unique_set) > k:
                unique_set, left = update_unique_set(right)
            max_len = max(max_len, right - left + 1)

        return max_len
```
