const moment = require("moment")
const {deleteData, update, add, page, list, detail, save, session, mlist, info, lists, query} = require("../../api/index.js")
const http = require("../../api/http.js")
const utils = require("../../utils/index.js")
Page({
    data: {
        title: '',
        user: {},
        centerType:false,
        auth:{  //权限
            front:{},
            back:{}
        },
        baseUrl: wx.getStorageSync('baseUrl') + '/',
        detailList: {},
        pictureList: "",
        goodname: "",
    },
    async onLoad(options) {
        this.setData({
            'detailList.id':options.id,
            centerType:!!options.centerType
        })
        this.getAuth()
        const user = wx.getStorageSync("userSession");
        this.setData({
            user,
        })
    },
    async onShow() {
        await this.getDetail()
    },
    getAuth(){
        let auth = {
            front:{
            },
            back:{
            }
        }
        this.setData({
            auth
        })
    },
    async getDetail() {
        const id = this.data.detailList.id
        if (id) {
            const {data} = await http.get(`/syslog/detail/${id}`)
            let objClo = {}
            objClo['detailList'] = data;
            this.setData(objClo)
            if (!wx.getStorageSync('token')) {
                return
            }
        }
        this.setData({
        });
    },
    //true|false切换
    toggle(e){
        const { key } = e.currentTarget.dataset
        this.setData({
            [`${key}`]:!this.data[key]
        })
    },
    //立即预订
    orderTap() {
        if (this.data.activeSeat.length <= 0) {
            wx.showToast({
                title: '请选择需要预订的位置',
                icon: 'none'
            })
            return
        }
        const activeSeat = this.data.activeSeat.join(',') + ',' + this.data.detailList.selected
        let data = {
            orderid: this.createOrderId(),
            tablename: 'syslog',
            userid: getApp().globalData.userInfo.id,
            goodid: this.data.detailList.id,
            buynumber: this.data.activeSeat.length,
            total: 0,
            discounttotal: 0,
            address: this.data.activeSeat,
            status: '已支付',
            discountprice: this.data.detailList.vipprice,
        }
        if (this.data.detailList?.price) {
            data['status'] = '未支付'
            data['price'] = this.data.detailList.price;
            data['total'] =wx.getStorageSync('vip') == '是'? 0 :
            parseFloat(this.data.detailList.price * this.data.activeSeat.length).toFixed(2)
            getApp().globalData.total = data.total;
            wx.showModal({
                title: '提示',
                content: '是否预订选中座位',
                complete: async (res) => {
                    if (res.confirm) {
                        wx.setStorageSync('orderGoods', [data])
                        wx.navigateTo({
                            url: "/pages/shop-order/orders-confirm?type=1&seat=1"
                        })
                    }
                }
            })
        }
    },
    chapterClick(e) {
        let item = e.currentTarget.dataset.item;
        let user = this.data.user;
        if (!getApp().globalData.userInfo.id) {
            wx.showToast({
                title: '请先登录',
                icon: "none"
            })
            setTimeout(() => {
                wx.navigateTo({
                    url: `/pages/login/login`,
                })
            }, 1500)
            return
        }
        if(!item && this.data.freeChapterList.length){
            item = this.data.freeChapterList[0]
        }else{
            wx.showToast({
                title: '暂无免费章节',
                icon: "none"
            })
        }
        wx.navigateTo({
            url: `/pages/manhuaxinxi/chapter?id=${item.id}&refid=` + item.refid
        })
    },
    authTap() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                title: '请先登陆',
                icon: 'none'
            })
            return
        }
    },
    onUnload: function () {
        getApp().globalData.detailList = {}
    },
    async listUpdate(name) {
        const predetailList = this.data.predetailList
        const detailList = this.data.detailList
        predetailList.shangpintupian = this.data.pictureList[0]
        if (name == "thumbsupNumber") {
            // 点赞
            predetailList.thumbsupNumber = predetailList.thumbsupNumber + 1
            detailList.thumbsupNumber = detailList.thumbsupNumber + 1
        }
        if (name == "cancelthumb") {
            // 取消点赞
            predetailList.thumbsupNumber = predetailList.thumbsupNumber - 1
            detailList.thumbsupNumber = detailList.thumbsupNumber - 1
        }
        if (name == "crazilyNumber") {
            predetailList.crazilyNumber = predetailList.crazilyNumber + 1
            detailList.crazilyNumber = detailList.crazilyNumber + 1
        }
        if (name == "cancelCrazily") {
            predetailList.crazilyNumber = predetailList?.crazilyNumber - 1
            detailList.crazilyNumber = detailList.crazilyNumber - 1
        }
        if (name == 'cancelislike') {
            predetailList.storeupNumber = predetailList.storeupNumber - 1
            detailList.storeupNumber = detailList.storeupNumber - 1
        }
        if (name == "islike") {
            predetailList.storeupNumber = predetailList.storeupNumber + 1
            detailList.storeupNumber = detailList.storeupNumber + 1
        }
        this.setData({
            detailList
        })
        const resUpdate = await update('syslog', predetailList)
        if (resUpdate.code == 0) {
            this.setData({
                predetailList,
                "detailList.crazilyNumber": predetailList.crazilyNumber
            })
        }
    },
    previewImgTap(e) {
        var currentUrl = e.currentTarget.dataset.currenturl
        const list = this.data.pictureList.map(v => {
            return  v
        })
        wx.previewImage({
            urls: list, // 需要预览的图片链接列表
            current: currentUrl // 设置当前预览的图片
        });
    },
    onPayTap() {
        if (!wx.getStorageSync('token')) {
            wx.showToast({
                title: '请先登录',
                icon: "none"
            })
            setTimeout(() => {
                wx.navigateTo({
                    url: `/pages/login/login`
                })
            }, 1000)
            return
        }
        const baseUrl = wx.getStorageSync('baseUrl')
        let data = this.data.detailList
        data['buynumber'] = 1
        wx.setStorageSync('payObject', data);
        wx.setStorageSync('paytable', 'syslog');
        wx.navigateTo({
            url: "/pages/pay-confirm/pay-confirm?funName=paySave"
        })
    },
    async paySave(payForm){
        payForm.ispay = "已支付";
        http.post(`/syslog/update`,payForm).then(res=>{
            if(res.code==0){
                wx.showToast({
                    title: '支付成功',
                    icon: 'none'
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },1000)
            }
        })
    },
    // 下载
    download(e) {
        let url = e.currentTarget.dataset.src
        url = wx.getStorageSync('baseUrl') + '/' + url;
        wx.downloadFile({
            url: url,
            success: (res) => {
                if (res.statusCode === 200) {
                    wx.showToast({
                        title: '下载成功',
                        icon: "none"
                    })
                    const filePath = res.tempFilePath
                    wx.openDocument({   //仅支持文档ppt等办公文件格式
                        filePath: filePath,
                        showMenu: true,
                        complete:(e)=>{
                            console.log(e);
                        }
                    })
                }
            }
        });
    },
})