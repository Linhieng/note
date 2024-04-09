## [230715 - Delete middle element of a stack](https://practice.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1)

- 【题意】 删除栈中间元素。
- 【中间元素】: 以 1 作为 based indexing, 题意将中间元素定义为 - ceil((size_of_stack+1)/2), 比如 (2+1)/2 向上取整就是
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(N)
- 【Constraints】
    - 2 ≤ size of stack ≤ $10^5$

太简单了, 栈的结构是数组的话, 直接从中间位置栈顶交换元素就解决了。
而且代码也是一次过。 因为代码很短。
非要说点什么的话:
- py 的整数除法 `//` 是向下取整, 即 `floor()`;
- 向上取整是 `ceil()`
- 下标从 0 开始, 长度 `len`
    - 奇数长度的话, 中点下标为: `len // 2`
    - 偶数长度的话, 中点(一般都是指偏左那一个)的下标为: `len // 2 - 1`; 如果要中点偏右的就不需要 - 1
- 下标从 1 开始, 长度 `len`
    - 偶数长度的话, 中点(默认偏左)是第 `len // 2` 个, 中点偏右的是第 `len // 2 + 1` 个
    - 奇数长度的话, 中点是第 `(len+1) // 2` 个, 或者第 `len // 2 + 1` 个

当然, 原题意应该是想考递归, 于是又重新想了一下, 最后还是一次性提交成功了。
说点什么的话:
- py 数组是 append 方法, 这个不用说吧, 只不过做的时候手抖就写成 push 了, 但 py 数组(list)是有 pop 的
- 这次记得写 self 了, 所以这里没报错
- 想出这个递归的思路, 就是暴力递归的思路, 不关注其他, 最开始的想法就是: 假设我从栈中拿出一个元素, 发现这个元素不是中间元素, 那么我就要把他放回去
- 问题在于, 我应该从哪里开始递归? 首先, 可能不可能是拿元素前和放回元素后递归, 这样栈的元素不会减少
- 那就是中间了, 所以是在中间递归, 中途还想过, 是否要通过返回变量的形式获取要放回的元素, 后面想了想不需要
- 确定好在哪里递归后, 就要确定递归接收的条件
- 接收条件就是, 当我拿出元素后, 发现他就是中间元素, 此时我就不放回
- 想明白这个后, 利用两个变量, mid 下标和 cur 下标, 拿出元素后, 要获得被拿出的元素下标是多少, 然后将它与 mid 比较, 相同的话, 就直接返回
- 然后就是 cur 下标如何变? cur 初始值是栈的长度, 那我就在拿出元素后, 让 cur-=1, 这样就能让 cur 的值刚好是下标值了, 于是可以比较。
- 当然, 具体的 cur 比较还得看 mid 是怎么求的, 我的 mid 求的是中间元素的下标, 而不是中间元素是第几个。

### Python3 代码

【我的】
```py
class Solution:
    #Function to delete middle element of a stack.
    def deleteMid(self, s, sizeOfStack):
        mid = sizeOfStack // 2 if sizeOfStack % 2 == 1 else sizeOfStack // 2 - 1
        while mid+1 < sizeOfStack:
            s[mid] = s[mid+1]
            mid += 1
        s.pop()
```
```py
class Solution:

    def popMid(self, s, mid, cur):

        tmp = s.pop() # 拿出一个元素
        cur -= 1 # 获取拿出的元素下标

        if mid == cur: # 拿出的元素是中间元素吗?
            return

        # 不是, 那就让别人继续干, 反正肯定有人能拿出中间元素
        self.popMid(s, mid, cur)
        # 别人干完了, 那我就得把我拿出来的元素放回去
        s.append(tmp)


    #Function to delete middle element of a stack.
    def deleteMid(self, s, sizeOfStack):
        mid = sizeOfStack // 2 if sizeOfStack % 2 == 1 else sizeOfStack // 2 - 1
        self.popMid(s, mid, sizeOfStack)
```