## [230724 Right View of Binary Tree](https://practice.geeksforgeeks.org/problems/right-view-of-binary-tree/1)

- 【题意】 二叉树每层最右节点
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(Height of the Tree)
- 【Constraints】
    - 1 <= Number of nodes <= $10^5$
    - 0 <= NumberData of a node <= $10^5$

题意说的是 'Right view'，本质上就是每层最右节点。
直接层级遍历（利用队列实现）输出最右节点就可以了。
队列的大小不可能超过树的高度，所以空间复杂度是满足的。

评论区使用递归解决，思路也挺秒的。利用数组的大小，来判断当前要找第几层的最右节点。
因为是最右，所以是先往右找。右边如果找不到，则再往左边找。

### Python3 代码

【评论区 - 递归】:
```py
class Solution:
    def recursive(self, head, height, res):
        if head is None:
            return
        if height == len(res):
            res.append(head.data)
        self.recursive(head.right, height+1, res)
        self.recursive(head.left, height+1, res)

    def rightView(self,root):
        res = []
        self.recursive(root, 0, res)
        return res
```

【我的 - 层级遍历】：
```py
from queue import Queue
class Solution:
    #Function to return list containing elements of right view of binary tree.
    def rightView(self,root):
        q = Queue()
        q.put(root)

        cur_last = root
        next_last = None

        res = []
        while not q.empty():
            cur = q.get()

            if cur.left is not None:
                next_last = cur.left
                q.put(cur.left)
            if cur.right is not None:
                next_last = cur.right
                q.put(cur.right)

            if cur_last is cur:
                res.append(cur.data)
                cur_last = next_last
                next_last = None

        return res
```