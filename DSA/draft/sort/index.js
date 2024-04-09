function getN1or1() {
    if (Math.random() > 0.5) {
        return 1
    }
    return -1
}
function main(userFn) {
    // 生成随机数据
    const length = Math.floor(Math.random() * 100)
    const testData = []
    for (let i = 0; i < length; i++) {
        testData.push(
            getN1or1() * Math.floor(Math.random() * 100)
        )
    }
    const rightResult = [...testData].sort((a, b) => a - b)
    const testResult = userFn(testData)
    if (rightResult.join(',') === testResult.join(',')) {
        console.log('✅')
    } else {
        console.log('❌')
    }
}

const bubble = require('./bubble')
const select = require('./select')
const insert = require('./insert')
main(bubble)
main(select)
main(insert)
