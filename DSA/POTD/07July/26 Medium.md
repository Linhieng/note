## [230726 Kth Ancestor in a Tree](https://practice.geeksforgeeks.org/problems/kth-ancestor-in-a-tree/1)

【题意】: 寻找某节点的第 K 个祖先节点

【Excepted】:
- Time Complexity: O(N)
- Auxiliary Space: O(N)

【Constraints】:
- 1 <= N <= $10^5$
- 1 <= K <= 100
- 1 <= Node.data <= N

刚开始写了个暴力递归，应该是没错的，不过只过了 5 个用例就超出堆栈限制了。
后面想到用 map 先存储父节点，然后就解决了。耗时 37 分钟。

从评论区看到一半，想到可以只存储父节点连。于是自己实现了一下。

这么说来，这道题考的其实是深度优先遍历和广度优先遍历。我的第一种就是广度优先，第二种就是深度优先。

### Python3

【改写评论区 - 深度优先遍历】:
```py
def dfs(head, node, k, res):
    if head is None:
        return 0

    if head.data == node:
        return 1

    left = dfs(head.left, node, k, res)
    if left == k:
        res[0] = head.data
        return 0

    right = dfs(head.right, node, k, res)
    if right == k:
        res[0] = head.data
        return 0

    if left == 0 and right == 0:
        return 0
    # left 和 right 是互斥的，要么同为 0，要么不同为 0
    return 1 + left + right


def kthAncestor(root, k, node):
    res = [-1]
    dfs(root, node, k, res)
    return res[0]
```

【我+评论区 - 深度优先遍历】:
```py
def process(head, node, node2root):
    if head is None:
        return False
    if head.data == node:
        return True

    Im_Father = process(head.left, node, node2root)
    if Im_Father:
        node2root.append(head)
        return True

    Im_Father = process(head.right, node, node2root)
    if Im_Father:
        node2root.append(head)
        return True
    return False


def kthAncestor(root, k, node):
    node2root = []
    process(root, node, node2root)
    if len(node2root) < k:
        return -1
    return node2root[k-1].data
```

【我的 - 广度优先遍历 map 存储父节点】:
```py
def kthAncestor(root,k, node):
    queue = [root]
    curr_end = root
    next_end = None
    father = {}
    father[root] = None

    target = None

    while len(queue) != 0:
        cur = queue.pop(0)

        if cur.data == node:
            target = cur
            break

        if cur.left is not None:
            father[cur.left] = cur
            next_end = cur.left
            queue.append(cur.left)
        if cur.right is not None:
            father[cur.right] = cur
            next_end = cur.right
            queue.append(cur.right)

        if cur is curr_end:
            curr_end = next_end

    while k > 0:
        k -= 1
        target = father[target]
        if target is None:
            return -1
    return target.data
```

### 失败 ❌

【我的 - ❌递归缓存，只通过一半】:
```py
def hasNode(head, k, node):
    if head is None:
        return False
    if k == 0 and head.data == node:
        return True

    return hasNode(head.left, k-1, node) or hasNode(head.right, k-1, node)

def find(head, k, node, map):
    if head in map:
        return map[head]

    map[head] = head if hasNode(head, k, node) else None

    if map[head] is not None:
        return map[head]

    map[head.left] = find(head.left, k, node, map)
    if map[head.left] is not None:
        return map[head.left]

    map[head.right] = find(head.right, k, node, map)
    if map[head.right] is not None:
        return map[head.right]

    return None


def kthAncestor(root,k, node):
    map = {}
    map[None] = None
    res = find(root, k, node, map)
    if res is not None:
        return res.data
    return -1
```

【我的 - ❌暴力递归，只通过 5 个】:
```py
def hasNode(head, k, node):
    if head is None:
        return False
    if k == 0 and head.data == node:
        return True

    return hasNode(head.left, k-1, node) or hasNode(head.right, k-1, node)

def find(head, k, node):
    flag = hasNode(head, k, node)
    if flag:
        return head

    left = find(head.left, k, node)
    if left is not None:
        return head.left

    right = find(head.right, k, node)
    if right is not None:
        return head.right

    return None


def kthAncestor(root,k, node):
    res = find(root, k, node)
    if res is not None:
        return res.data
    return -1
```