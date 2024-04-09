## [230730 Inorder Successor in BST](https://practice.geeksforgeeks.org/problems/inorder-successor-in-bst/1)

【题目】： 搜索二叉树中序遍历的后继节点

【 Excepted 】：
- Time Complexity: O(Height of the BST).
- Auxiliary Space: O(1).

没看清楚题意，以为传入的 x 是数字，结果没想到是节点。
然后就是在重写 Morris 算法时卡了一下。
最后一道简单题居然用了 40 分钟！

【 Morris 坑】：
1. 寻找最右侧节点时，是通过 most_right.right 去判断，而不是 most_right 自己去判断
2. 第二次到达时，因为要 most_right.right 设置为 cur 后就 continue 了，所以需要继续往左边走！ cur=cur.left

中序遍历，节点 x 的后续节点有两种可能：
- x 有右树时， x 的后继节点就是右树上的最左节点
- x 没有右树时， x 的后继节点是父链上离 x 最近的左子节点，如果没有，则说明 x 是最右侧节点，它没有后继节点

搜索二叉树二叉树特性：中序遍历是有序的！利用这个特性再思考 x 的后继节点：
- x 有右子树时，后继节点是右子树上的最左节点。
- x 没有右子树时，此时直接返回最近的比 x 大的那个节点！

### Python3

【评论区 - 利用 BST 特性】：
```py
class Solution:
    def inorderSuccessor(self, root, x):
        if root is None:
            return None

        successor = None
        while root is not None:
            # 想不出还能优化的地方。
            # root 只会走比 x 大的分支， 当两个分支都比 x 大时，往左分支走。
            if x.data < root.data:
                successor = root
                root = root.left
            else:
                root = root.right

        return successor
```

【我的 - 普通非递归中序遍历】：
```py
class Solution:
    def inorderSuccessor(self, root, x):
        if root is None:
            return None

        stack = []
        cur = root
        flag = False
        while len(stack) != 0 or cur is not None:
            if cur is not None:
                stack.append(cur)
                cur = cur.left
            else:
                cur = stack.pop()

                if flag:
                    return cur
                elif cur.data == x.data:
                    flag = True

                cur = cur.right

        return None
```

【我的 - Morris 中序遍历】：
```py
class Solution:

    # returns the inorder successor of the Node x in BST (rooted at 'root')
    def inorderSuccessor(self, root, x):
        if root is None:
            return None

        flag = False
        cur = root
        while cur is not None:

            if cur.left is not None:
                most_right = cur.left
                while most_right.right is not None and most_right.right is not cur:
                    most_right = most_right.right

                if most_right.right is None: # first come
                    most_right.right = cur
                    cur = cur.left # IMPORTANT
                    continue
                # second come
                most_right.right = None

            if flag:
                return cur
            elif cur.data == x.data:
                flag = True

            cur = cur.right

        return None
```