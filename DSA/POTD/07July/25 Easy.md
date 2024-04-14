## [230725 Level order traversal in spiral form](https://practice.geeksforgeeks.org/problems/level-order-traversal-in-spiral-form/1)

【题目】: 螺旋/蛇形 层级遍历二叉树

【要求】:
- Time Complexity: O(N).
- Auxiliary Space: O(N).

【Constraints】:
- 1 <= Number of nodes <= $10^5$
- 0 <= Data of a node <= $10^5$

14分钟搞定。 看到 170k 的提交准确率才 36% 时，本以为这道简单题有什么坑。
但按照我的思路完成了一把过！

螺旋层级遍历，就是偶数层从左往右遍历，奇数层从右往左遍历。
我的做法是先按正常的层级遍历进行，但是到了一层的末尾时，对该层已经存储进去的数据进行反转。
就这么简单。

第二个解决方案是： 利用两个栈存储奇偶层的元素。
- 奇数层从右往左遍历，所以添加时是从左往右添加
- 偶数层是从左往右遍历，所以添加时是从右往左添加
这个方法是一顿摸索后得出来的，刚开始不是这个思路，但摸着摸着发现这样解释最简单，也容易实现。
这种方法的代码实现有挺多坑的：
- 需要借助一个变量 odd 判断当前是奇数层还是偶数层。 不能简单的通过奇偶栈的大小进行判断
- 通过 if 判断更新 odd 变量时条件顺序是有要求的，不能随便 “优化”。

### Python3 代码

【我的 - 奇偶栈】：
```py
def findSpiral(root):

    odd_stack = [root]
    even_stack = []
    res = []

    odd = True

    while len(odd_stack) != 0 or len(even_stack) != 0:

        if odd:
            curr = odd_stack.pop()
            res.append(curr.data)

            if curr.right is not None:
                even_stack.append(curr.right)
            if curr.left is not None:
                even_stack.append(curr.left)

        else:
            curr = even_stack.pop()
            res.append(curr.data)

            if curr.left is not None:
                odd_stack.append(curr.left)
            if curr.right is not None:
                odd_stack.append(curr.right)


        if len(odd_stack) == 0: # 因为前面先判断的 odd，所以这里也要先根据 odd_stack 判断。
            odd = False
        elif len(even_stack) == 0:
            odd = True
```

【我的 - py 切换优化代码】:
```py
def findSpiral(root):
    queue = [root]
    res = []
    curr_end = root
    next_end = None
    curr_start = 0
    reverse = True
    while len(queue) != 0:
        curr = queue.pop(0)
        res.append(curr.data)
        if curr.left is not None:
            next_end = curr.left
            queue.append(curr.left)
        if curr.right is not None:
            next_end = curr.right
            queue.append(curr.right)

        if curr is curr_end:
            curr_end = next_end
            # next_end = None

            if reverse:
                res[curr_start:] = res[curr_start:][::-1]

            curr_start = len(res)
            reverse = not reverse

    return res
```


【我的】:
```py
def reverse(res, start):
    queue = []
    while start < len(res):
        queue.append( res.pop() )
    while len(queue) != 0:
        res.append( queue.pop(0) )


def findSpiral(root):
    queue = [root]
    res = []
    curr_end = root
    next_end = None
    curr_start = 0
    isreverse = True
    while len(queue) != 0:
        curr = queue.pop(0)
        res.append(curr.data)
        if curr.left is not None:
            next_end = curr.left
            queue.append(curr.left)
        if curr.right is not None:
            next_end = curr.right
            queue.append(curr.right)
        if curr is curr_end:
            curr_end = next_end
            # next_end = None

            if isreverse:
                reverse(res, curr_start)

            curr_start = len(res)
            isreverse = not isreverse

    return res
```