function addImgWidthStyle(html, width) {
    // 使用正则表达式来查找并替换<img>标签的style属性
    return html.replace(/<img([^>]*?)>/gi, (match, p1) => {
        // 提取style属性（如果存在）
        let styleAttr = p1.match(/style="([^"]*)"/);
        let existingStyle = styleAttr ? styleAttr[1] : '';
        // 构造新的style字符串，确保添加width样式
        let newStyle = `${existingStyle ? existingStyle + '; ' : ''}width: ${width};`;
        // 如果原始标签中没有style属性，则直接添加style="width: ..."
        // 否则，替换现有的style属性
        if (!styleAttr) {
            return match.replace(/>$/, ` style="${newStyle}">`);
        } else {
            return match.replace(styleAttr[0], `style="${newStyle}"`);
        }
    });
}
function extractPath(fullUrl) {
    const baseUrl = wx.getStorageSync('baseUrl') + '/'
    console.log('fullUrl', fullUrl);
    // 添加参数校验
    if (!fullUrl || !baseUrl) {
        console.error('参数错误:', {
            fullUrl,
            baseUrl
        });
        return ''; // 或 throw new Error('参数不能为空')
    }
    // 转义特殊字符
    const escaped = baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // 添加正则匹配校验
    const regex = new RegExp(`^${escaped}`);
    if (!regex.test(fullUrl)) {
        console.warn('URL格式不匹配:', fullUrl);
        return fullUrl; // 返回原始值或处理异常
    }
    return fullUrl.replace(regex, '');
}
function getCurrentDate(name) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份补零
    const day = String(now.getDate()).padStart(2, '0'); // 日期补零
    const hours = String(now.getHours()).padStart(2, '0'); // 小时补零
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟补零
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 秒钟补零
    if (name === "yMDhms") {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}
