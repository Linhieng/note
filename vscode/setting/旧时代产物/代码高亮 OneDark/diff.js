/**
 * 经过测试, darker 和 mix 的颜色部分是一模一样的
 */

const fs = require('fs')
const { join } = require('path')

let bufD = fs.readFileSync(j('OneDark-Pro-darker.jsonc'), {encoding: 'utf-8'})
let bufF = fs.readFileSync(j('OneDark-Pro-flat.jsonc'), {encoding: 'utf-8'})
let bufM = fs.readFileSync(j('OneDark-Pro-mix.jsonc'), {encoding: 'utf-8'})
let buf_ = fs.readFileSync(j('OneDark-Pro.jsonc'), {encoding: 'utf-8'})

bufD = bufD.substring(bufD.indexOf('{')).replace(' ', '')
bufF = bufF.substring(bufF.indexOf('{')).replace(' ', '')
bufM = bufM.substring(bufM.indexOf('{')).replace(' ', '')
buf_ = buf_.substring(buf_.indexOf('{')).replace(' ', '')

function diff() {
  let diffD_ = 0
  let diffF_ = 0

  let diffDM = 0
  for (let i = 0; i < buf_.length; i++) {
    if (buf_[i] !== bufD[i]) diffD_++
    if (buf_[i] !== bufF[i]) diffF_++
    if (bufD[i] !== bufM[i]) diffDM++
  }
  console.log(diffD_)
  console.log(diffF_)

  console.log(diffDM)
}

function j(file_name) {
  return join(__dirname, file_name)
}

diff()