## [230728 Lowest Common Ancestor in a BST](https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1)

【题意】: 最近公共祖先节点

【Expected】:
- Time Complexity: O(Height of the BST).
- Auxiliary Space: O(Height of the BST).

简单解法： 先存储每个节点的父节点。然后求出 n1 节点的祖先列表，再从 n2 节点往上遍历，判断该节点是否在 n1 的祖先列表中。

递归解法： 一个节点，问两个子节点，看看 n1 和 n2 是否在他们身上。如果两个子节点都说在，那么 该节点就是 LCA，如果只有一个节点在，那么说明 n1 n2 就在该子节点上，直接返回。

【geeks 快捷键】:
ctrl+shift+alt+箭头
ctrl+alt+箭头

【注意】:
== 写成 =

### Python3

【我的 - 递归解法】:
```py
def LCA(root, n1, n2):
    # 就近返回。
    if root is None or root.data == n1 or root.data == n2:
        return root

    left = LCA(root.left, n1, n2)
    right = LCA(root.right, n1, n2)

    # 都不为空，则说明 n1 n2 在 root 节点上分叉了
    if left is not None and right is not None:
        return root

    # 一个为空，一个不为空，说明 n1 n2 都在某一子节点上
    return left if left is not None else right
```

【我的 - 简单解法】:
```py
def LCA(root, n1, n2):
    queue = [root]
    curr_end = root
    next_end = None

    fathermap = {}
    fathermap[root] = None
    while len(queue) != 0:
        cur = queue.pop(0)

        if n1 == cur.data:
            n1 = cur
        if n2 == cur.data:
            n2 = cur

        if cur.left is not None:
            fathermap[cur.left] = cur
            next_end = cur.left
            queue.append(cur.left)
        if cur.right is not None:
            fathermap[cur.right] = cur
            next_end = cur.right
            queue.append(cur.right)

        if cur is curr_end:
            curr_end = next_end

    n1ance = set()
    while n1 is not None:
        n1ance.add(n1)
        n1 = fathermap[n1]

    while n2 is not None:
        if n2 in n1ance:
            return n2
        n2 = fathermap[n2]

    return root
```