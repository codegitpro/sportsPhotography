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
            username: '',
            operation: '',
            method: '',
            params: '',
            time: '',
            ip: '',
        },
        disabledForm: {
		    username : false,
		    operation : false,
		    method : false,
		    params : false,
		    time : false,
		    ip : false,
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
            let res = await http.get(`/syslog/info/${this.data.ruleForm.id}`)
            this.setData({
                ruleForm:res.data,
            })
        }else if(options.cross) {
            this.setData({
                cross:options.cross,
            })
            var obj = wx.getStorageSync('crossObj');
            for (var o in obj) {
                if (o == 'username') {
                    this.setData({
                        ['ruleForm.username']:obj[o],
                        ['disabledForm.username']:true,
                    })
                    continue;
                }
                if (o == 'operation') {
                    this.setData({
                        ['ruleForm.operation']:obj[o],
                        ['disabledForm.operation']:true,
                    })
                    continue;
                }
                if (o == 'method') {
                    this.setData({
                        ['ruleForm.method']:obj[o],
                        ['disabledForm.method']:true,
                    })
                    continue;
                }
                if (o == 'params') {
                    this.setData({
                        ['ruleForm.params']:obj[o],
                        ['disabledForm.params']:true,
                    })
                    continue;
                }
                if (o == 'time') {
                    this.setData({
                        ['ruleForm.time']:obj[o],
                        ['disabledForm.time']:true,
                    })
                    continue;
                }
                if (o == 'ip') {
                    this.setData({
                        ['ruleForm.ip']:obj[o],
                        ['disabledForm.ip']:true,
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
            let res = await http.get(`/syslog/page`,{
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
                    submit_res = await update(`syslog`, this.data.ruleForm)
                } else {
                    submit_res = await add(`syslog`,this.data.ruleForm)
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
                submit_res = await update(`syslog`, this.data.ruleForm)
            }else{
                submit_res = await add(`syslog`, this.data.ruleForm)
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
        if(this.data.ruleForm.username == null || this.data.ruleForm.username === ''){
            wx.showToast({
                icon: "none",
                title: `用户名不能为空`,
            })
            return false
        }
        if(this.data.ruleForm.operation == null || this.data.ruleForm.operation === ''){
            wx.showToast({
                icon: "none",
                title: `用户操作不能为空`,
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