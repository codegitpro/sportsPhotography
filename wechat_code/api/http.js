const baseUrl = "http://localhost:8080/sportsPhotography"
//核心请求函数
const request = (options) => {
    return new Promise(function (resolve, reject) {
        let header = {
            'content-type': 'application/json'
        };
        const token = wx.getStorageSync('token')
        token ? header['Token'] = token : ''
        wx.request({
            url: baseUrl + options.url,
            method: options.method,
            data: options.method === 'POST' ? JSON.stringify(options.data) : options.data,
            header: header,
            success(res) {
                // 在需要获取当前页面路径的地方调用
                const pages = getCurrentPages();
                const currentPage = pages[pages.length - 1];
                const currentPath = currentPage?.route;
                // 微信小程序获取当前页面路径
                if (res.data.code == 401 && currentPath && !currentPath.includes('forget') && !currentPath.includes('register')  ) {
                    let token = wx.getStorageSync('token')
                    let msg = token ? '登录过期，请重新登录' : '请先登录'
                    if (token) {
                        wx.clearStorageSync()
                    }
                    return wx.reLaunch({
                        url: '/pages/login/login',
                        success: function (res) {
                            wx.showToast({
                                title: msg,
                                icon: 'error'
                            });
                            wx.setStorageSync('baseUrl', baseUrl)
                            // 跳转成功的回调函数
                        },
                        fail: function (res) {
                            // 跳转失败的回调函数
                        },
                        complete: function (res) {
                            // 无论跳转成功或失败都会执行的回调函数
                            wx.setStorageSync('baseUrl', baseUrl)
                        }
                    });
                }
                resolve(res.data)
            },
            fail: function (err) {
                // 请求失败
                reject(err)
                wx.showToast({
                    title: '网络繁忙，请稍后重试~',
                    icon: 'none'
                })
            },
            complete: function () {

            }
        })
    })
}

// 封装GET请求
const get = (url, options = {}) => {
    return request({
        url,
        method: 'GET',
        ...options
    })
}

// 封装POST请求
const post = (url, data = {}, options = {}) => {
    return request({
        url,
        method: 'POST',
        data,
        ...options
    })
}

// 导出模块
module.exports = {
    request,
    get,
    post,
}