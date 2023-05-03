export function getImageInfo(src, ratio = 0.75) {
	return new Promise((resolve) => {
        const image = new Image()
        image.src = src
        image.onload = function() {
            let res = src
            if (image.height > image.width) {
                const w = image.width
                const h = Math.floor(image.width * ratio)
                const x = 0
                const y = Math.floor((image.height - h) / 2)
                res = `${src}?x-oss-process=image/crop,x_${x},y_${y},w_${w},h_${h}`
            }
            console.log('getImageInfo', res)
            resolve(res)
        }
	})
}

// 源字符串，要高亮的片段
export const heightLight = (str, key) => {
    const reg = new RegExp(key, 'ig')
    return str.replace(reg, (val) => {
      return `<span style="color:red">${val}</span>`
    })
}

/**
 * 千分位格式化
 * @param n number
 */
 export function formatThousandNumber(n) {
    n = Math.floor(n) // 只考虑整数
 
    const s = n.toString()
    const arr = s.split('').reverse()
    return arr.reduce((prev, val, index) => {
        if (index % 3 === 0) {
            if (prev) {
                return val + ',' + prev
            } else {
                return val
            }
        } else {
            return val + prev
        }
    }, '')
}

// 验证手机号码
export function validPhoneNum(num) {
	return /^1[3|4|5|7|8|9]\d{9}$/.test(num)
}
