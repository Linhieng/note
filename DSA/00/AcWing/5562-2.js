/**
 * @param {number} n 所需要的原件类型数量
 * @param {number} k 拥有的原材料
 * @param {number[]} A 产生一件时所需要的每类原件数量
 * @param {number[]} B 剩余的每个原件数量
 * @returns 使用剩余原件和原材料所能生产的最大件数
 */
function resolve(n, k, A, B) {

    /** 判断能否生产 num 个产品 */
    const check = (num) => {
        let res = 0
        for (let i = 0; i < n; i++) {
            /** 所需要的第 i 个原件的数量 */
            let need = num * A[i]
            if (need > B[i]) {
                res += need - B[i]

                // 提供的原材料无法满足所需要的原件，则直接返回 false
                // 注意这里要提前判断，不然会超时
                if (res > k) {
                    return false
                }
            }
        }

        return true
    }

    let left = 0
    let right = 2e9
    // 对结果进行二分
    while (left < right) {
        let mid = right + left + 1 >>> 1 // 这里要加 1
        if (check(mid)) {
            left = mid
        } else {
            right = mid - 1
        }
    }

    return right

}


let buf = ''

process.stdin.on('readable', function () {
    let chunk = process.stdin.read()
    if (chunk) buf += chunk.toString()
})

process.stdin.on('end', function () {
    const inputs = []
    buf.split('\n').forEach(function (line) {
        inputs.push(line.split(' ').map(v => Number(v)))
    })
    console.log(resolve(inputs[0][0], inputs[0][1], inputs[1], inputs[2]))

})
