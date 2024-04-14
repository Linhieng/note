# [230909 Kth largest element in BST](https://practice.geeksforgeeks.org/problems/kth-largest-element-in-bst/1)

【题意】获取 BST 中的第 k 大的节点

【Excepted】

- Time Complexity: O(N).
- Auxiliary Space: O(H) where H is max recursion stack of height H at a given time.

## Solution

【Morris】

```py
class Solution:
    def kthLargest(self,root, k):
        # Morris
        cur = root
        most_left = None
        kth = 0
        while cur is not None:
            if cur.right is not None:
                # goto the most left base on cur
                most_left = cur.right
                while most_left.left is not None and most_left.left is not cur:
                    most_left = most_left.left

                if most_left.left is not cur: # visited most_left first time
                    # set a temp path to node, so that next time can go back cur
                    most_left.left = cur
                    cur = cur.right
                    continue # over
                # visited second time, del temp path
                most_left.left = None
            # 能够到达两次的节点（被 cur 赋值两次），第一次到达时不会走到这里
            # 能走到这里的，只会是只能到达一次的节点（非最左的叶子节点），和能到达两次的节点的第二次到达
            # 在此之前的 cur 只会往右走，只有到达这里后才会往左走，所以能够保证到达这里的节点，一定是先右后左的
            """
            机翻+个人校对：
            A node that can be reached twice (assigned by cur twice)
                will not go here in the first time
            The only ones that make it here are
                the ones that make it only once (not the leftmost leaf)
                and the ones that make it twice
            The cur before that will only go to the right,
            and it will only go to the left when it reaches here,
            so it is guaranteed that the node that reaches here will be right first and then left
            """
            kth += 1
            if kth == k:
                return cur.data
            cur = cur.left
        return None
```

【非递归】

```py
class Solution:
    def kthLargest(self,root, k):
        stack = []
        kth = 0
        p = root
        while len(stack) > 0 or p is not None:
            if p is not None:
                stack.append(p)
                p = p.right
            else:
                p = stack.pop()
                kth += 1
                if kth == k:
                    return p.data
                p = p.left
        return None
```

【递归】

```py
class Solution:
    def kthLargest(self,root, k):
        def travel_re_inorder(node):
            if not node or len(inorder) > k:
                return
            travel_re_inorder(node.right)
            inorder.append(node.data)
            travel_re_inorder(node.left)
        inorder = []
        travel_re_inorder(root)
        return inorder[k-1]

```