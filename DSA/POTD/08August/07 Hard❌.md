## [230807 Solve the Sudoku](https://practice.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1)

【题意】： 求解数独

【 Excepted 】：
- Time Complexity: $O(9^{N*N})$.
- Auxiliary Space: O(N*N).

没什么好说的，思路不难，但编程能力不过关，无法实现回溯。差不多经过两个小时后，还是选择看答案。

看了别人的做法，我在想我不单单是编程能力不过关，编程思维也需要改变。

我原本的解题思路是：
- 先判断固定的数字是否合法，然后再进行下一步
- 求取空位置上可能的取值，放在一个 `possible_table` 变量中。
- 对 `possible_table` 中，每个位置上的情况进行全排列，对每一种结果都验证一下是否合法。
    - 在看了 Hint 后，发现可以用回溯算法解决，而不是全排列。

看完别人的代码后，我发现：
- 在没有解决完问题前，不要想着为机器减少负担。如果还没有解决完问题就想着减少循环次数，那么你最开始的思路就容易乱，而且代码量也多，看起来也累
- 回溯和递归有点类似，暂时说不明白，直接看代码就懂

### Python 3

【来自 [AskPython 网站](https://www.askpython.com/python/examples/sudoku-solver-in-python) 的解决方案】：

```py
class Solution:
    """
        这个函数本身不难，我也实现了这个函数，但有一点不同：
            - 这个代码中多了个 num 参数，表示当前 num 还未插入到 grid 中
            - 而我的代码中没有 num 参数，我是直接判断 grid[row][col] 位置上的数值是否合法！
        这一点是个关键，代表着我的思维 “跑偏” 了。因为按照我的解法，我的思路会出现冗余代码：
            - 按照我的思路实现的代码，在遍历时需要对 [row][col] 进行特殊处理，而下面这个不需要，因为 num 还未在 grid 中。
    """
    def can_input(self, grid, row, col, num):
        for r in range(9):
            if grid[r][col] == num:
                return False

        for c in range(9):
            if grid[row][c] == num:
                return False

        row_start = row - row%3
        col_start = col - col%3
        for i in range(3):
            for j in range(3):
                if grid[i + row_start][j + col_start] == num:
                    return False
        """ 在这里也有一点点不一样，我的实现方式用到了乘除，而作者只用到求余运算：
        row_start = (row // 3) * 3
        col_start = (col // 3) * 3
        for r in range(row_start, row_start+3):
            for c in range(col_start, col_start+3):
                if grid[r][c] == num:
                    return False
        """
        return True

    #Function to find a solved Sudoku.
    def SolveSudoku(self, grid, x=0, y=0):
        if x == 8 and y == 9:
            return True
        if y == 9: # 这一点值的学习。 以前我只想到直接展开为一维的 (见 230802 的题目)
            x += 1
            y = 0
        if grid[x][y] > 0: # 固有数字，无法改变
            return self.SolveSudoku(grid, x, y+1)

        for possible_num in range(1, 10):
            if self.can_input(grid, x, y, possible_num):
                grid[x][y] = possible_num
                if self.SolveSudoku(grid, x, y+1): # 这里就是开始判断是否回溯了。
                    return True

            grid[x][y] = 0  # 这里就是开始回溯。

        return False

    #Function to print grids of the Sudoku.
    def printGrid(self,grid):
        for r in range(9):
            for c in range(9):
                print(grid[r][c], end=' ')
```