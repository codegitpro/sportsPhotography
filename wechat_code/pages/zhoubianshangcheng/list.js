const http = require("../../api/http.js")
const {
    deleteData,
    page,
    list,
    newsData,
    option,
} = require("../../api/index.js")
const utils = require("../../utils/index.js")
const moment = require("moment")
Page({
    /**
    * 页面的初始数据
    */
    data: {
        auth:{  //权限
            front:{},   //公共列表权限
            back:{}     //私有列表权限
        },
        hasFrontChartsAuth:false,
        hasBackChartsAuth:false,
        categoryList:['全部'],
        categoryIndex:0,
        sortType:'',
        sortOrder:'',
        pageNum: 1,
        pageSize: 10,
        flag: true, // 防抖开关 防止用户不停的下拉
        popopShow:false,

        goodsListData: [],
        addAuth:"",
        delAuth: "",
        editAuth:"" ,
        baseUrl: wx.getStorageSync('baseUrl') + "/",
        centerType:false,   //是否个人中心进来（私有列表）
    },

    /**
    * 生命周期函数--监听页面加载
    */
    async onLoad(options) {
        this.setData({
            centerType:!!options.centerType
        })
        if(getApp().globalData.name!=null){
            getApp().globalData.name=null
        }
        this.getAuth()
    },
    onShow() {
        this.setData({
            sortType:""
        })
        if (getApp().globalData.name == null) {
            this.setData({
                name: null
            })
        }
        if(getApp().globalData.name){
            this.setData({
                name: getApp().globalData.name
            })
            getApp().globalData.name=null
        }
        this.getCategoryList()
        this.setData({pageNum:1,goodsListData:[]})
        this.getData()
    },
    onHide() {
       this.setData({
          showTable:false
        })
    },
    getAuth(){
        let auth = {
            front:{
                '新增':utils.isAuthFront('zhoubianshangcheng', '新增'),
                '删除':utils.isAuthFront('zhoubianshangcheng', '删除'),
                '修改':utils.isAuthFront('zhoubianshangcheng', '修改'),
                '库存统计':utils.isAuthFront('zhoubianshangcheng', '库存统计')&&(this.data.hasFrontChartsAuth=true),
                '分类统计':utils.isAuthFront('zhoubianshangcheng', '分类统计')&&(this.data.hasFrontChartsAuth=true),
            },
            back:{
                '新增':utils.isAuth('zhoubianshangcheng', '新增'),
                '删除':utils.isAuth('zhoubianshangcheng', '删除'),
                '修改':utils.isAuth('zhoubianshangcheng', '修改'),
                '库存统计':utils.isAuth('zhoubianshangcheng', '库存统计')&&(this.data.hasBackChartsAuth=true),
                '分类统计':utils.isAuth('zhoubianshangcheng', '分类统计')&&(this.data.hasBackChartsAuth=true),
            }
        }
        this.setData({
            hasFrontChartsAuth:this.data.hasFrontChartsAuth,
            hasBackChartsAuth:this.data.hasBackChartsAuth,
            auth
        })
    },
    getCategoryList(){
        http.get('/option/shangpinfenlei/shangpinfenlei',{
        }).then(res => {
            this.setData({
                categoryList:['全部',...res.data]
            })
        })
    },
    sortClick (e){
      const type=  e.currentTarget.dataset.info;
        if(this.data.sortType==type && this.data.sortOrder=='asc'){
            this.setData({sortType:''})

        }else if(this.data.sortType==type && this.data.sortOrder=='desc'){
             this.setData({sortOrder:'asc'})
        }else{
            this.setData({sortType:type,sortOrder:'desc'})
        }
        this.search()
    },
    screenReset(){
        let obj={}
        //pinpai
        obj["pinpai"]=""
        this.setData(obj)
    },
    async search(){
        let searchForm = {
            page: 1,
            limit: 999,
        }
        if(this.data.sortType){
            searchForm['sort'] = this.data.sortType;
            searchForm['order'] = this.data.sortOrder;
        }
        if(this.data.shangpinmingcheng){
            searchForm['shangpinmingcheng'] = '%' + this.data.shangpinmingcheng + '%'
        }
        if(this.data.pinpai){
            searchForm['pinpai'] = '%' + this.data.pinpai + '%'
        }
        this.data.categoryList[this.data.categoryIndex]=='全部'?'':searchForm["shangpinfenlei"]='%'+this.data.categoryList[this.data.categoryIndex]+'%';
        let res = {};
        if(this.data.centerType) {
            res = await http.get(`/zhoubianshangcheng/page`,{
                data:searchForm
            })
        } else {
            searchForm.isShelves = 1    //只获取已上架的
            res = await http.get(`/zhoubianshangcheng/list`,{
                data:searchForm
            })
        }


        let goodsListData
        // 如果是第一页数据置空
        if (this.data.pageNum == 1) {
            goodsListData = []
        };
        if(res.code==0){
            goodsListData=res.data.list.map(item=>{
                item.tupian.indexOf('http') !== -1?item.tupian: item.tupian = this.data.baseUrl+item.tupian?.split(",")[0].replace('upload','flie')
                return item
            })
            this.setData({
                goodsListData: goodsListData,
                popopShow:false
            })
        }
    },
    async categoryClick(e) {
        let params={
        }
        const index = e.currentTarget.dataset.index;

        let shangpinfenlei= e.currentTarget.dataset.cate;
        shangpinfenlei=='全部'?'':params["shangpinfenlei"]='%'+shangpinfenlei+'%';
        let res={};
        if(this.data.centerType){
            res=await http.get(`/zhoubianshangcheng/page`,{
                data:params
            })
        }else{
            params.isShelves = 1    //只获取已上架的
            res=await http.get(`/zhoubianshangcheng/list`,{
                data:params
            })
        }
        let goodsListData=res.data.list.map(item => {
            item.tupian.indexOf('http') !== -1?item.tupian: item.tupian = this.data.baseUrl+item.tupian?.split(",")[0].replace('upload','flie')
            return item
        })
        this.setData({
            categoryIndex:index,
            goodsListData:   goodsListData ,
          shangpinfenlei:shangpinfenlei=='全部'?'':'%'+shangpinfenlei+'%',
        })
        this.setData({pageNum:1,goodsListData:[]})
        this.getData()
    },
    onReachBottom() {
         if (this.data.flag ) {
             this.setData({
                 flag: false
             })
             this.getData();
         }
     },
    async getData() {
        const params={
            page: this.data.pageNum,
            limit: this.data.pageSize,
        }
        let resList
        params['page']=this.data.pageNum;
        params['limit']=this.data.pageSize;
        this.data.shangpinfenlei?params['shangpinfenlei']=this.data.shangpinfenlei:'';
        if(this.data.centerType){
            resList = await http.get(`/zhoubianshangcheng/page`,{
                data:params
            })
        }else{
            params.isShelves = 1    //只获取已上架的
             resList= await http.get(`/zhoubianshangcheng/list`,{
                data:params
            })
        }
        if(resList.code==0){
            let mylist = this.data.goodsListData;
                //先处理成你想要的数据 下面再去赋值
            let resData =  resList.data.list.map(item => {
                item.tupian?.indexOf('http') !== -1?item.tupian: item.tupian = this.data.baseUrl+item.tupian?.split(",")[0].replace('upload','flie');
                return item;
            });
            if (this.data.pageNum == 1) {
                mylist = []
            }

            // 新旧数据合并到一起
            let resultdata
            if(resList.data.list.length>0){
                resultdata = this.data.goodsListData.concat(resData)
            }
            if (this.data.pageNum<resList.data.totalPage ){
                this.setData({
                    pageNum:params.page+ 1,
                    flag:true
                })
            } else {
                this.setData({
                    flag:false
                })
            }
            this.setData({
                goodsListData:  resultdata ,
            })
        }
        // 商品名称
        if (getApp().globalData.name != null) {
            this.setData({
                goodsListData:  getApp().globalData.goodsList ,
            })
            getApp().globalData.name = null
        }
    },
    addTap() {
        getApp().globalData.detailId=null
        wx.navigateTo({
            url: `/pages/zhoubianshangcheng/update-and-add?centerType=${this.data.centerType?1:''}`
        })
    },
    deleteBtn(e) {
        const detail = e.currentTarget.dataset.item;
        wx.showModal({
            title: '提示',
            content: '确认删除？',
            complete: async (res) => {
                if (res.cancel) {}
                if (res.confirm) {
                    const id = e.currentTarget.dataset.id;
                    const res = await deleteData("zhoubianshangcheng",[id])
                    if (res.code == 0) {
                        this.onShow()
                    }
                }
            }
        })
    },
    editBtn(e) {
        const detail = e.currentTarget.dataset.item;
        if(detail?.id){
            getApp().globalData.detailList =detail;
            getApp().globalData.detailId=detail.id;
            wx.navigateTo({
                url: `/pages/zhoubianshangcheng/update-and-add?id=${detail.id}&centerType=${this.data.centerType?1:''}`
            })
        }
    },
    async detailBtn(e) {
        const item = e.currentTarget.dataset.item;
        if(item?.id){
            getApp().globalData.detailId = item.id;
            getApp().globalData.detailList =item
            wx.navigateTo({
                url: `/pages/zhoubianshangcheng/detail?id=${item.id}&centerType=${this.data.centerType?1:''}`
            })
        }
    },
    showCharts(){
        if(!wx.getStorageSync('token')){
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            setTimeout(()=>{
                wx.navigateTo({
                    url: '../login/login',
                })
            },1000)
            return
        }
        wx.navigateTo({
            url: `./charts?centerType=${this.data.centerType?1:''}`,
        })
    },
    //true|false切换
    toggle(e){
        const { key } = e.target.dataset
        this.setData({
            [`${key}`]:!this.data[key]
        })
    },
})
