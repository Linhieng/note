# [231001 Boundary traversal of matrix](https://practice.geeksforgeeks.org/problems/boundary-traversal-of-matrix-1587115620/1)

【题意】顺时针遍历矩阵边界

【Excepted】

- Time Complexity: O(N + M)
- Auxiliary Space: O(N + M)

## Solution

```py
class Solution:

    #Function to return list of integers that form the boundary
    #traversal of the matrix in a clockwise manner.
    def BoundaryTraversal(self,matrix, R, C):

        # top
        res = matrix[0]

        # right
        res += [ matrix[r][-1] for r in range(1, R-1) ]

        # bottom
        if R > 1:
            res+= reversed(matrix[-1])

        # left
        if C > 1:
            res += [ matrix[r][0] for r in range(R-2, 0, -1) ]

        return res
```

```py
class Solution:

    #Function to return list of integers that form the boundary
    #traversal of the matrix in a clockwise manner.
    def BoundaryTraversal(self,matrix, n, m):

        if n == 1:
            return matrix[0]
        if m == 1:
            return [row[0] for row in matrix]

        ans = []

        for c in range(m-1):
            ans.append(matrix[0][c])

        for r in range(n-1):
            ans.append(matrix[r][m-1])

        for c in range(m-1, 0, -1):
            ans.append(matrix[n-1][c])

        for r in range(n-1, 0, -1):
            ans.append(matrix[r][0])

        return ans
```
