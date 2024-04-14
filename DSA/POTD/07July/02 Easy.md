## [230702 Copy Set Bits in Range](https://practice.geeksforgeeks.org/problems/copy-set-bits-in-range0623/1)

【题意】： 将 y 的 [L,R] 位上值为 1 的数拷贝拷贝到 X 上。注意是从右到左进行计算，下标从 1 开始。

【 Excepted 】：
- Time Complexity: O(R - L)
- Auxiliary Space: O(1)

明明很简单的题目，硬是因为 py 的位运算和理解错题意搞了半天 —— 40 多分钟。

原本理解的题意： 将 y 的 [L,R] 位上内容直接拷贝到 x 上 。
实际的题意： 只拷贝 [L,R] 上值为 1 的数。

所以，解决方案很简单，伪代码为： x | (y & [L,R])

cpp 位运算：
- 没有 >>> 运算符，想要实现无符号右移，只需要指定数据类型是无符号类型即可。

py 位运算：
- 因为没有数据类型，所以左移的时候并不会消掉内容，需要移位后再次 & 运算，从而保留自己想要的位数。
- 同理，右移时只有无符号右移。
- 同理，求反时的结果直接输出只会是简单的变成负数，需要再次进行 & 运算。

### Solution

【我的 - py 代码】：
```py
class Solution:
    def setSetBit(self, x, y, l, r):
        rl = 0xFFFFFFFF
        rl = rl << (32-r) & 0xFFFFFFFF
        rl >>= 32-r + l-1
        rl <<= l-1

        return x | (y & rl)
```

【我的 - cpp 代码】:
```cpp
class Solution{
    public:
    int setSetBit(int x, int y, int l, int r){
        unsigned int rl = 0xFFFFFFFF;
        rl <<= 32-r;
        rl >>= 32-r + l-1;
        rl <<= l-1;
        return x | (y & rl);
    }
};
```