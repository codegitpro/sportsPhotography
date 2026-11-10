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
        buyNumber: 1,
        isInCart: false,
        cartForm: {
            userid: getApp().globalData.userInfo.id||'',
        },
        islike: false,
        commentList: [],
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
            const {data} = await http.get(`/zhoubianshangcheng/detail/${id}`)
            data["price"] = data.price
            const predetailList = Object.assign({}, data)
            this.setData({
                predetailList
            })
            let objClo = {}
            objClo['pictureList'] = data.tupian ?.split(',').map(item=>{
                return  item.indexOf('http') !== -1?item: item = item?.split(",")[0].replace('upload','flie');
            });
            if(data.shangpinxiangqing){
                data.shangpinxiangqing = utils.addImgWidthStyle(data.shangpinxiangqing, '100%')
            }
            objClo['detailList'] = data;
            this.setData(objClo)
            if (!wx.getStorageSync('token')) {
                return
            }
            this.getInCartList();
            await this.searchList("isStoreup")
        }
        this.getCommentList()
        this.setData({
            title: this.data.detailList.shangpinmingcheng,
        });
    },
    commentZanCaiClick(e){
        let item = e.currentTarget.dataset.item
        let type = e.currentTarget.dataset.type
        if(!getApp().globalData.userInfo.id){
            wx.showToast({
                title: '请先登录',
                icon: "none"
            })
            return
        }
        if(type==1){    //赞
            if(item.tuserids){
                let arr = item.tuserids.split(',')
                let index = arr.indexOf(`${getApp().globalData.userInfo.id}`)
                if(index!=-1){
                    arr.splice(index,1)
                    item.thumbsupnum--
                }else{
                    arr.push(`${getApp().globalData.userInfo.id}`)
                    item.thumbsupnum++
                }
                item.tuserids = arr.join(',')
            }else {
                item.tuserids = `${getApp().globalData.userInfo.id}`
                item.thumbsupnum++
            }
            if(item.cuserids){
                let arr = item.cuserids.split(',')
                let index = arr.indexOf(`${getApp().globalData.userInfo.id}`)
                if(index!=-1){  //点赞需要取消踩
                    arr.splice(index,1)
                    item.crazilynum--
                }
                item.cuserids = arr.join(',')
            }
        }else{  //踩
            if(item.cuserids){
                let arr = item.cuserids.split(',')
                let index = arr.indexOf(`${getApp().globalData.userInfo.id}`)
                console.log(arr,getApp().globalData.userInfo.id)
                if(index!=-1){
                    arr.splice(index,1)
                    item.crazilynum--
                }else{
                    arr.push(`${getApp().globalData.userInfo.id}`)
                    item.crazilynum++
                }
                item.cuserids = arr.join(',')
            }else {
                item.cuserids = `${getApp().globalData.userInfo.id}`
                item.crazilynum++
            }
            if(item.tuserids){
                let arr = item.tuserids.split(',')
                let index = arr.indexOf(`${getApp().globalData.userInfo.id}`)
                if(index!=-1){  //点踩需要取消赞
                    arr.splice(index,1)
                    item.thumbsupnum--
                }
                item.tuserids = arr.join(',')
            }
        }
        http.post(`/discusszhoubianshangcheng/update`,item).then(res=>{
            this.getCommentList()
        })
    },
    getCommentList(){
		http.get(`/discusszhoubianshangcheng/list`,{
            data:{
                page: 1,
                limit: 999,
                refid: this.data.detailList.id,
                sort: 'istop',
                order: 'desc',
            }
        }).then(res => {
            this.setData({
                commentList:res.data.list.map(item=>{
                    if(!getApp().globalData.userInfo.id){
                        item.hasZan = false
                        item.hasCai = false
                    }else{
                        if(!item.tuserids){
                            item.hasZan = false
                        }else{
                            item.hasZan = item.tuserids.split(',').includes(getApp().globalData.userInfo.id+'')
                        }
                        if(!item.cuserids){
                            item.hasCai = false
                        }else{
                            item.hasCai = item.cuserids.split(',').includes(getApp().globalData.userInfo.id+'')
                        }
                    }
                    return item
                })
            })
		})
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
            tablename: 'zhoubianshangcheng',
            userid: getApp().globalData.userInfo.id,
            goodid: this.data.detailList.id,
            goodname: this.data.detailList.shangpinmingcheng,
            buynumber: this.data.activeSeat.length,
            total: 0,
            discounttotal: 0,
            address: this.data.activeSeat,
            status: '已支付',
            discountprice: this.data.detailList.vipprice,
             picture: this.data.pictureList[0],
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
    isShelvesClick(){
        wx.showModal({
            title: '提示',
            content: `是否${this.data.detailList.isShelves==1?'下架':'上架'}？`,
            success: async (res)=>{
                this.data.detailList.isShelves = (this.data.detailList.isShelves==1?0:1)
                http.post('/${pathname}/update',this.data.detailList).then(rs=>{
                    this.setData({
                        detailList:this.data.detailList
                    })
                    wx.showToast({
                        title: '操作成功',
                    })
                })
            }
        })
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
    async addCommentap() {
        if (!wx.getStorageSync('token')) {
            return
        }
        let params = {
            page: 1,
            limit: 1,
            status: '已完成',
            goodid: this.data.detailList.id,
            userid: getApp().globalData.userInfo.id
        }
        let res = await http.get(`/orders/list`,{
            data:params
        })
        if (res.data.list.length == 0) {
            wx.showToast({
                title: '请完成订单后再评论',
                icon: "none"
            })
            return;
        }
        wx.setStorageSync('tableName', "zhoubianshangcheng")
        wx.navigateTo({
            url: `/pages/discusszhoubianshangcheng/update-and-add?refid=${this.data.detailList.id}`,
        })
    },
    async listAdd(anyType) {
        const data = {
            name: this.data.detailList.shangpinmingcheng,
            picture: this.data.detailList.tupian,
            tablename: `zhoubianshangcheng`,
            refid: this.data.detailList.id,
            userid:getApp().globalData.userInfo.id,
            // type 收藏是1 关注是41
            type: anyType
        }
        await add("storeup", data)
    },
    async searchList(name) {
        const searchData = {
            page: 1,
            limit: 1,
            refid: this.data.detailList.id,
            tablename: "zhoubianshangcheng",
            userid:getApp().globalData.userInfo.id,
            type: 1
        }
        if (name == "isStoreup") {
            const storeupRes = getApp().globalData.userInfo.id ? await http.get(`/storeup/list`,{
                data:searchData
            }) : ''
            if (storeupRes?.data?.list?.length > 0) {
                // 收藏
                this.setData({
                    islike: true
                })
                const id = [storeupRes?.data?.list[0]?.id]
                return id
            } else {
                this.setData({
                    islike: false
                })
            }
        }
    },
    likeTap() {
        if (!wx.getStorageSync('token')) {
            return
        }
        wx.showModal({
            title: '提示',
            content: "是" == '是' ? '是否收藏' : "是否是",
            complete: async (res) => {
                if (res.confirm) {
                    // 添加收藏
                    await this.listAdd(1)
                    await this.listUpdate('islike')
                    await this.searchList("isStoreup")
                }
            }
        })
    },
    cancelLikeTap() {
        if (!wx.getStorageSync('token')) {
            return
        }
        wx.showModal({
            title: '提示',
                content: "是" == '是' ? '是否取消收藏' : "是否取消是",
            complete: async (res) => {
                if (res.cancel) {
                }
                if (res.confirm) {
                    const id = await this.searchList("isStoreup")
                    // 删除收藏
                    await deleteData('storeup', id)
                    await this.listUpdate('cancelislike')
                    this.searchList("isStoreup")
                }
            }
        })
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
        const resUpdate = await update('zhoubianshangcheng', predetailList)
        if (resUpdate.code == 0) {
            this.setData({
                predetailList,
                "detailList.crazilyNumber": predetailList.crazilyNumber
            })
        }
    },
    async getInCartList() {
        const params = {
            userid: getApp().globalData.userInfo.id,
            tablename: 'zhoubianshangcheng',
            goodid: this.data.detailList.id
        }
        const res = await http.get(`/cart/list`,{
            data:params
        })
        if (res?.data?.list?.length) {
            this.setData({
                isInCart: true
            })
        } else {
            this.setData({
                isInCart: false
            })
        }
    },
    async addCart() {
        if (!wx.getStorageSync('token')) {
            return
        }
        //单次购买限制
        if (this.data.detailList.onelimittimes > 0 && this.data.detailList.onelimittimes < this.data.buyNumber) {
            wx.showToast({
                title: `每人只能购买${this.data.detailList.onelimittimes}件商品`,
                icon: "none"
            })
            return
        }
        //库存不足
        if (this.data.detailList.alllimittimes <= 0) {
            wx.showToast({
                title: '商品售罄',
                icon: "none"
            })
            return
        }
        //库存限制
        if (this.data.detailList.alllimittimes > 0 && this.data.detailList.alllimittimes < this.data.buyNumber) {
            wx.showToast({
                title: '库存不足',
                icon: "none"
            })
            return
        }
        if (this.data.isInCart) {
            wx.showToast({
                title: '该商品已在购物车，请前往购买',
                icon: "none"
            })
            return
        }
        const baseUrl = wx.getStorageSync('baseUrl') + "/"
        this.setData({
            'cartForm.buynumber': this.data.buyNumber,
            'cartForm.goodid': this.data.detailList.id,
            'cartForm.goodname': this.data.detailList.shangpinmingcheng,
            'cartForm.tablename': "zhoubianshangcheng",
            'cartForm.picture': this.data.pictureList[0],
            picture: this.data.pictureList[0],
        })
        let cartForm = this.data.cartForm;
        this.setData({
            'cartForm.price': this.data.detailList?.price
        })
        cartForm['userid'] = getApp().globalData.userInfo.id;
        const res = await add('cart', cartForm)
        let detailList = this.data.detailList;
        if (res.code == 0) {
            wx.showToast({
                title: '添加成功',
                icon: "none"
            })
            setTimeout(()=>{
                this.getInCartList()
                this.onLoad(detailList.id)
                return
            }, 3000)
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
        data["tupian"] = data.tupian
        data['buynumber'] = 1
        wx.setStorageSync('payObject', data);
        wx.setStorageSync('paytable', 'zhoubianshangcheng');
        wx.navigateTo({
            url: "/pages/pay-confirm/pay-confirm?funName=paySave"
        })
    },
    async paySave(payForm){
        payForm.ispay = "已支付";
        http.post(`/zhoubianshangcheng/update`,payForm).then(res=>{
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
    //立即购买
    onBuyTap() {
        if (!wx.getStorageSync('token')) {
            return
        }
        const data = {
            tablename: 'zhoubianshangcheng',
            goodid: this.data.detailList.id,
            goodname: this.data.detailList.shangpinmingcheng,
            picture: this.data.pictureList[0],
            buynumber: 1,
            price: this.data.detailList.price,
            discountprice: this.data.detailList.vipprice,
            total:wx.getStorageSync('vip') == '是'? this.data.detailList.price :
            parseFloat(this.data.detailList.price * 1).toFixed(2)
        }
        wx.setStorageSync('orderGoods', [data])
        getApp().globalData.total = data.total;
        wx.navigateTo({
            url: "/pages/shop-order/orders-confirm?type=1"
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