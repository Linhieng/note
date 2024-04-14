## [230716 - Queue Reversal](https://practice.geeksforgeeks.org/problems/queue-reversal/1)

- 【题意】 反转队列
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(N)
- 【Constraints】
    - 1 ≤ N ≤ $10^5$
    - 1 ≤ elements of Queue ≤ $10^5$

刚开始的思路: 以为是数组形式的队列, 想着直接交换首尾元素。
跑了一下后才发现不是数组。于是借助栈实现。 用两个循环, 先将队列中的元素放到栈中, 然后出栈。

感觉有点简单, 于是又写了个递归的版本, 但似乎递归效果太差, 导致运行错误, 但代码应该是没错的, 1010/1130 的通过。
递归的代码很简单, 和昨天的思路差不多。 不过没通过也说明递归占用的系统空间开销很大, 虽然你自己没有使用新的空间。
后面让 ChatGPT 改写成了 c++ 代码, 就跑通过了。

【不熟悉的 py】:
- 判断队列是否为空 `q.empty()`
- 入队列 `q.put(item)`
- 出队列 `q.get()`
- 获取队列长度 `q.qsize()`

容易出错的地方:
- 变量名写错

### ChatGPT 改写的 c++ 代码

```cpp
#include<bits/stdc++.h> // 一次性导入所有标准库中的包
using namespace std; // 指定标准库命名空间（namespace）

class Solution
{
    public:
    void recursion(queue<int> &q)
    {
        // 先拿出一个元素
        int tmp = q.front();
        q.pop();

        // 后拿先放
        if (q.empty())
        {
            q.push(tmp);
            return;
        }

        // 让别人先放
        recursion(q);

        // 别人放完自己再放
        q.push(tmp);
    }
    queue<int> rev(queue<int> q)
    {
        recursion(q);
        return q;
    }
};
```

### Python3 代码

【我的 - 1010/1130】
```py
class Solution:
    def recursion(self, q):
        # 先拿出一个元素
        tmp = q.get()

        # 后拿先放
        if q.empty():
            q.put(tmp)
            return
        # 让别人先放
        self.recursion(q)

        # 别人放完自己再放
        q.put(tmp)

    #Function to reverse the queue.
    def rev(self, q):
        self.recursion(q)
        return q
```

【我的 - 利用栈反转】
```py
class Solution:
    #Function to reverse the queue.
    def rev(self, q):
        stack = []
        while not q.empty():
            stack.append(q.get())
        while len(stack) != 0:
            q.put(stack.pop())
        return q
```

【我的 - 首尾交换】
```py
class Solution:
    #Function to reverse the queue.
    def rev(self, q):
        qlen = q.qsize()
        arr = []
        while not q.empty():
            arr.append(q.get())

        midl = qlen // 2 if qlen % 2 == 1 else qlen // 2  - 1
        start = 0
        while start <= midl:
            arr[start], arr[qlen-start-1] = arr[qlen-start-1], arr[start]
            start += 1
        i = 0
        while i < qlen:
            q.put(arr[i])
            i += 1

        return q
```