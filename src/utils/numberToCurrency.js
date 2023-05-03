export function numberToCurrencyNo(value) {
  if (!value) return 0
  // 获取整数部分
  const intPart = Math.trunc(value)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  // let floatPart = ''
  // 将数值截取为小数部分和整数部分
  // const valueArray = value.toString().split('.')
  // if (valueArray.length === 2) { // 有小数部分
  //   floatPart = valueArray[1].toString().substr(0,2) // 取得小数部分
  //   let str=intPartFormat + '.' + floatPart
    
  //   if (floatPart=='00') {
  //     str=intPartFormat
  //   }
  //   return str
  // }
  // return intPartFormat + floatPart
  return intPartFormat
}

export const formatTenThousandNumber= (num, unit1='万', unit2='元') => {
	let res = '-'
	
	if (num || num == 0) {
		if (num < 10000) {
			res = num + unit2
		} else {
			if (num % 10000 === 0) {
				res = num / 10000 + unit1
			} else {
				if (num % 1000 === 0) {
					res = (num/10000).toFixed(1) + unit1
				} else {
					res = (num/10000).toFixed(2) + unit1
				}
			}
		}
	}
	
	return res
}

/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
export const toChinesNum = (num) => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = (temp) => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    let newArr = []
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
    })
    let numArr = []
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n)
    })
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m
          }
        } else {
          newNum += m
        }
      })
    } else {
      newNum = newArr[0]
    }

    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}