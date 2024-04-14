## [230805 Chocolate Distribution Problem](https://practice.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1)

【题意】： N 个盘子， M 个学生。第 i 个盘子中有  $A_i$ 个巧克力，每个学生只能分配到一个盘子，请问分配到最多巧克力和分配到最小巧克力的两个学生的最小差值是多少？

【 Excepted 】：
- Time Complexity: O(N*Log(N))
- Auxiliary Space: O(1)

这道题简单就简单在没有顺序要求，所以直接先排序，然后计算每 M 个数之间的差值，返回最小差值就可以了。
总的时间复杂度花费了排序上，遍历出最小差值的复杂度是 O(N-M)

### Python3

【评论区】：
```py
class Solution:
    def findMinDiff(self, A,N,M):
        if M <= 1:
            return 0

        A.sort()
        min_diff = 10 ** 9

        # 通过两个指针，就只需要思考 end 的边界，比起我的解法更容易理解，也更不容易出错！
        start, end = 0, M-1
        while end < N:
            min_diff = min(min_diff, A[end] - A[start])

            start += 1
            end += 1

        return min_diff
```

【我的】：
```py
class Solution:

    def findMinDiff(self, A,N,M):
        if M <= 1:
            return 0

        A.sort()
        min_diff = 10 ** 9

        for i in range(N-M+1):
            min_diff = min(min_diff, A[i+M-1] - A[i])

        return min_diff
```