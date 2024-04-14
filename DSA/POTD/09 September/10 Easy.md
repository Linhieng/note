# [230910 Insert a node in a BST](https://practice.geeksforgeeks.org/problems/insert-a-node-in-a-bst/1)

【题意】：在 BST 中传输节点

【Excepted】

- Time Complexity: O(Height of the BST).
- Auxiliary Space: O(Height of the BST).

## Solution

```py
class Solution:
    #Function to insert a node in a BST.
    def insert(self,root, Key):
        p = root
        while p:
            if Key < p.data:
                if p.left:
                    p = p.left
                else:
                    p.left = Node(Key)
                    return
            elif Key > p.data:
                if p.right:
                    p = p.right
                else:
                    p.right = Node(Key)
                    return
            else:
                return
```

```py
class Solution:
    #Function to insert a node in a BST.
    def insert(self,root, Key):
        if not root:
            return Node(Key)
        if Key < root.data:
            root.left = self.insert(root.left, Key)
        elif root.data < Key:
            root.right = self.insert(root.right, Key)
        return root
```
