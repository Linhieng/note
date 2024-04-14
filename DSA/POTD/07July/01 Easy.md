## [230701 - Number of 1 Bits](https://practice.geeksforgeeks.org/problems/set-bits0143/1)

- 【题意】 打印二进制形式的 N 有多少位上是 1
- 【要求】
    - Time Complexity O(logN)
    - Auxiliary Space O(1)
- 【Constraints】
    - 1 <= N <= $10^9$;

不断取出最右侧位上的值，直到 0。 看完题到做出来不到三分钟。

还可以进一步优化，前面的时间复杂度是 O(N)，即遍历完每一位。
但通过 `N &= N-1` 可以让每一次都消去一个 1。时间复杂度是 O(number of 1 bits)。
简单解释： N-1 时，只有最右的 1 会被借位变成 0，所以只消除最右的一个 1。 重新和 N 做 `&` 运算是因为借位后右侧的一些位会生成多余的 1，需要消除。

### Python3 代码

【极致优化】:
```py
class Solution:
	def setBits(self, N):
		bits = 0
		while N > 0:
		    N &= N-1
		    bits += 1
	    return bits
```

【我的】
```py
class Solution:
	def setBits(self, N):
		bits = 0
		while N != 0:
		    if 1 == (N & 1):
		        bits += 1
	        N >>= 1
        return bits
```