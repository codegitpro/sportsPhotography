const dateUtils = require('../../utils/defautils')
const {
    SendverificationCode,
    option,
    follow, wxbind, wxunbind
} = require('../../api/login.js')
const {
    levelOption,
    sheng,
    update,
    session
} = require('../../api/index.js')
const utils = require("../../utils/index.js")
const moment = require("moment")
const http = require("../../api/http.js")
Page({
    data:{
        baseUrl: wx.getStorageSync('baseUrl') + '/',
        code:'',
        openid:'',
        tableName:wx.getStorageSync('nowTable'),
        userInfo:{},
        xingbieOptions:[],
        xingbieIndex:0,
        disabledForm: {
            yonghuzhanghao : true,
            yonghumima : true,
		    yonghuxingming : false,
		    touxiang : false,
		    xingbie : false,
		    shoujihaoma : false,
            money : true,
        },
        registerContainerClass:"",
    },
    async onLoad(){
        wx.login({
            provider:'weixin',
            success: (res) => {
                if (res.code) {
                    this.setData({
                        code:res.code
                    });
                }
            }
        });
        let res = await getApp().getUserInfo()
        this.setData({
            openid:res.data.openid,
            userInfo:getApp().globalData.userInfo
        })
        this.initData()
    },
    async initData(){
        // 下拉框
        this.setData({
            xingbieOptions:"男,女".split(',')
        })
    },
    // 下拉变化
    xingbieChange(e) {
        this.setData({
            [`userInfo.xingbie`] : this.data.xingbieOptions[this.data.xingbieIndex]
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
                                [`userInfo.touxiang`]: 'file/' + result.file
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
    quitTap(){
        wx.clearStorageSync();
        wx.setStorageSync('baseUrl', this.data.baseUrl)
        wx.reLaunch({
            url:"/pages/login/login"
        });
    },
    async saveTap(){
        //表单校验
        if(!this.validate()){
            return
        }
        const res = await update(wx.getStorageSync('nowTable'), this.data.userInfo)
        if (res.code==0) {
            const res1 = await session(wx.getStorageSync('nowTable'))
            if (res1.code==0) {
                getApp().globalData.userInfo = res1.data
                wx.showToast({
                    title:"保存成功",
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },500)
            }
        } else {
            wx.showToast({
                title:res.msg,
                icon:"none"
            })
        }
    },
    validate(){
        if(this.data.userInfo.yonghuzhanghao == null || this.data.userInfo.yonghuzhanghao === ''){
            wx.showToast({
                icon: "none",
                title: `用户账号不能为空`,
            })
            return false
        }
        if(this.data.userInfo.yonghumima == null || this.data.userInfo.yonghumima === ''){
            wx.showToast({
                icon: "none",
                title: `用户密码不能为空`,
            })
            return false
        }
        if(this.data.userInfo.yonghuxingming == null || this.data.userInfo.yonghuxingming === ''){
            wx.showToast({
                icon: "none",
                title: `用户姓名不能为空`,
            })
            return false
        }
        if(!utils.validator.isMobile(this.data.userInfo.shoujihaoma)){
            wx.showToast({
                icon: "none",
                title: `手机号码应输入手机格式`,
            })
            return false
        }
        if(!utils.validator.isNumber(this.data.userInfo.money)){
            wx.showToast({
                icon: "none",
                title: `余额应输入数字`,
            })
            return false
        }
        return true
    },
    valueChange(e){
        this.setData({
            [`${e.target.dataset.key}`]:e.detail.value
        })
    },
    //true|false切换
    toggle(e){
        const { key } = e.currentTarget.dataset
        this.setData({
            [`${key}`]:!this.data[key]
        })
    },
});