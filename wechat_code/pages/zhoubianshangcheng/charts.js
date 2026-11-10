import * as echarts from '../../component/ec-canvas/echarts';
const http = require("../../api/http.js")
const utils = require("../../utils/index.js")
Page({
    data: {
        user: {},
        nowTable:'',
        centerType:false,
        auth:{  //权限
            front:{},
            back:{}
        },
        ec: {
            lazyLoad: true,
        },
        activeIndex:-1,
    },
    onLoad(options) {
        this.setData({
            centerType:!!options.centerType
        })
        const user = wx.getStorageSync("userSession");
        this.setData({
            user,
            nowTable:wx.getStorageSync('nowTable')
        })
        this.getAuth()
    },
    onShow() {
        //取第一个有权限的图表渲染
        if(this.data.centerType){
            const keys = Object.keys(this.data.auth.back)
            for(let i in keys){
                let key = keys[i]
                if(this.data.auth.back[key]){
                    this.setData({
                        activeIndex:+i+1
                    })
                    break
                }
            }
        }else{
            const keys = Object.keys(this.data.auth.front)
            for(let i in keys){
                let key = keys[i]
                if(this.data.auth.front[key]){
                    this.setData({
                        activeIndex:+i+1
                    })
                    break
                }
            }
        }
        setTimeout(()=>{
            this.changeActiveIndex({target:{dataset:{index:this.data.activeIndex}}})
        },500)
    },
    getAuth(){
        let auth = {
            front:{
                '库存统计':utils.isAuthFront('zhoubianshangcheng', '库存统计'),
                '分类统计':utils.isAuthFront('zhoubianshangcheng', '分类统计'),
            },
            back:{
                '库存统计':utils.isAuth('zhoubianshangcheng', '库存统计'),
                '分类统计':utils.isAuth('zhoubianshangcheng', '分类统计'),
            }
        }
        this.setData({
            auth
        })
    },
    changeActiveIndex(e){
        this.setData({
            activeIndex:e.target.dataset.index
        })
        let ecComponent = this.selectComponent('#mychart')
        ecComponent.init(this[`initChart${this.data.activeIndex}`])
    },
    optionsChange(e){
        this.setData({
            [`${e.target.dataset.key}OptionsIndex${e.target.dataset.index}`]:+e.detail.value,
            [`chartQuery${e.target.dataset.index}.${e.target.dataset.key}`]:this.data.biaotichartOptions4[+e.detail.value]
        })
        this.changeActiveIndex(e)
    },
    // 统计图1
    initChart1(canvas, width, height, dpr){
        wx.nextTick(async ()=>{
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
            });
            canvas.setChart(chart);
            let params = {}
            http.get(
                `/zhoubianshangcheng/value/shangpinmingcheng/alllimittimes?order=desc`,
                {data:params}
            ).then(res=>{
                let obj = res.data
                let xAxis = [];
                let yAxis = [];
                let dataList = []
                for(let i=0;i<obj.length;i++){
                    xAxis.push(obj[i].shangpinmingcheng);
                    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
                        value: parseFloat((obj[i].total)),
                        name: obj[i].shangpinmingcheng                    })
                }
                var option = {};
                option = {
    title: {
        show:false,
        text: '库存统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    dataZoom: [{
        type: 'inside'  // 允许缩放
    }],
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0, //强制显示X轴所有名称
        "rotate": 30
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis,
        type: 'bar',
        colorBy:'data',
        barMaxWidth: 40 // 只限制最大宽度
    }
}
                var middle = option.xAxis
                option.xAxis = option.yAxis
                option.yAxis = middle
                chart.setOption(option);
                return chart;
            })
        })
    },
    // 统计图2
    initChart2(canvas, width, height, dpr){
        wx.nextTick(async ()=>{
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
            });
            canvas.setChart(chart);
            let params = {}
            http.get(
                `/zhoubianshangcheng/group/shangpinfenlei?order=desc`,
                {data:params}
            ).then(res=>{
                let obj = res.data
                let xAxis = [];
                let yAxis = [];
                let dataList = []
                for(let i=0;i<obj.length;i++){
                    xAxis.push(obj[i].shangpinfenlei);
                    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
                        value: parseFloat((obj[i].total)),
                        name: obj[i].shangpinfenlei                    })
                }
                var option = {};
                option = {
    title: {
        show:false,
        text: '分类统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    dataZoom: [{
        type: 'inside'  // 允许缩放
    }],
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0, //强制显示X轴所有名称
        "rotate": 30
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis,
        type: 'bar',
        colorBy:'data',
        barMaxWidth: 40 // 只限制最大宽度
    }
}
                // 添加极坐标系
                option.polar = {}
                //用极坐标系下的角度轴代替横坐标，移除横坐标
                option.radiusAxis = option.xAxis
                option.radiusAxis.axisLabel = {show:false}  //极坐标下x轴刻度可能会被柱体挡住，需隐藏
                delete option.xAxis
                //用极坐标系下的径向轴代替纵坐标，移除纵坐标
                option.angleAxis = option.yAxis
                delete option.yAxis
                // 系列数据都使用极坐标系统
                if(Array.isArray(option.series)){
                    option.series.forEach(item=>item.coordinateSystem = 'polar')
                }else{
                    option.series.coordinateSystem = 'polar'
                }
                chart.setOption(option);
                return chart;
            })
        })
    },
})