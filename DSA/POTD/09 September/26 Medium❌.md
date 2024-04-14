# [230926 Find All Four Sum Numbers](https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1)

【题意】：找出任意四个元素之和等于给定数字

【Excepted】：

- Time Complexity: O(N3).
- Auxiliary Space: O(N2).

## Solution

```py
# arr[] : int input array of integers
# k : the quadruple sum required
class Solution:
    def fourSum(self, arr, k):
        n = len(arr)
        arr.sort()
        ans = []

        for i in range(n - 3):

            # removing duplicates
            if i > 0 and arr[i] == arr[i-1]:
                continue

            for j in range(i + 1, n - 2):

                # removing duplicates
                if j > i + 1 and arr[j] == arr[j-1]:
                    continue

                left, right = j + 1, n - 1

                while left < right:
                    current_sum = arr[i] + arr[j] + arr[left] + arr[right]

                    if current_sum == k:
                        ans.append( [arr[i], arr[j], arr[left], arr[right]] )

                        # removing duplicates
                        while left < right and arr[left] == arr[left + 1]:
                            left += 1
                        left += 1

                        # removing duplicates
                        while left < right and arr[right] == arr[right - 1]:
                            right -= 1
                        right -= 1

                    elif current_sum < k:
                        left += 1
                    else:
                        right -= 1

        return ans
```
