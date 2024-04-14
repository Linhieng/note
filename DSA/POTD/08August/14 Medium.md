## [230814 Non Repeating Numbers](https://practice.geeksforgeeks.org/problems/finding-the-numbers0215/1)

【题意】： 数组中只有两个数字不成对，找出这两个数字

【 Excepted 】：
- Time Complexity: O(N)
- Space Complexity: O(1)

和数字有关，同时所需的空间复杂度极小，这个时候应该从二进制入手。

异或运算的一个特性：相同数字进行异或会等于零。

### Python3

```py
class Solution:
	def singleNumber(self, nums):
	    xor = 0
	    for n in nums:
	        xor ^= n
	    mostRight = xor & (~xor + 1)
	    a = 0
	    for n in nums:
	        if n & mostRight == 0: # 注意这里要么是 0，要么是 mostRight
	            a ^= n
	    return sorted([a, a ^ xor])
```

【我+评论区 SC: O(1)】
```py
class Solution:
	def singleNumber(self, nums):
	    aXORb = 0
	    for n in nums:
	        aXORb ^= n
        # 通过 divideFlag 来将 a 和 b 区分开。这个值不一定得是最右侧的第一个 1, 只要是任意位置上的一个 1 就可以
	    # 下面代码等同于 divideFlag = aXORb & ~(aXORb - 1)
        divideFlag = 1
	    while aXORb & 1 != 1:
	        aXORb >>= 1
	        divideFlag <<= 1

	    a, b = 0, 0
	    for n in nums:
            # 通过与 divideFlag 求异或，我们能够保证 a 和 b 会分别进入不同的分支。至于其他的数字，由于他们是成对的，所以最后都会被消掉。
	        if (n & divideFlag) == divideFlag:
	            a ^= n
	        else:
	            b ^= n
	    return sorted([a, b])
```

【我的 SC: O(N)】
```py
class Solution:
	def singleNumber(self, nums):
		once = set()
		for n in nums:
	        if n in once:
		        once.remove(n)
	        else:
	            once.add(n)
	    ans = [*once]
	    ans.sort()
		return ans
```