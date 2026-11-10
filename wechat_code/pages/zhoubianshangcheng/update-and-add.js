const http = require("../../api/http.js")
const {
    detail,
    option,
    update,
    add,
    list,
    follow,
    faceMatch,
    session,
    rubbish,
    levelOption,
    baiduIdentify
} = require("../../api/index.js")
const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")
const moment = require("moment")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: wx.getStorageSync('baseUrl') + '/',
        userInfo:{},
        sessionReadArr: [],
        detailList: null,
        id: "",
        cross: "",
        ruleForm: {
            shangpinmingcheng: '',
            tupian: '',
            shangpinfenlei: '',
            guige: '',
            pinpai: '',
            shangpinxiangqing: '',
            fabushijian: '',
            onelimittimes: 0,
            alllimittimes: 0,
            storeupNumber: 0,
            discussNumber: 0,
            price: 0,
            isShelves: '1',
        },
        shangpinfenleiOptions: [],
        shangpinfenleiIndex: 0,
        disabledForm: {
		    shangpinmingcheng : false,
		    tupian : false,
		    shangpinfenlei : false,
		    guige : false,
		    pinpai : false,
		    shangpinxiangqing : false,
		    fabushijian : false,
		    clicktime : false,
		    onelimittimes : false,
		    alllimittimes : false,
		    storeupNumber : false,
		    discussNumber : false,
		    price : false,
		    isShelves : false,
        },
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await this.initData()
        let table = wx.getStorageSync("nowTable");
        if (options.refid) {// 如果上一级页面传递了关联id
            this.setData({
                ['ruleForm.refid']:options.refid,
            })
        }
        // 如果是更新操作
        if (options.id) {
            this.setData({
                ['ruleForm.id']:options.id,
            })
            // 获取信息
            let res = await http.get(`/zhoubianshangcheng/info/${this.data.ruleForm.id}`)
            this.setData({
                ruleForm:res.data,
            })
        }else if(options.cross) {
            this.setData({
                cross:options.cross,
            })
            var obj = wx.getStorageSync('crossObj');
            for (var o in obj) {
                if (o == 'shangpinmingcheng') {
                    this.setData({
                        ['ruleForm.shangpinmingcheng']:obj[o],
                        ['disabledForm.shangpinmingcheng']:true,
                    })
                    continue;
                }
                if (o == 'tupian') {
                    this.setData({
                        ['ruleForm.tupian']:obj[o].split(",")[0],
                        ['disabledForm.tupian']:true,
                    })
                    continue;
                }
                if (o == 'shangpinfenlei') {
                    this.setData({
                        ['ruleForm.shangpinfenlei']:obj[o],
                        ['disabledForm.shangpinfenlei']:true,
                    })
                    continue;
                }
                if (o == 'guige') {
                    this.setData({
                        ['ruleForm.guige']:obj[o],
                        ['disabledForm.guige']:true,
                    })
                    continue;
                }
                if (o == 'pinpai') {
                    this.setData({
                        ['ruleForm.pinpai']:obj[o],
                        ['disabledForm.pinpai']:true,
                    })
                    continue;
                }
                if (o == 'shangpinxiangqing') {
                    this.setData({
                        ['ruleForm.shangpinxiangqing']:obj[o],
                        ['disabledForm.shangpinxiangqing']:true,
                    })
                    continue;
                }
                if (o == 'fabushijian') {
                    this.setData({
                        ['ruleForm.fabushijian']:obj[o],
                        ['disabledForm.fabushijian']:true,
                    })
                    continue;
                }
                if (o == 'clicktime') {
                    this.setData({
                        ['ruleForm.clicktime']:obj[o],
                        ['disabledForm.clicktime']:true,
                    })
                    continue;
                }
                if (o == 'onelimittimes') {
                    this.setData({
                        ['ruleForm.onelimittimes']:obj[o],
                        ['disabledForm.onelimittimes']:true,
                    })
                    continue;
                }
                if (o == 'alllimittimes') {
                    this.setData({
                        ['ruleForm.alllimittimes']:obj[o],
                        ['disabledForm.alllimittimes']:true,
                    })
                    continue;
                }
                if (o == 'storeupNumber') {
                    this.setData({
                        ['ruleForm.storeupNumber']:obj[o],
                        ['disabledForm.storeupNumber']:true,
                    })
                    continue;
                }
                if (o == 'discussNumber') {
                    this.setData({
                        ['ruleForm.discussNumber']:obj[o],
                        ['disabledForm.discussNumber']:true,
                    })
                    continue;
                }
                if (o == 'price') {
                    this.setData({
                        ['ruleForm.price']:obj[o],
                        ['disabledForm.price']:true,
                    })
                    continue;
                }
                if (o == 'isShelves') {
                    this.setData({
                        ['ruleForm.isShelves']:obj[o],
                        ['disabledForm.isShelves']:true,
                    })
                    continue;
                }
            }
        }
    },
    onShow(){
    },
    async initData(){
        await getApp().getUserInfo()
        this.setData({
            userInfo:getApp().globalData.userInfo,
        })
        // 下拉框
        http.get(`/option/shangpinfenlei/shangpinfenlei`).then(res=>{
            this.setData({
                shangpinfenleiOptions:["请选择商品分类",...res.data]
            })
        })
        this.setData({
            [`ruleForm.fabushijian`]: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
    },
    // 下拉变化
    shangpinfenleiChange(e) {
        this.setData({
            [`ruleForm.shangpinfenlei`] : this.data.shangpinfenleiOptions[this.data.shangpinfenleiIndex]
        })
    },
    uploadtupian() {
        wx.chooseMedia({
            count: 1,
            sizeType: ['compressed'],
            success: async (res) => {
                // 上传
                wx.uploadFile({
                    url: `${this.data.baseUrl}file/upload`,
                    filePath: res.tempFiles[0].tempFilePath,
                    name: 'file',
                    header: {
                        'Token': wx.getStorageSync('token')
                    },
                    success: (uploadFileRes) => {
                        let result = JSON.parse(uploadFileRes.data);
                        if (result.code == 0) {
                            this.setData({
                                [`ruleForm.tupian`]: 'file/' + result.file
                            })
                            wx.showToast({
                                title: '上传成功',
                            });
                        } else {
                            wx.showToast({
                                title: result.msg,
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    }
                })
            }
        })
    },
    onfabushijianTap() {
        if(this.data.disabledForm.fabushijian){
            return
        }
        this.setData({
            showfabushijian: true,
        })
    },
    fabushijianChange(e) {
            this.setData({
                [`ruleForm.fabushijian`]: e.detail.data
            })
        },
    onclicktimeTap() {
        if(this.data.disabledForm.clicktime){
            return
        }
        this.setData({
            showclicktime: true,
        })
    },
    clicktimeChange(e) {
            this.setData({
                [`ruleForm.clicktime`]: e.detail.data
            })
        },
    async onSubmitTap() {
        //跨表计算判断
        var obj;
        //表单校验
        if(!this.validate()){
            return
        }
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        if(this.data.cross){
            wx.setStorageSync('crossCleanType', true);
            var statusColumnName = wx.getStorageSync('statusColumnName');
            var statusColumnValue = wx.getStorageSync('statusColumnValue');
            if (statusColumnName != '') {
                if (!obj) {
                    obj = wx.getStorageSync('crossObj');
                }
                if (!statusColumnName.startsWith("[")) {
                    for (var o in obj) {
                        if (statusColumnName==o){
                            obj[o] = statusColumnValue;
                        }
                    }
                    var table = wx.getStorageSync('crossTable');
                    await update(table, obj)
                } else {
                    crossuserid = getApp().globalData.userInfo.id
                    crossrefid =  obj['id']
                    crossoptnum = wx.getStorageSync('statusColumnName');
                    crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
                }
            }
        }
        if(crossrefid && crossuserid){
            this.data.ruleForm['crossuserid'] = crossuserid;
            this.data.ruleForm['crossrefid'] = crossrefid;
            let params = {
                page: 1,
                limit: 10,
                crossuserid: crossuserid,
                crossrefid: crossrefid,
            }
            let res = await http.get(`/zhoubianshangcheng/page`,{
                data:params
            })
            if (res.data.total >= crossoptnum) {
                wx.showToast({
                    title:wx.getStorageSync('crossTips'),
                    icon: 'none'
                })
                wx.removeStorageSync('crossCleanType');
                return false;
            }else{
                let submit_res = {}
                if (this.data.ruleForm.id) {
                    submit_res = await update(`zhoubianshangcheng`, this.data.ruleForm)
                } else {
                    submit_res = await add(`zhoubianshangcheng`,this.data.ruleForm)
                }
                if(submit_res.code==0){
                    wx.showToast({
                        title:'提交成功',
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },1500)
                }else{
                    wx.showToast({
                        icon:'error',
                        title:'提交失败',
                    })
                }
            }
        }else {
            let submit_res = {}
            if (this.data.ruleForm.id) {
                submit_res = await update(`zhoubianshangcheng`, this.data.ruleForm)
            }else{
                submit_res = await add(`zhoubianshangcheng`, this.data.ruleForm)
            }
            if(submit_res.code==0){
                wx.showToast({
                    title:'提交成功',
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },1500)
            }else{
                wx.showToast({
                    icon:'error',
                    title:'提交失败',
                })
            }
        }
    },
    editorChange(e){
        this.setData({
            [`${e.target.dataset.key}`]:e.detail
        })
    },
    validate(){
        if(!utils.validator.isIntNumber(this.data.ruleForm.onelimittimes)){
            wx.showToast({
                icon: "none",
                title: `单限应输入整数`,
            })
            return false
        }
        if(!utils.validator.isIntNumber(this.data.ruleForm.alllimittimes)){
            wx.showToast({
                icon: "none",
                title: `库存应输入整数`,
            })
            return false
        }
        if(!utils.validator.isNumber(this.data.ruleForm.price)){
            wx.showToast({
                icon: "none",
                title: `价格应输入数字`,
            })
            return false
        }
        return true
    },
    //true|false切换
    toggle(e){
        const { key } = e.currentTarget.dataset
        this.setData({
            [`${key}`]:!this.data[key]
        })
    },
    valueChange(e){
        this.setData({
            [`${e.target.dataset.key}`]:e.detail.value
        })
    },
})