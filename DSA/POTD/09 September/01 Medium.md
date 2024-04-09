# [230901 Leftmost and rightmost nodes of binary tree](https://practice.geeksforgeeks.org/problems/leftmost-and-rightmost-nodes-of-binary-tree/1)

【题意】：按层序打印树两侧端点

【Excepted】

- Time Complexity: O(N)
- Auxiliary Space: O(number of nodes in a level)

## Python3

```py
def printCorner(root):
    queue = [root]
    ans = []

    while len(queue) != 0:
        cur_level_num = len(queue)
        for i in range(cur_level_num):
            cur = queue.pop(0)
            if i == 0 or i == cur_level_num - 1:
                ans.append(cur.data)
            if cur.left:
                queue.append(cur.left)
            if cur.right:
                queue.append(cur.right)

    for i in ans:
        print(i, end=' ')
```

```py
def printCorner(root):
    queue = [root]
    cur_end = root
    next_end = None
    id = 0

    ans = []

    while len(queue) != 0:
        cur = queue.pop(0)
        id += 1

        if id == 1:
            ans.append(cur.data)

        if cur.left:
            next_end = cur.left
            queue.append(cur.left)
        if cur.right:
            next_end = cur.right
            queue.append(cur.right)

        if cur is cur_end:
            if id != 1:
                ans.append(cur.data)
            cur_end = next_end
            next_end = None
            id = 0

    for i in ans:
        print(i, end=' ')

```
