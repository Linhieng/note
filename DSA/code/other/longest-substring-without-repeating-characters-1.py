# 突然感觉自己以前挺吊的
class Solution:
    def update(self, str, char):
        for i, c in enumerate(str):
            if c == char:
                return str[i+1:] + char
        return str + char

    def lengthOfLongestSubstring(self, s: str) -> int:
        str = ''
        res = 0
        for char in s:
            str = self.update(str, char)
            res = max(res, len(str))
        return res
