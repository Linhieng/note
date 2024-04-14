# [230908 Binary Tree to BST](https://practice.geeksforgeeks.org/problems/binary-tree-to-bst/1)

【题意】：将二叉树转换搜索二叉树

【Excepted】：

- Time Complexity: O(NLogN).
- Auxiliary Space: O(N).

真的没想到，自从定了 40 分钟内结束后，已经连续三道简单题都做不出来了，有点怀疑人生了……

这道题我连题意都理解错了，题意只要求是 BST，但我却以为是 AVL……

## Solution

```py
'''
# Tree Node
class Node:
    def __init__(self, val):
        self.right = None
        self.data = val
        self.left = None
'''

class Solution:
    def binaryTreeToBST(self, root):
        inorder_values = []
        def getAll(node):
            if not node:
                return
            inorder_values.append(node.data)
            getAll(node.left)
            getAll(node.right)
        getAll(root)
        inorder_values.sort()

        def fill_inorder_data(node):
            if not node:
                return
            fill_inorder_data(node.left)
            node.data = inorder_values.pop(0)
            fill_inorder_data(node.right)
        fill_inorder_data(root)
        return root
```
