const http = require("./api/http.js")
let remindTimer = null;
const utils = require("./utils/index")
const {list, page, add} = require("./api/index")
App({
    globalData: {
        name: null,
        goodsList: [],
        detailList: {},
        detailId: null,
        tabarList: [],
        userInfo: {},
        total: "",
        editorContent: '',
        menusData: []
    },
    onShow() {
        this.getMenuData()
    },
    onLaunch() {
        const tabarList = []
        const genPages = []
        tabarList.push("sheyingzuopin")
        tabarList.push("kaojisheying")
        tabarList.push("cart")
        this.globalData.tabarList = tabarList;
        if(wx.getStorageSync('token')){
            this.globalData.userInfo = wx.getStorageSync('userSession') || {}
            this.getUserInfo()
        }
        this.getMenuData()
    },
    async getMenuData() {
        const menusRes = await http.get('/menu/list',{data:{page: 1, limit: 1, sort: 'id'}})
        // 基础数据校验
        if (menusRes.code !== 0) throw new Error(`API错误: ${menusRes.code}`);
        if (!menusRes.data?.list?.length) throw new Error('无菜单数据');

        const rawData = menusRes.data.list[0].menujson;
        getApp().globalData.menusData = JSON.parse(rawData) || [];
        wx.setStorageSync('menujson', rawData)
    },
    menuTap(tableName) {
        let path = `/pages/${tableName}/list`
        if(tableName=='cart'){
            path = `/pages/shop-cart/shop-cart`
        }
        if(tableName=='orders'){
            path = `/pages/shop-orders/orders-list`
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.switchTab({
                    url: path
                })
            }
        })
    },
    // 数据监听
    setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
        Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
            this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
        })
    },
    /**
     * 监听属性 并执行监听函数
     */
    observe(obj, key, watchFun) {
        var val = obj[key]; // 给该属性设默认值
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            set: function (value) {
                val = value;
                watchFun(value, val); // 赋值(set)时，调用对应函数
            },
            get: function () {
                return val;
            }
        })
    },
    async getUserInfo(){
        let res = await http.get(`/${wx.getStorageSync('nowTable')}/session`)
        if(res.code==0){
            this.globalData.userInfo = res.data
            wx.setStorageSync("userSession", res.data)
            return res
        }
    },
})