const http = require("../../api/http.js")
const {
    deleteData,
    list,
    page
} = require("../../api/index.js")
const utils = require("../../utils/index.js")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showToTopButton: true,
        onPageScrollTop: 0, // 存储滚动距离的变量
        goodsListData: [],
        activeIndex: 0,
        allData: [],
        deleteShow: false,
        className:"",
        name:"",
        addAuth:"",
        delAuth: "",
        editAuth:"" ,
        userid:"",
        baseUrl: wx.getStorageSync('baseUrl') + '/',
        type:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setData({
            type:options.type,
            addAuth: utils.isAuth("storeup", "新增") || utils.isAuthFront("storeup", "新增"),
            delAuth: utils.isAuth("storeup", "删除") || utils.isAuthFront("storeup", "删除"),
            editAuth: utils.isAuth("storeup", "修改") || utils.isAuthFront("storeup", "修改"),
        })
        if(options.userid) {
            this.setData({
                userid:options.userid
            })
        }
        if(getApp().globalData.name!=null){
            this.setData({
                name: getApp().globalData.name
            })
            getApp().globalData.name=null
            this.searhandler()
        }else{
            this.getData()
        }
    },
    onShow() {
        if (getApp().globalData.name == null) {
            this.setData({
                name: null
            })
            this.getData()

        }
    },
    getCurrentPageUrl() {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const currentPageUrl = `/${currentPage.route}`;
        return currentPageUrl;
    },
    handleTabClick(e) {
        this.setData({
            activeIndex: index,
        });
    },

    async search() {
        let params = {};
        params['sort'] = 'id';
        params['order'] = 'asc';
        params['type'] = this.data.type
        if (this.data.name) {
            params['name'] = '%' + this.data.name + '%'
        }
        let res = {};
        res = await http.get(`/storeup/page`,{
            data:params
        })
        let goodsListData
        // 如果是第一页数据置空
        if (res.data.list.length <= 0) goodsListData = [];

        goodsListData = res.data.list.map(item => {
            item.picture.indexOf('http') !== -1?item.picture: item.picture = this.data.baseUrl+item.picture?.split(",")[0].replace('upload','flie')
            return item
        })
        this.setData({
            goodsListData,
        })

    },


    addTap() {
        getApp().globalData.detailId=null
        wx.navigateTo({
            url: `/pages/storeup/update-and-add`
        })
    },
    searchListHandler(e) {
        this.setData({
            goodsListData: e.detail.data
        })
    },
    onPageScroll(e) {
        if (e.scrollTop >= 225) {
            this.setData({
                showToTopButton: true
            });
        }

    },
    backToTop() {
        wx.pageScrollTo({
            scrollTop: 0, // 返回顶部的位置
            duration: 1000, // 滚动动画的时长，单位为 ms
        });
    },

    deleteBtn(e) {
        wx.showModal({
            title: '提示',
            content: '确认删除？',
            complete: async (res) => {
                if (res.cancel) {}
                if (res.confirm) {
                    const id = e.currentTarget.dataset.id;
                    const res = await deleteData("storeup",[id])
                    if (res.code == 0) {
                        this.getData()
                    }
                }
            }
        })
    },
    editBtn(e) {
        const id = e.currentTarget.dataset.id;
        getApp().globalData.detailId=id
        wx.navigateTo({
            url: `/pages/storeup/update-and-add`
        })
    },
    async detailBtn(e) {
        const item = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: `/pages/${item.tablename}/detail?id=${item.refid}`
        })
    },
    async getData() {
        const obj={
            page: 1,
            limit: 100,
            type:this.data.type
        }


        const userId = getApp().globalData.userInfo.id;
        let data;
        if (userId) {
            obj['userid']=userId;
        const responseList = await  page("storeup", obj);
            data = responseList.data;
        } else {
            const responsePage = await http.get(`/storeup/page`,{
                data:obj
            })
            data = responsePage.data;
        }

        let goodsListData = data?.list?.filter(item =>
            item?.sfsh?item.sfsh === "是":item)
            .map(item => {
                item.picture.indexOf('http') !== -1?item.picture: item.picture = this.data.baseUrl+item.picture?.split(",")[0].replace('upload','flie')
                return item
            });
        if(this.data.userid){
            goodsListData=data?.list?.filter(item=>item.userid==this.data.userid*1)
        }

        this.setData({
            goodsListData,
            allData: goodsListData
        })

    },
})