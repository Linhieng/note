## [230729 Median of BST](https://practice.geeksforgeeks.org/problems/median-of-bst/1)

【题意】: 搜索二叉树的中位数

【Excepted】:
- Time Complexity: O(N).
- Auxiliary Space: O(Height of the Tree).

非递归中序遍历问题：
- 中序遍历时，始终只有一个 p，这个 p 最开始是 "头"（左子树的头），然后会是 "左"。当 "左" 弹出时，它又是 "头"（右子树的头），然后又是 "左"。

morris 遍历：
- 每到达一个非叶子节点时，都让其左子树的最右叶子节点连接到自己，确保了能够二次回到自己。
- 这样一来，当左子树为空时，一定能确保右子树是向上指的，从而回到“头”

morris 中序遍历：
- 叶子节点有两个： 左叶子和右叶子，因为我们是往左走的，所以能保证先到达左叶子
- 叶子节点只会到达一次，但非叶子会到达两次，第一次到达非叶子节点时，此时还没有到达左叶子，所以不能打印
- 当第二次到达非叶子节点时，能保证左叶子已经处理了，并且右叶子还没处理，所以可以打印。

### Python3

【我的 - morrisIn】:
```py
def findMedian(root):
    if root is None:
        return

    inorder = []

    cur = root
    while cur is not None:

        if cur.left is not None:
            most_right = cur.left
            while most_right.right is not None and most_right.right is not cur:
                most_right = most_right.right
            if most_right.right is None: # First come
                most_right.right = cur
                cur = cur.left
                continue
            # second come
            most_right.right = None
        # 最开始，肯定是 左节点为空才到达这里的，此时的节点是叶子节点
        # 之后，当第二次遍历时，也会走着一条路，此时的节点是“头节点”
        inorder.append(cur.data)
        # 当左空的时候，右节点一定非空，因为 most_right.right = cur 保证了此时右节点是向上指的
        cur = cur.right


    le = len(inorder)
    if le % 2 == 0:
        m = (inorder[le//2-1] + inorder[le//2])
        return m // 2 if m % 2 == 0 else m / 2

    return inorder[le//2]
```

【我的 - 非递归中序遍历】:
```py
def findMedian(root):
    inorder = []

    stack = []
    p = root
    while len(stack) != 0 or p is not None:
        if p is not None:
            stack.append(p)
            p = p.left
        else:
            p = stack.pop()
            inorder.append(p.data)
            p = p.right

    le = len(inorder)
    if le % 2 == 0:
        m = (inorder[le//2-1] + inorder[le//2])
        return m // 2 if m % 2 == 0 else m / 2

    return inorder[le//2]
```

【我的 - 递归中序遍历】:
```py
def recursion(root, arr):
    if root is None:
        return
    recursion(root.left, arr)
    arr.append(root.data)
    recursion(root.right, arr)

def findMedian(root):
    arr = []
    recursion(root, arr)
    le = len(arr)
    if le % 2 == 0:
        m = (arr[le//2-1] + arr[le//2])
        return m // 2 if m % 2 == 0 else m / 2

    return arr[le//2]
```