## [230714 - Implement two stacks in an array](https://practice.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1)

- 【题意】 利用一个数组, 实现两个栈的功能。
- 【要求】
    - Time Complexity O(1)
    - Auxiliary Space O(1)
- 【Constraints】
    - 1 <= 操作次数 <= $10^4$;
    - 1 <= 栈的大小 <= 100
    - 栈中元素一定小于栈的大小

利用头尾两个指针就可以实现两个栈的功能。
说一下细节吧:
- 要么是忘记加 `self`
- 要么是 `1` 写成了 `2`
- 要么是忘记返回 `-1`
- 要么是 `+` 写成 `-`

### Python3 代码

【我的】
```py
class TwoStacks:
    def __init__(self, n=100):
        self.size = n
        self.arr = [0] * n
        self.top1 = -1
        self.top2 = n

    # Function to push an integer into stack 1
    def push1(self, x):
        if self.top1+1 < self.top2:
            self.top1 += 1
            self.arr[self.top1] = x


    # Function to push an integer into stack 2
    def push2(self, x):
        if self.top1+1 < self.top2:
            self.top2 -= 1
            self.arr[self.top2] = x

    # Function to remove an element from top of stack 1
    def pop1(self):
        if self.top1 > -1:
            self.top1 -= 1
            return self.arr[self.top1+1]
        return -1

    # Function to remove an element from top of stack 2
    def pop2(self):
        if self.top2 < self.size:
            self.top2 += 1
            return self.arr[self.top2-1]
        return -1
```