## 🍕 manacher 算法 - 回文子串

【经典解法】： 添加虚字符串，比如 1234 变成 #1#2#3#4#，然后对每一位都往两边扩，比较回文。

【经典解法时间复杂度】： O(N^2)

核心信息：
- 每个位置的回文半径（或回文直径）数组。
- 一个变量 R ：之前所扩的所有位置中，所到达的最右侧的回文右边界。 这个变量只会变大，初始值为 -1
- 一个变量 C ：当你取得最远右边界 R 时，对应的中心点在哪里。 所以 R 和 C 是一起更新的。

玩一下：
- 情况 1 ，到达了最远右边界之外，此时只能以该点往两边 “暴力扩”。
- 情况 2 ，到达的点 i 属于右边界内部。则 i 一定是在 C 与 R 之间（原因是最远右边界 R 一定是前面对 C 点暴力扩时找出来的），所以此时的点一定有一个对称点 j
    - 如果 j 的回文半径在 C 的半径之内， 则 i 点的回文半径等于 j 。这个很好理解。
    - 如果 j 的回文半径在 C 的半径之外， 则 i 点的回文半径等于 i 到 R 的距离。 下面有证明
    - 如果 j 的回文半径刚好与 C 的左边界半径压线， 则 i 直接从 R 外面继续 “暴力扩”。 这算是一个小加速，因为中间部分不需要判断了，一定回文。

证明 “如果 j 的回文半径在 C 的半径之外， 则 i 点的回文半径等于 i 到 R 的距离。”
```
  L                                 R
  |                                 |
X |....j....Y      C      Z....i....|P
  |                                 |
首先， X 一定等于 Y ，因为它们根据 j 对称
其次， Y 一定等于 Z ，因为他们根据 C 对称
假设 i 的回文半径大于 i 到 R 距离，说明 Z 等于 P ，此时有 X 也等于 P ，这意味着 C 的半径可以更长。
所以假设不成立
```

时间复杂度是 O(N) ，很好理解，因为每次循环，如果 i 在 R 内部，时间复杂度是 O(1) ，如果 i 不在 R 内部，那么也会让 R 变大。
也就是不管什么情况，每次都会离 “终点” 更近，而且不会回退。 有点类似于 KMP ，但是比 KMP 容易分析很多。

```java
char[] manacherString(String str) {
    char[] charArr = str.toCharArray();
    char[] res = new char[str.length() * 2 + 1];
    int index = 0;
    for (int i = 0; i != res.length; i++) {
        res[i] = (i & 1) == 0? '#' : charArr[index++];
    }
    return res;
}
int maxLcpsLength(String s) {
    if (s == null || s.length() == 0) {
        return 0;
    }
    char[] str = manacherString(s);
    int[] pArr = new int[str.length];
    int C = -1;
    int R_next = -1; // 这个 R_next 是前面解释中 R 的下一个位置， 即 C 的半径范围是 [L...C...R_next-1] R 。 这里只是方便理解才写成 R_next，实际上写成 R 也是可以的。
    int max = Integer.MIN_VALUE;
    for (int i = 0; i != str.length; i++) {

        // 这句代码，囊括了很多种情况，得到的是可以直接从哪里开始“扩”
        int j = 2*C-i
        pArr[i] =
            R_next > i
                ? Math.min(pArr[j], R_next - i)  // i 在范围之内， R_next - i 就是 i 到 R 的半径距离。 pArr[j] 是 j 的半径距离。 这个包含了挺多
                                                    // 如果 j 半径在 C 之内， 则 pArr[j] 一定小于 R_next-i
                                                    // 如果 j 半径在 C 之外或刚好压到半径， 则 i 半径至少为 R_next-i
                : 1;    // i 在 R 范围之外，则只能保证 i 的回文半径一定大于等于 1

        while (i + pArr[i] < str.length && i - pArr[i] > -1) {
            // 直接从 R 之外开始继续判断是否回文 。
            if (str[i + pArr[i]] == str[i - pArr[i]]) {
                pArr[i]++;
            } else {
                // 如果 j 半径在 C 之内， 或者 j 半径在 C 之外，都会直接退出。 具体证明前面已经说明了。
                break;
            }
        }
        // 更新 C 和 R_next
        if (i + pArr[i] > R_next) {
            R_next = i + pArr[i];
            C = i;
        }
        max = Math.max(max, pArr(i));
    }
    // 最大的回文半径 - 1，就是原字符串的最大回文直径
    return max - 1;
}
```
