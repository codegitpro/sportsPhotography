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
            title: '',
            subtitle: '',
            content: '',
            picture1: '',
            picture2: '',
            picture3: '',
        },
        disabledForm: {
		    title : false,
		    subtitle : false,
		    content : false,
		    picture1 : false,
		    picture2 : false,
		    picture3 : false,
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
            let res = await http.get(`/systemintro/info/${this.data.ruleForm.id}`)
            this.setData({
                ruleForm:res.data,
            })
        }else if(options.cross) {
            this.setData({
                cross:options.cross,
            })
            var obj = wx.getStorageSync('crossObj');
            for (var o in obj) {
                if (o == 'title') {
                    this.setData({
                        ['ruleForm.title']:obj[o],
                        ['disabledForm.title']:true,
                    })
                    continue;
                }
                if (o == 'subtitle') {
                    this.setData({
                        ['ruleForm.subtitle']:obj[o],
                        ['disabledForm.subtitle']:true,
                    })
                    continue;
                }
                if (o == 'content') {
                    this.setData({
                        ['ruleForm.content']:obj[o],
                        ['disabledForm.content']:true,
                    })
                    continue;
                }
                if (o == 'picture1') {
                    this.setData({
                        ['ruleForm.picture1']:obj[o].split(",")[0],
                        ['disabledForm.picture1']:true,
                    })
                    continue;
                }
                if (o == 'picture2') {
                    this.setData({
                        ['ruleForm.picture2']:obj[o].split(",")[0],
                        ['disabledForm.picture2']:true,
                    })
                    continue;
                }
                if (o == 'picture3') {
                    this.setData({
                        ['ruleForm.picture3']:obj[o].split(",")[0],
                        ['disabledForm.picture3']:true,
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
    uploadpicture1() {
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
                                [`ruleForm.picture1`]: 'file/' + result.file
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
    uploadpicture2() {
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
                                [`ruleForm.picture2`]: 'file/' + result.file
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
    uploadpicture3() {
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
                                [`ruleForm.picture3`]: 'file/' + result.file
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
            let res = await http.get(`/systemintro/page`,{
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
                    submit_res = await update(`systemintro`, this.data.ruleForm)
                } else {
                    submit_res = await add(`systemintro`,this.data.ruleForm)
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
                submit_res = await update(`systemintro`, this.data.ruleForm)
            }else{
                submit_res = await add(`systemintro`, this.data.ruleForm)
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
        if(this.data.ruleForm.title == null || this.data.ruleForm.title === ''){
            wx.showToast({
                icon: "none",
                title: `标题不能为空`,
            })
            return false
        }
        if(this.data.ruleForm.content == null || this.data.ruleForm.content === ''){
            wx.showToast({
                icon: "none",
                title: `内容不能为空`,
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