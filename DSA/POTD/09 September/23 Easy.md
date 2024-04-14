# [230923 Equilibrium Point](https://practice.geeksforgeeks.org/problems/equilibrium-point-1587115620/1)

【题意】：找到数组中的平衡点

【Excepted】

- Time Complexity: O(n)
- Auxiliary Space: O(1)

## Solution

【官方题解的方式确实更容易理解】

```py
# Back-end complete function Template for Python 3
class Solution:

    #Function to find equilibrium point in the array.
    def equilibriumPoint(self,A, N):

        #We store the sum of all array elements.
        sum = 0
        for i in range(0, N):
            sum += A[i]

        #sum2 is used to store prefix sum.
        sum2 = 0

        for i in range(0, N, +1):

            #Leaving out the value of current element from suffix sum.
            sum -= A[i]

            #Checking if suffix and prefix sums are same.
            if sum2 == sum:
                #returning the index or equilibrium point.
                return (i + 1)

            #Adding the value of current element to prefix sum.
            sum2 += A[i]

        return -1
```

【我是采用双指针，代码稍显冗余，用到的变量也比较多】

```py
class Solution:
    def equilibriumPoint(self,A, N):
        leftSum, rightSum = 0, 0
        left, right = 0, N - 1
        l, r = True, True
        while left < right:

            if l:
                leftSum += A[left]
            if r:
                rightSum += A[right]

            l = False
            r = False

            if leftSum > rightSum:
                right -= 1
                r = True
            elif leftSum < rightSum:
                left += 1
                l = True
            else:
                left += 1
                right -= 1
                l = r = True
        if left == right and leftSum == rightSum:
            return left + 1
        return -1
```