// num 获取上一级页2 当前页面1
function getCurrentPageUrl(num) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - num];
    const currentPageUrl = `/${currentPage?.route}`;
    return currentPageUrl;
}
var countdownTimer; // 定义定时器变量
// 公共方法：倒计时年月日
// 公共方法：倒计时年月日
function countdown(endTime, callback, clearCountdownTimer, timeType, minutesToAdd) {
    var countDownDate = new Date(endTime).getTime();
    // 将分钟转换成毫秒
    minutesToAdd = minutesToAdd * 60 * 1000
    var future = new Date();
    future.setTime(future.getTime() + minutesToAdd); // 添加minutesToAdd分钟
    if (clearCountdownTimer) {
        // 清楚定时器
        clearInterval(countdownTimer);
    } else {
        if (timeType == "hms") {
            // 小时分钟秒倒计时
            countdownTimer = setInterval(function () {
                var currentTime = new Date().getTime(); // 获取当前时间
                var distance = future.getTime() - currentTime; // 计算时间差
                // 倒计时结束
                if (distance <= 0) {
                    clearInterval(countdownTimer); // 清除定时器
                    callback("已结束");
                    return;
                }
                // 计算剩余的小时、分钟和秒
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // 构造倒计时文本
                var countdownText = hours + "小时 " + minutes + "分钟 " + seconds + "秒";
                callback(countdownText); // 更新文本
            }, 1000);
        } else {
            // 年月日小时分钟秒倒计时
            countdownTimer = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                // 倒计时结束
                if (distance <= 0) {
                    clearInterval(countdownTimer); // 清除定时器
                    callback("倒计时结束");
                    return;
                }
                // 计算剩余的天、小时、分钟和秒
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // 构造倒计时文本
                var countdownText = days == 0 ? hours + "小时 " + minutes + "分钟 " + seconds + "秒" : days + "天" + hours + "小时 " + minutes + "分钟 " + seconds + "秒";
                callback(countdownText); // 更新文本
            }, 1000);
        }
    }
}
// 是否有权限(前台权限)
export function isAuthFront(tableName, key) {
    const role = wx.getStorageSync("role");
    let menus = getApp().globalData.menusData;
    if (menus.length == 0) {
        const menujson = wx.getStorageSync('menujson')
        if (menujson) {
            menus = JSON.parse(menujson)
        }
    }
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].roleName == role) {
            for (let j = 0; j < menus[i].frontMenu.length; j++) {
                for (let k = 0; k < menus[i].frontMenu[j].child.length; k++) {
                    if (tableName == menus[i].frontMenu[j].child[k].tableName) {
                        let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
                        return buttons.split(',').indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}
// 是否有权限(后台权限)
export function isAuth(tableName, key) {
    const role = wx.getStorageSync("role");
    let menus = getApp().globalData.menusData;
    if (menus.length == 0) {
        const menujson = wx.getStorageSync('menujson')
        if (menujson) {
            menus = JSON.parse(menujson)
        }
    }
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].roleName == role) {
            for (let j = 0; j < menus[i].backMenu.length; j++) {
                for (let k = 0; k < menus[i].backMenu[j].child.length; k++) {
                    if (tableName == menus[i].backMenu[j].child[k].tableName) {
                        let buttons = menus[i].backMenu[j].child[k].buttons.join(',');
                        return buttons.split(',').indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}
// 指定的页面跳转并且重新加载
export function pageJump(path) {
    wx.navigateTo({
        url: `${path}`,
        complete: () => {
            // 触发事件通知，传递需要更新的数据
            const pages = getCurrentPages();
            if (pages.length >= 1) {
                const prePage = pages[pages.length - 1];
                prePage.onLoad(); //
            }
        }
    })
}
// 手机号码或邮箱校验
export function validata(name, str) {
    name.replace(/\s/g, '');
    if (name == 'email') {
        // 邮箱校验
        const regex = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9]+\.(com|cn|net|org)$/;
        return regex.test(str);
    } else {
        // 使用正则表达式匹配手机号码格式
        //  湖南那些电话号码为false 如16680451907匹配不了
        // 全中国的11位号码匹配
        const regex = /^1\d{10}$/;
        return regex.test(str);
    }
}
// 身份证校验
export function validateIDCard(id) {
    // 正则表达式匹配身份证号码
    // 格式：6位地区码 + 8位生日 + 3位顺序码 + 1位校验码
    var pattern = /^[1-9]\d{5}(19|20)\d{2}(0\d|1[012])(0\d|1\d|2\d|3[01])\d{3}[\dXx]$/;
    // 如果身份证号码不符合格式要求，返回错误
    if (!pattern.test(id)) {
        return false;
    }
    // 加权因子
    var weightedFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码对应关系
    var checkCodes = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    // 计算校验码
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        sum += parseInt(id.charAt(i)) * weightedFactors[i];
    }
    var checkCodeIndex = sum % 11;
    // 检查校验码是否正确
    if (id.charAt(17).toUpperCase() !== checkCodes[checkCodeIndex].toString()) {
        return false;
    }
    return true;
}
export function genTradeNo() {
    var date = new Date();
    var tradeNo = date.getFullYear().toString() + (date.getMonth() + 1).toString() +
        date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() +
        date.getSeconds().toString() + date.getMilliseconds().toString();
    for (var i = 0; i < 5; i++) //5位随机数，用以加在时间戳后面。
    {
        tradeNo += Math.floor(Math.random() * 10);
    }
    return tradeNo;
}
// 电话校验
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
//校验
const validator = {
    //邮箱
    isEmail: (s) => {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    },
    //手机号码
    isMobile: (s) => {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]|17[01345678]|18[0-9]|14[579]|19[0-35-9])[0-9]{8}$/.test(s)
    },
    //电话号码
    isPhone: (s) => {
        return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
    },
    //URL地址
    isUrl: (s) => {
        return /^http[s]?:\/\/.*/.test(s)
    },
    //匹配数字，可以是小数，不可以是负数,可以为空
    isNumber: (s) => {
        return /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
    },
    //匹配整数，可以为空
    isIntNumber: (s) => {
        return /(^-?\d+$)|(^$)/.test(s);
    },
    //身份证校验
    isIdCard: (idcard) => {
        const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdCard.test(idcard)) {
            return false;
        } else {
            return true;
        }
    },
    //中文校验
    isChinese: (value) => {
        let reg = /^[\u4e00-\u9fa5]+$/;
        if (!reg.test(value)) {
            return false;
        } else {
            return true;
        }
    },
    //英文校验
    isEnglish: (value) => {
        let reg = /^[A-Za-z]+$/;
        if (!reg.test(value)) {
            return false;
        } else {
            return true;
        }
    },
    //同时包含中英文校验
    isEnglishNumber: (value) => {
        let reg = /^[A-Za-z0-9]+$/;
        let reg2 = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
        if (!reg.test(value) || !reg2.test(value)) {
            return false;
        } else {
            return true;
        }
    },
}
//获取唯一id
function getUUID() {
    return new Date().getTime();
}
module.exports = {
    getCurrentDate: getCurrentDate,
    getCurrentPageUrl: getCurrentPageUrl,
    countdown: countdown,
    isAuth: isAuth,
    isAuthFront: isAuthFront,
    pageJump: pageJump,
    validata: validata,
    validateIDCard: validateIDCard,
    genTradeNo: genTradeNo,
    addImgWidthStyle,
    isPhone,
    extractPath,
    validator,
    getUUID,
}