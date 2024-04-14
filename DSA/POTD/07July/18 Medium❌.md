## [230718 - Longest Repeating Subsequence](https://practice.geeksforgeeks.org/problems/longest-repeating-subsequence2004/1)

- 【题意】 LCS 最长公共子序列 问题
- 【要求】
    - Time Complexity O(N*2)
    - Auxiliary Space O(N*2)
- 【Constraints】
    - 1 ≤ N ≤ $10^5$

想了 90 分钟, 想不出来, 于是打开 Hint, 结果就两个字 —— "Use LCS."。我......

二维数组 dp 的含义为: `dp[i][j]` 表示 `str[0...i-1]` 和 `str[0...j-1]` 中最长重复子序列的长度。
递归关系为:
- 如果 `str[i-1] == str[j-1]` 且 `i != j`, 则 `dp[i][j] = dp[i-1][j-1] + 1`, 表示当前字符可以作为最长重复子序列的一部分。
- 否则, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`, 表示当前字符无法作为最长重复子序列的一部分，长度无法继续变大。

### Python3 代码

【评论区 - 递归 ❌】:
```py
class Solution:
    def f(self, i, j, A, B):
        if i < 0 or j < 0:
            return 0
        if A[i] == B[j] and i != j:
            return 1 + self.f(i-1, j-1, A, B)
        return max( self.f(i-1, j, A, B), self.f(i, j-1, A, B) )

	def LongestRepeatingSubsequence(self, str):
	    n = len(str)
	    return self.f(n-1, n-1, str, str)
```

【评论区 - 递归填表】:
```py
class Solution:
    def f(self, i, j, A, B, dp):
        if i < 0 or j < 0:
            return 0
        if dp[i][j] != -1:
            return dp[i][j]
        if A[i] == B[j] and i != j:
            return 1 + self.f(i-1, j-1, A, B, dp)

        dp[i][j] = max( self.f(i-1, j, A, B, dp), self.f(i, j-1, A, B, dp) )
        return dp[i][j]

	def LongestRepeatingSubsequence(self, str):
	    n = len(str)
	    dp = [[-1] * n for _ in range(n)]
	    return self.f(n-1, n-1, str, str, dp)
```
【评论区 - 动态规划】:
```py
class Solution:
	def LongestRepeatingSubsequence(self, str):
	    n = len(str)
	    dp = [ [0] * (n+1) for _ in range(n+1) ]

	    for i in range(1, n+1):
	        for j in range(1, n+1):
	            if str[i-1] == str[j-1] and i != j:
	                dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[n][n]
```

【评论区 - 动态规划优化】:
```py
class Solution:
	def LongestRepeatingSubsequence(self, str):
	    n = len(str)
	    curr = [0] * (n+1)
	    prev = [*curr]

	    for i in range(1, n+1):
	        for j in range(1, n+1):
	            if str[i-1] == str[j-1] and i != j:
	                curr[j] = 1 + prev[j-1]
                else:
                    curr[j] = max(prev[j], curr[j-1])
            prev = [*curr]
	    return prev[n]
```

### 感觉不要挺可惜的, 反正也就几个字符, 放着吧

```py
class Solution:
	def LongestRepeatingSubsequence(self, str):
		# 首先, 题目中的子序列允许不连续, 这就很......
		# 先考虑暴力
		#       首先, 子序列 A, 如果以 x 开头, 则子序列 B 也一定以 x 开头
		#       从左往右遍历, 存储前面出现过的每个字符
		#       当识别到某个字符出现两次时, 说明以该字符开头的子序列符合条件
		#       那重点就在于, 如何找到以该字符开头的最长子序列
		#       按照题意, 要是字符串是 axy2zyxjz, 则 xz 或 yz 也算是合法的子序列
		#       那我的遍历方式就是,
	    #           前面的 axy2z 因为没有重复字符, 所以保存
	    #           识别到 y 时, 因为前面有重复字符,
	    #           所以此时需要查看以这两个字符开头的最长子序列是多长
	    #           对! 最长子序列中的字符一定都是至少出现两次的!
	    #   所以首先统计每个字符出现的次数, 如果所有字符只出现1次, 则最长重复子序列长度为 0
	    #       如果存在某个每个字符出现长度大于 2, 则最长重复子序列长度为 1
		#           因为只有两个相同字符, 他们只能各自作为 A B 子序列的开头, 此时长度为 1
		#               如果想要以该字符开头的子序列长度更长, 需要更多两个相同的字符
		#               对于这种情况, abac 其中子序列 ac 和 ac 是不允许的, 因为题意中规定了
		#                   ac 和 ac, 其中相同的字符下标一定得不一样
		#       如果最大字符出现次数等于 3, 则至少存在长度为 2
        #           同理, 想要更长, 就得看有多少个长度大于 2 的字符
        # xxax 不会被算成是 xax 和 xax, 虽然两者的首个 x 字符是不相同的, 但是后弦的 ax 是共用的
        # 所以程序不认为这是两个唯一的 AB, 换句话说, 题意要求的是 A,B字符串中每个位置的字符都相同
        # 同时他们在原字符串中的索引不相同!
        # 那就可以这样做!!!
        #       当找到两个相同字符时, 分别从这两个位置往后遍历, 双指针
        #       首先一个指针不动, 然后
        #
        # 用一个数组, 保存以当前元素开头, 后面重复子串的最大长度
        A = str
        slen = len(str)
        maxlen = [ None ] * slen
        freq = {}
        next_i = {}
        for i in range(slen-1, -1, -1):
            c = A[i]
            if c not in freq:
                freq[c] = 0
                next_i[c] = i
                maxlen[i] = [freq[c], None]
            else:
                freq[c] += 1
                maxlen[i] = [freq[c], next_i[c]]
                next_i[c] = i

        res = 0
        for i, c in enumerate(A):
            occ_time, next_i = maxlen[i]
            if occ_time < 1:
                continue
            maxres = 1
            for j in range(i+1, next_i+1):
                if maxlen[j][0] > 0 and next_i <= maxlen[j][1]:
                    maxres += maxlen[j][0]
            if maxres > res:
                res = maxres

        return res
```