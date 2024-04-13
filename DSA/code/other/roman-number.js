/**
 * @param {number} num
 * @return {string}
 */
function intToRoman (num) {
    const VALUE_SYMBOLS = [
            [1000,'M',],
            [900, 'CM',],
            [500, 'D',],
            [400, 'CD',],

            [100, 'C',],
            [90,  'XC',],
            [50,  'L',],
            [40,  'XL',],

            [10,  'X',],
            [9,   'IX',],
            [5,   'V',],
            [4,   'IV',],

            [1,   'I',],
    ]

    let roman = ''
    for (const [value, symbol] of VALUE_SYMBOLS) {
        while (num >= value) {
            num -= value
            roman += symbol
        }
        if (num === 0) {
            break
        }
    }
    return roman
}

/**
 * @param {string} s
 * @return {number}
 */
function romanToInt (s) {
    const sLen = s.length
    let ans = 0
    const mapping = (char) => {
        switch (char){
            case 'I': return 1
            case 'V': return 5

            case 'X': return 10
            case 'L': return 50

            case 'C': return 100
            case 'D': return 500

            case 'M': return 1000
        }
    }
    const getSpecial = (i) => {
        if (i == sLen-1) {
            return false
        }
        const a = s[i]
        const b = s[i+1]
        switch (a) {
            case 'I':
                if (b == 'V') return 4
                if (b == 'X') return 9
                break
            case 'X':
                if (b == 'L') return 40
                if (b == 'C') return 90
                break
            case 'C':
                if (b == 'D') return 400
                if (b == 'M') return 900
                break
        }
        return false
    }

    for (let i = 0; i < sLen; i++) {
        const special = getSpecial(i)
        if (special) {
            ans += special
            i++
        } else {
            ans += mapping(s[i])
        }
    }
    return ans
}

for (let i = 1; i < 3999; i++) {
    const roman = intToRoman(i)
    const int = romanToInt(roman)
    if (int !== i) {
        console.log('❌')
        return
    }
}
