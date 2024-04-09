# [230903 Check if Tree is Isomorphic](https://practice.geeksforgeeks.org/problems/check-if-tree-is-isomorphic/1)

【题意】：判断两棵二叉树是否同构

【Excepted】

- Time Complexity: O(min(M, N)) where M and N are the sizes of the two trees.
- Auxiliary Space: O(min(H1, H2)) where H1 and H2 are the heights of the two trees.

易错点：

- 不同节点的 data 允许相同，所以不能简单的暴力遍历然后比较。
- 当两个子节点 data 相同时，判断方式应该和普通情况一样，不能简单只判断 left left 同构。

## Solution

【评论区改写】

```py
class Solution:
    def isIsomorphic(self, root1, root2):
        # Base case: If both trees are empty, they are isomorphic
        if not root1 and not root2:
            return True
        # If one tree is empty but the other is not, they are not isomorphic
        if not root1 or not root2:
            return False

        # Check if the data at the current nodes is the same
        if root1.data != root2.data:
            return False

        # 要么 left left 同构
        if self.isIsomorphic(root1.left, root2.right) and self.isIsomorphic(root1.right, root2.left):
            return True

        # 要么 left right 同构（镜像）
        if self.isIsomorphic(root1.left, root2.left) and self.isIsomorphic(root1.right, root2.right):
            return True

        # 否则不同构
        return False
```
