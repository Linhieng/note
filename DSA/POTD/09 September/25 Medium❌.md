# [230925 Maximum Sum Combination](https://practice.geeksforgeeks.org/problems/maximum-sum-combination/1)

【题意】：找出两个数组的前 K 个最大和

【Excepted】：

- Time Complexity: O(Nlog(N))
- Auxiliary Space: O(N)

## Solution

```py
import heapq
class Solution:
    def maxCombinations(self, N, K, A, B):

        A.sort(reverse=True)
        B.sort(reverse=True)

        potential_max_sum = []
        for i in range(K):
            max_sum = A[i] + B[0]
            max_sum_index = (i, 0)
            heapq.heappush(potential_max_sum, (-max_sum, max_sum_index))

        ans = []

        while K > 0:
            max_sum, max_sum_index = heapq.heappop(potential_max_sum)
            ans.append(-max_sum)

            ai, bi = max_sum_index

            if bi + 1 < N:
                max_sum = A[ai] + B[bi + 1]
                max_sum_index = (ai, bi + 1)
                heapq.heappush(potential_max_sum, (-max_sum, max_sum_index))

            K -= 1

        return ans
```

```py
# Class to find the maximum sum of combinations
import heapq
class findMaxSum:
    def __init__(self, A, B):
        # Sort the lists in reverse order
        self.A = sorted(A, reverse=True)
        self.B = sorted(B, reverse=True)
        self.sums, self.visited = list(), set()
        self.__add_element(0, 0)

    def __call__(self):
        # Pop the element with the maximum sum
        el_sum, indexes = heapq.heappop(self.sums)
        iA, iB = indexes
        # Add the next possible elements to the heap
        self.__add_element(iA, iB + 1)
        self.__add_element(iA + 1, iB)
        return -el_sum

    def __add_element(self, iA, iB):
        indexes = iA, iB
        # Check if the indexes are within range and not already visited
        if iA < len(self.A) and iB < len(self.B) and indexes not in self.visited:
            # Push the sum and indexes to the heap
            heapq.heappush(self.sums, (-self.A[iA] - self.B[iB], indexes))
            self.visited.add(indexes)

class Solution:
    # Function to find the maximum combinations with maximum sum
    def maxCombinations(self, N, K, A, B):
        # Create an instance of findMaxSum class
        retriver = findMaxSum(A, B)
        # Call the __call__ method to retrieve the maximum sums
        return [retriver() for _ in range(K)]
```

超时：

```py
from bisect import insort_right
class Solution:
    def maxCombinations(self, N, K, A, B):
        A.sort(reverse=True)
        B.sort(reverse=True)
        ans = []
        for a in A:
            for b in B:
                if len(ans) < K:
                    insort_right(ans, a+b)
                elif ans[0] < a+b:
                    ans.pop(0)
                    insort_right(ans, a+b)
                else:
                    break

        return ans[::-1]
```
