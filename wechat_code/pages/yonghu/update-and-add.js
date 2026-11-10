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
            yonghuzhanghao: '',
            yonghumima: '',
            yonghuxingming: '',
            touxiang: '',
            xingbie: '',
            shoujihaoma: '',
            money: 0,
        },
        xingbieOptions: [],
        xingbieIndex: 0,
        disabledForm: {
		    yonghuzhanghao : false,
		    yonghumima : false,
		    yonghuxingming : false,
		    touxiang : false,
		    xingbie : false,
		    shoujihaoma : false,
		    money : false,
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
            let res = await http.get(`/yonghu/info/${this.data.ruleForm.id}`)
            this.setData({
                ruleForm:res.data,
            })
        }else if(options.cross) {
            this.setData({
                cross:options.cross,
            })
            var obj = wx.getStorageSync('crossObj');
            for (var o in obj) {
                if (o == 'yonghuzhanghao') {
                    this.setData({
                        ['ruleForm.yonghuzhanghao']:obj[o],
                        ['disabledForm.yonghuzhanghao']:true,
                    })
                    continue;
                }
                if (o == 'yonghumima') {
                    this.setData({
                        ['ruleForm.yonghumima']:obj[o],
                        ['disabledForm.yonghumima']:true,
                    })
                    continue;
                }
                if (o == 'yonghuxingming') {
                    this.setData({
                        ['ruleForm.yonghuxingming']:obj[o],
                        ['disabledForm.yonghuxingming']:true,
                    })
                    continue;
                }
                if (o == 'touxiang') {
                    this.setData({
                        ['ruleForm.touxiang']:obj[o].split(",")[0],
                        ['disabledForm.touxiang']:true,
                    })
                    continue;
                }
                if (o == 'xingbie') {
                    this.setData({
                        ['ruleForm.xingbie']:obj[o],
                        ['disabledForm.xingbie']:true,
                    })
                    continue;
                }
                if (o == 'shoujihaoma') {
                    this.setData({
                        ['ruleForm.shoujihaoma']:obj[o],
                        ['disabledForm.shoujihaoma']:true,
                    })
                    continue;
                }
                if (o == 'money') {
                    this.setData({
                        ['ruleForm.money']:obj[o],
                        ['disabledForm.money']:true,
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
        this.setData({
            xingbieOptions:"男,女".split(',')
        })
    },
    // 下拉变化
    xingbieChange(e) {
        this.setData({
            [`ruleForm.xingbie`] : this.data.xingbieOptions[this.data.xingbieIndex]
        })
    },
    uploadtouxiang() {
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
                                [`ruleForm.touxiang`]: 'file/' + result.file
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
            let res = await http.get(`/yonghu/page`,{
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
                    submit_res = await update(`yonghu`, this.data.ruleForm)
                } else {
                    submit_res = await add(`yonghu`,this.data.ruleForm)
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
                submit_res = await update(`yonghu`, this.data.ruleForm)
            }else{
                submit_res = await add(`yonghu`, this.data.ruleForm)
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
    validate(){
        if(this.data.ruleForm.yonghuzhanghao == null || this.data.ruleForm.yonghuzhanghao === ''){
            wx.showToast({
                icon: "none",
                title: `用户账号不能为空`,
            })
            return false
        }
        if(this.data.ruleForm.yonghumima == null || this.data.ruleForm.yonghumima === ''){
            wx.showToast({
                icon: "none",
                title: `用户密码不能为空`,
            })
            return false
        }
        if(this.data.ruleForm.yonghuxingming == null || this.data.ruleForm.yonghuxingming === ''){
            wx.showToast({
                icon: "none",
                title: `用户姓名不能为空`,
            })
            return false
        }
        if(!utils.validator.isMobile(this.data.ruleForm.shoujihaoma)){
            wx.showToast({
                icon: "none",
                title: `手机号码应输入手机格式`,
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