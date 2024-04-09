# [230717 - First non-repeating character in a stream](https://practice.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1)

- 【题意】 第一个不重复字符
- 【要求】
    - Time Complexity O(26*N)
    - Auxiliary Space O(26)
- 【Constraints】
    - 1 ≤ N ≤ $10^5$
- 【Example】:

    ```text
    Input: A = "aabc"
    Output: "a#bb"
    Explanation: For every character first non
    repeating character is as follow-
    "a" - first non-repeating character is 'a'
    "aa" - no non-repeating character so '#'
    "aab" - first non-repeating character is 'b'
    "aabc" - first non-repeating character is 'b'
    ```

提取一下核心题意：遍历字符串, 每个位置的字符, 是当前字母串左侧(包括当前字母)中 **第一个** **只出现一次** 的字符, 否则为 **#** 符号。

本以为没办法只利用一个数组存储各个字母的出现次数和出现次序。
但今天重新想了想, 发现并不需要存储具体的出现次数信息, 只需要存储, 这个字母是不是还能用来赋值就可以了!
最终实现了代码,

【用到的 py 基础知识】:

- `ord()` 字符转 ASCII
- `chr()` 数字转字符
- `[*A]` 字符串转字符串数组
- `index()` 获取元素值下标
- 推导式比循环快

容易出错的地方:

- 缩进不对
- `=` 写成 `==`
- 函数`()` 写成 `[]`, 最典型的错误就是 `arr.append[i]`
- 字符串无法修改指定位置的值

## Solution

```js
/**
 * @param {string} A
 * @return {string}
*/

class Solution {
  FirstNonRepeating(A){
    let ans = ''
    const appearOrder = new Int8Array(26)

    for (const char of A) {
        const charIndex = char.charCodeAt() - 97

        if (appearOrder[charIndex] > 0) {
            appearOrder[charIndex] = -1
        } else if (appearOrder[charIndex] == 0) {
            for (let i = 0; i <= 26; i++) {
                if (appearOrder[i] > 0) {
                    appearOrder[i]++
                }
            }
            appearOrder[charIndex] = 1
        }

        let nearChar = '#'
        let near = 0
        for (let i = 0; i <= 26; i++) {
            if (appearOrder[i] > near) {
                near = appearOrder[i]
                nearChar = String.fromCharCode(i + 97)
            }
        }
        ans += nearChar
    }

    return ans
  }
}
```

【我的 - 只是用一个数组】:

```py
class Solution:
    def FirstNonRepeating(self, A):
        f = ''
        a = [0] * 26

        for c in A:
            ci = ord(c)-97

            if a[ci] > 0: # 已经出现过 Had appeared
                a[ci] = -1
            elif a[ci] != -1: # 从未出现过 Never appeared
                a = [i+1 if i > a[ci] else i for i in a ] # 存储出现次序信息 Ensure the order of occurrence
                a[ci] += 1

            m = max(a)
            f += '#' if m < 1 else chr(a.index(m) + 97)

        return f
```

```py
class Solution:
    def FirstNonRepeating(self, A):
        fnrc = ''

        occ_table = { chr(x+ord('a')): 0 for x in range(26) }  # occ_table = [0] * 26
        sequence = []
        si = 0

        for c in A:

            occ_table[c] += 1  # occ_table[ ord(c)-ord('a') ] += 1
            if c not in sequence:
                sequence.append(c)

            while si < len(sequence) and occ_table[ sequence[si] ] > 1: # occ_table[ ord(sequence[si])-ord('a') ]
                si += 1

            if si < len(sequence):
                fnrc += sequence[si]
            else:
                fnrc += '#'

        return fnrc
```
