const dateUtils = require('../../utils/defautils')
const utils = require("../../utils/index.js")
const {
    SendverificationCode,
    follow
} = require('../../api/login.js')
const http = require("../../api/http.js")
const moment = require("moment")
Page({
    data:{
        baseUrl: wx.getStorageSync('baseUrl') + '/',
        xingbieOptions: [],
        xingbieIndex: 0,
        ruleForm:{
            yonghuzhanghao: '',
            yonghumima: '',
            yonghuxingming: '',
            touxiang: '',
            xingbie: '',
            shoujihaoma: '',
            money: 0,
        },
    },
    async onLoad(){
        // 下拉框
        this.setData({
            xingbieOptions:"男,女".split(',')
        })
    },
    valueChange(e){
        this.setData({
            [`${e.target.dataset.key}`]:e.detail.value
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
    async sendCodeHandler(){
        if (!this.data.canSendCode){
            return;
        }
        if (!this.data.ruleForm.mobile){
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none'
            })
            return;
        }
        if (!utils.validator.isMobile(this.data.ruleForm.shoujihaoma)){
            wx.showToast({
                title: '请输入有效手机号码',
                icon: 'none'
            })
            return;
        }
        const res = await SendverificationCode("yonghu", 'sendsms', 'shoujihaoma', this.data.ruleForm.shoujihaoma)
        wx.showToast({
            title: '验证码已发送',
            icon: 'none'
        })
        this.setData({
            canSendCode: false,
        });
        let time = this.data.countdown;
        let timer = setInterval(() =>{
            time--;
            this.setData({
                countdown: time, // 更新倒计时的时间
            });
            if (time <= 0){
                clearInterval(timer); // 倒计时结束，清除定时器
                this.setData({
                    canSendCode: true,
                    countdown: 60
                });
            }
        }, 1000);
    },
    async register(){
        if (!this.data.ruleForm.yonghuzhanghao){
            wx.showToast({
                icon: "none",
                title: `用户账号不能为空`,
            })
            return
        }
        if (!this.data.ruleForm.yonghumima){
            wx.showToast({
                icon: "none",
                title: `用户密码不能为空`,
            })
            return
        }
        if(this.data.ruleForm.yonghumima != this.data.ruleForm.yonghumima2){
            wx.showToast({
                title: '两次密码输入不一致',
                icon: "none"
            })
            return;
        }
        if (!this.data.ruleForm.yonghuxingming){
            wx.showToast({
                icon: "none",
                title: `用户姓名不能为空`,
            })
            return
        }
        if(!utils.validator.isMobile(this.data.ruleForm.shoujihaoma)){
            wx.showToast({
                icon: "none",
                title: `手机号码应输入手机格式`,
            })
            return
        }
        const res = await http.post(`/yonghu/register`,this.data.ruleForm)
        if (res.code == 0) {
            wx.showToast({
                title: "注册成功",
                icon: "none"
            })
            setTimeout(()=>{
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            },1000)
        } else {
            wx.showToast({
                title: res.msg,
                icon: "none"
            })
        }
    },
    toggle(e){
        const { key } = e.currentTarget.dataset
        this.setData({
            [`${key}`]:!this.data[key]
        })
    },
});