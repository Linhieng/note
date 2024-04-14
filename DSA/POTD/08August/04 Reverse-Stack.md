## [230804 Reverse a Stack](https://practice.geeksforgeeks.org/problems/reverse-a-stack/1)

【题意】： 反转栈

【 Excepted 】：
- Time Complexity: O(N)
- Auxiliary Space: O(N)

这题目太不公平了，题意说了要用递归，但使用 PY 递归却提示超出堆栈深度。

### Python3

【数组栈特解 - 非递归】：
```py
class Solution:
    def reverse(self,St):
        if len(St) < 1:
            return
        left, right = 0, len(St)-1
        while left < right:
            St[left], St[right] = St[right], St[left]
            left += 1
            right -= 1
```

【数组栈特解 - 递归】：
```py
class Solution:
    def process(self, St, left, right):
        if left < right:
            St[left], St[right] = St[right], St[left]
            self.process(St, left+1, right-1)

    def reverse(self,St):
        if len(St) < 1:
            return
        self.process(St, 0, len(St)-1)
```

【钻漏洞 - 递归直接输出 1100/1120 ❌】：
```py
class Solution:
    def reverse(self,St):
        if len(St) > 0:
            print(St.pop(), end=' ')
            self.reverse(St)
```
【钻漏洞 - 直接输出】：
```py
class Solution:
    def reverse(self,St):
        if len(St) < 1:
            return
        while len(St) > 0:
            print(St.pop(), end=' ')
```

【队列反转栈】：
```py
class Solution:
    def reverse(self,St):
        if len(St) <= 1:
            return

        queue = []
        while len(St) > 0:
            queue.append(St.pop())
        while len(queue) > 0:
            St.append(queue.pop(0))
```

【递归反转栈 - 1110/1120 ❌】：
```py
class Solution:
    def getBottom(self, St):
        if len(St) == 1:
            return St.pop()
        else:
            tmp = St.pop()
            bottom = self.getBottom(St)
            St.append(tmp)
            return bottom

    def reverse(self,St):
        if len(St) <= 1:
            return

        bottom = self.getBottom(St)
        self.reverse(St)
        St.append(bottom)
```