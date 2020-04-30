//判断是否是生产环境
var isPro = process.env.NODE_ENV === 'production' //process.env.NODE_ENV用于区分是生产环境还是开发环境
//根据环境不同导出不同的baseURL
module.exports = {
    // baseURL: isPro ? 'http://192.168.5.248:5000' : ''
    baseURL: isPro ? 'http://119.3.216.122:5000' : ''
}