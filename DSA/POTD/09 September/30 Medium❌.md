# [230930 Boolean Matrix](https://practice.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1)

【题意】：矩形十字架感染

【Excepted】：

- Time Complexity: O(R * C)
- Auxiliary Space: O(R + C)

## Solution

```py
def booleanMatrix(matrix):
    R, C = len(matrix), len(matrix[0])

    row = [False] * R
    col = [False] * C

    for r in range(R):
        for c in range(C):
            if matrix[r][c] == 1:
                row[r] = True
                col[c] = True

    for r in range(R):
        for c in range(C):
            if row[r] or col[c]:
                matrix[r][c] = 1
```

```py
def booleanMatrix(matrix):
    R, C = len(matrix), len(matrix[0])
    row = set()
    col = set()
    for r in range(R):
        for c in range(C):
            if matrix[r][c] == 1:
                row.add(r)
                col.add(c)

    for r in range(R):
        for c in range(C):
            if r in row or c in col:
                matrix[r][c] = 1
```

【超时】

```py
def booleanMatrix(matrix):
    R, C = len(matrix), len(matrix[0])
    row = []
    col = []
    for r in range(R):
        for c in range(C):
            if matrix[r][c] == 1:
                row.append(r) if r not in row else None
                col.append(c) if c not in col else None

    for r in row:
        for c in range(C):
            matrix[r][c] = 1
    for c in col:
        for r in range(R):
            matrix[r][c] = 1
```
