<template>
	<div class="home_view">
<div class="projectTitle">欢迎使用 {{projectName}}</div>

		<div class="countList">
			<el-collapse-transition v-if="btnAuth('sheyingzuopin','首页总数')">
				<el-card v-show="countTypeList.closesheyingzuopinCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							摄影作品
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddensheyingzuopinCountType')" class="showIcons"
								:class="countTypeList.hiddensheyingzuopinCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closesheyingzuopinCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddensheyingzuopinCountType">
							<div class="count_title"><span>摄影作品总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="sheyingzuopinCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('sheyingyuyue','首页总数')">
				<el-card v-show="countTypeList.closesheyingyuyueCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							摄影预约
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddensheyingyuyueCountType')" class="showIcons"
								:class="countTypeList.hiddensheyingyuyueCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closesheyingyuyueCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddensheyingyuyueCountType">
							<div class="count_title"><span>摄影预约总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="sheyingyuyueCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('huazhuangyuyue','首页总数')">
				<el-card v-show="countTypeList.closehuazhuangyuyueCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							化妆预约
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddenhuazhuangyuyueCountType')" class="showIcons"
								:class="countTypeList.hiddenhuazhuangyuyueCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closehuazhuangyuyueCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenhuazhuangyuyueCountType">
							<div class="count_title"><span>化妆预约总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="huazhuangyuyueCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('kaojisheying','首页总数')">
				<el-card v-show="countTypeList.closekaojisheyingCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							考级摄影
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddenkaojisheyingCountType')" class="showIcons"
								:class="countTypeList.hiddenkaojisheyingCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closekaojisheyingCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenkaojisheyingCountType">
							<div class="count_title"><span>考级摄影总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="kaojisheyingCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('zhoubianshangcheng','首页总数')">
				<el-card v-show="countTypeList.closezhoubianshangchengCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							周边商城
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddenzhoubianshangchengCountType')" class="showIcons"
								:class="countTypeList.hiddenzhoubianshangchengCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closezhoubianshangchengCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenzhoubianshangchengCountType">
							<div class="count_title"><span>周边商城总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="zhoubianshangchengCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('orders','首页总数')">
				<el-card v-show="countTypeList.closeordersCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							商品订单
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddenordersCountType')" class="showIcons"
								:class="countTypeList.hiddenordersCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closeordersCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenordersCountType">
							<div class="count_title"><span>商品订单总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="ordersCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>

		<div class="chartList">
			<el-collapse-transition v-if="btnAuth('sheyingzuopin','首页统计')">
				<el-card v-show="cardTypeList.closesheyingzuopinChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							摄影作品
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddensheyingzuopinChartType1')" class="showIcons"
									 :class="cardTypeList.hiddensheyingzuopinChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closesheyingzuopinChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddensheyingzuopinChartType1">
							<div class="chart-title"><span>点赞量统计</span></div>
							<div id="sheyingzuopinthumbsupNumberEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('sheyingyuyue','首页统计')">
				<el-card v-show="cardTypeList.closesheyingyuyueChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							摄影预约
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddensheyingyuyueChartType1')" class="showIcons"
									 :class="cardTypeList.hiddensheyingyuyueChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closesheyingyuyueChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddensheyingyuyueChartType1">
							<div class="chart-title"><span>摄影预约统计</span></div>
							<div id="sheyingyuyuesheyingmingchengEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('huazhuangyuyue','首页统计')">
				<el-card v-show="cardTypeList.closehuazhuangyuyueChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							化妆预约
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenhuazhuangyuyueChartType1')" class="showIcons"
									 :class="cardTypeList.hiddenhuazhuangyuyueChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closehuazhuangyuyueChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenhuazhuangyuyueChartType1">
							<div class="chart-title"><span>化妆预约统计</span></div>
							<div id="huazhuangyuyuesheyingleixingEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('kaojisheying','首页统计')">
				<el-card v-show="cardTypeList.closekaojisheyingChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							考级摄影
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenkaojisheyingChartType1')" class="showIcons"
									 :class="cardTypeList.hiddenkaojisheyingChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closekaojisheyingChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenkaojisheyingChartType1">
							<div class="chart-title"><span>考级预约统计</span></div>
							<div id="kaojisheyingdengjiEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('zhoubianshangcheng','首页统计')">
				<el-card v-show="cardTypeList.closezhoubianshangchengChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							周边商城
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenzhoubianshangchengChartType1')" class="showIcons"
									 :class="cardTypeList.hiddenzhoubianshangchengChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closezhoubianshangchengChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenzhoubianshangchengChartType1">
							<div class="chart-title"><span>库存统计</span></div>
							<div id="zhoubianshangchengalllimittimesEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('zhoubianshangcheng','首页统计')">
				<el-card v-show="cardTypeList.closezhoubianshangchengChartType2" class="chart-item">
					<template #header>
						<div class="card_head_title">
							周边商城
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenzhoubianshangchengChartType2')" class="showIcons"
									 :class="cardTypeList.hiddenzhoubianshangchengChartType2?'showIcons2':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closezhoubianshangchengChartType2')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenzhoubianshangchengChartType2">
							<div class="chart-title"><span>分类统计</span></div>
							<div id="zhoubianshangchengshangpinfenleiEchart2" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('orders','首页统计')">
				<el-card v-show="cardTypeList.closeordersChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							商品订单
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenordersChartType1')" class="showIcons"
									 :class="cardTypeList.hiddenordersChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closeordersChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenordersChartType1">
							<div class="chart-title"><span>销量统计</span></div>
							<div id="ordersbuynumberEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('orders','首页统计')">
				<el-card v-show="cardTypeList.closeordersChartType2" class="chart-item">
					<template #header>
						<div class="card_head_title">
							商品订单
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddenordersChartType2')" class="showIcons"
									 :class="cardTypeList.hiddenordersChartType2?'showIcons2':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closeordersChartType2')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenordersChartType2">
							<div class="chart-title"><span>销售额统计</span></div>
							<div id="ordersdiscounttotalEchart2" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>

<div class="row3">

		<div class="home_news">
			<div class="title">新闻资讯</div>
<div class="list">
    <div class="item" v-for="(item,index) in newsList" :key="index"  @click="newsDetailClick(item)">
        <div class="row1">
            <div class="t1">{{item.title}}</div>
            <div class="time">{{moment(item.addtime).format('YYYY-MM-DD')}}</div>
        </div>
        <div class="row2">
            <div>{{item.introduction}}</div>
        </div>
    </div>
</div>
		</div>
		<el-dialog v-model="newsDialog.visible" title="新闻资讯" :append-to-body="true" width="60%" class="home_newsDialog">
			<div class="newsTitle" style="text-align: center;font-size: 20px;padding: 0 0 20px;color:#000;font-weight: bold;">{{newsDialog.detail.title}}</div>
			<div class="newImg" v-if="newsDialog.detail.picture">
				<img :src="newsDialog.detail.imgUrl" style="width:100%;height: 100%;object-fit: cover;max-height: 200px;"/>
			</div>
			<div class="newContent">
				<span v-html="newsDialog.detail.content"></span>
			</div>
		</el-dialog>

</div>

	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance,
		computed,
		onMounted,
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	const moment = window.moment
	const store = useStore()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const user = computed(()=>store.getters['user/session'])
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	const newsList = ref([])
	const newsDialog = ref({
		visible:false,
		detail:{}
	})
	const getNewsList = () => {
		context.$http({
			url: 'news/list',
			method: 'get',
			params: {
				page: 1,
				limit: 4,
				sort: 'id',
				order: 'desc',
			}
		}).then(res => {
			newsList.value = res.data.data.list
			newsList.value.forEach(item => {
				item.imgUrl = context.$config.url + item.picture.split(',')[0]
			})
		})
	}
	const newsDetailClick = (item) => {
		newsDialog.value.detail = item
		newsDialog.value.visible = true
	}
	//获取列表数据
	getNewsList()
	import countTo from '@/components/count-to/vue-countTo.vue';
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closesheyingzuopinCountType = true
		countTypeList.value.hiddensheyingzuopinCountType = true
		if(btnAuth('sheyingzuopin','首页总数')){
			getsheyingzuopinCount()
		}
		countTypeList.value.closesheyingyuyueCountType = true
		countTypeList.value.hiddensheyingyuyueCountType = true
		if(btnAuth('sheyingyuyue','首页总数')){
			getsheyingyuyueCount()
		}
		countTypeList.value.closehuazhuangyuyueCountType = true
		countTypeList.value.hiddenhuazhuangyuyueCountType = true
		if(btnAuth('huazhuangyuyue','首页总数')){
			gethuazhuangyuyueCount()
		}
		countTypeList.value.closekaojisheyingCountType = true
		countTypeList.value.hiddenkaojisheyingCountType = true
		if(btnAuth('kaojisheying','首页总数')){
			getkaojisheyingCount()
		}
		countTypeList.value.closezhoubianshangchengCountType = true
		countTypeList.value.hiddenzhoubianshangchengCountType = true
		if(btnAuth('zhoubianshangcheng','首页总数')){
			getzhoubianshangchengCount()
		}
		countTypeList.value.closeordersCountType = true
		countTypeList.value.hiddenordersCountType = true
		if(btnAuth('orders','首页总数')){
			getordersCount()
		}
	}
	const sheyingzuopinCount = ref(0)
	const getsheyingzuopinCount = () => {
		context?.$http({
			url:'sheyingzuopin/count',
			method: 'get'
		}).then(res=>{
			sheyingzuopinCount.value = res.data.data
		})
	}
	const sheyingyuyueCount = ref(0)
	const getsheyingyuyueCount = () => {
		context?.$http({
			url:'sheyingyuyue/count',
			method: 'get'
		}).then(res=>{
			sheyingyuyueCount.value = res.data.data
		})
	}
	const huazhuangyuyueCount = ref(0)
	const gethuazhuangyuyueCount = () => {
		context?.$http({
			url:'huazhuangyuyue/count',
			method: 'get'
		}).then(res=>{
			huazhuangyuyueCount.value = res.data.data
		})
	}
	const kaojisheyingCount = ref(0)
	const getkaojisheyingCount = () => {
		context?.$http({
			url:'kaojisheying/count',
			method: 'get'
		}).then(res=>{
			kaojisheyingCount.value = res.data.data
		})
	}
	const zhoubianshangchengCount = ref(0)
	const getzhoubianshangchengCount = () => {
		context?.$http({
			url:'zhoubianshangcheng/count',
			method: 'get'
		}).then(res=>{
			zhoubianshangchengCount.value = res.data.data
		})
	}
	const ordersCount = ref(0)
	const getordersCount = () => {
		context?.$http({
			url:'orders/count',
			method: 'get'
		}).then(res=>{
			ordersCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	//获取总数
	getCountList()
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getChartList()
		},1000)
	}
	const cardTypeList = ref({
		closesheyingzuopinChartType1: true,
		hiddensheyingzuopinChartType1: true,
		closesheyingyuyueChartType1: true,
		hiddensheyingyuyueChartType1: true,
		closehuazhuangyuyueChartType1: true,
		hiddenhuazhuangyuyueChartType1: true,
		closekaojisheyingChartType1: true,
		hiddenkaojisheyingChartType1: true,
		closezhoubianshangchengChartType1: true,
		hiddenzhoubianshangchengChartType1: true,
		closezhoubianshangchengChartType2: true,
		hiddenzhoubianshangchengChartType2: true,
		closeordersChartType1: true,
		hiddenordersChartType1: true,
		closeordersChartType2: true,
		hiddenordersChartType2: true,
	})
	//判断是否有统计图筛选权限
	const changeStatQuery = (arr)=>{
		if(!arr){	//不传限制条件，默认都可见
			return true
		}
		let role = localStorage.getItem('role')
		for(let x in arr){
			if(arr[x] == role) {
				return true
			}
		}
		return false
	}
	import '@/assets/js/echarts-theme'
	const getsheyingzuopinChart1 = () => {
		nextTick(async ()=>{
			var thumbsupNumberEchart1 = echarts.init(document.getElementById("sheyingzuopinthumbsupNumberEchart1"),'theme');
			let params = {}
			context?.$http({
				url: `sheyingzuopin/value/sheyingmingcheng/thumbsupNumber?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].sheyingmingcheng);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].sheyingmingcheng				    })
				}
				var option = {};
                option = {
  title:{
    show:false,
    text: '点赞量统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}'
  },
  legend: {
    orient: 'vertical', //vertical/horizontal
    left: 'left',
  },
  series: [
    {
      type: 'funnel',
      data: dataList.slice(0,12), 
      sort: 'ascending', //ascending/descending
      gap: 2,
      label: {
        position: 'inside'
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
    }
  ]
}
				thumbsupNumberEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				thumbsupNumberEchart1.setOption(option);
				//根据窗口的大小变动图表
				thumbsupNumberEchart1.resize();
			})
		})
	}
	const getsheyingyuyueChart1 = () => {
		nextTick(async ()=>{
			var sheyingmingchengEchart1 = echarts.init(document.getElementById("sheyingyuyuesheyingmingchengEchart1"),'theme');
			let params = {}
			if(params.conditionColumn) {
				params.conditionColumn += ';' + 'sfsh'
				params.conditionValue += ';' + '是'
			}else {
				params.conditionColumn = 'sfsh'
				params.conditionValue = '是'
			}
			context?.$http({
				url: "sheyingyuyue/group/sheyingmingcheng?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].sheyingmingcheng);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].sheyingmingcheng				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '摄影预约统计',
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
				sheyingmingchengEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				sheyingmingchengEchart1.setOption(option);
				//根据窗口的大小变动图表
				sheyingmingchengEchart1.resize();
			})
		})
	}
	const gethuazhuangyuyueChart1 = () => {
		nextTick(async ()=>{
			var sheyingleixingEchart1 = echarts.init(document.getElementById("huazhuangyuyuesheyingleixingEchart1"),'theme');
			let params = {}
			if(params.conditionColumn) {
				params.conditionColumn += ';' + 'sfsh'
				params.conditionValue += ';' + '是'
			}else {
				params.conditionColumn = 'sfsh'
				params.conditionValue = '是'
			}
			context?.$http({
				url: "huazhuangyuyue/group/sheyingleixing?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].sheyingleixing);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].sheyingleixing				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '化妆预约统计',
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
				sheyingleixingEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				sheyingleixingEchart1.setOption(option);
				//根据窗口的大小变动图表
				sheyingleixingEchart1.resize();
			})
		})
	}
	const getkaojisheyingChart1 = () => {
		nextTick(async ()=>{
			var dengjiEchart1 = echarts.init(document.getElementById("kaojisheyingdengjiEchart1"),'theme');
			let params = {}
			context?.$http({
				url: "kaojisheying/group/dengji?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].dengji);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].dengji				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '考级预约统计',
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
				dengjiEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				dengjiEchart1.setOption(option);
				//根据窗口的大小变动图表
				dengjiEchart1.resize();
			})
		})
	}
	const getzhoubianshangchengChart1 = () => {
		nextTick(async ()=>{
			var alllimittimesEchart1 = echarts.init(document.getElementById("zhoubianshangchengalllimittimesEchart1"),'theme');
			let params = {}
			context?.$http({
				url: `zhoubianshangcheng/value/shangpinmingcheng/alllimittimes?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].shangpinmingcheng);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].shangpinmingcheng				    })
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
                let middle = option.xAxis
                option.xAxis = option.yAxis
                option.yAxis = middle
				alllimittimesEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				alllimittimesEchart1.setOption(option);
				//根据窗口的大小变动图表
				alllimittimesEchart1.resize();
			})
		})
	}
	const getzhoubianshangchengChart2 = () => {
		nextTick(async ()=>{
			var shangpinfenleiEchart2 = echarts.init(document.getElementById("zhoubianshangchengshangpinfenleiEchart2"),'theme');
			let params = {}
			context?.$http({
				url: "zhoubianshangcheng/group/shangpinfenlei?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].shangpinfenlei);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].shangpinfenlei				    })
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
				shangpinfenleiEchart2.clear()
				// 使用刚指定的配置项和数据显示图表。
				shangpinfenleiEchart2.setOption(option);
				//根据窗口的大小变动图表
				shangpinfenleiEchart2.resize();
			})
		})
	}
	const getordersChart1 = () => {
		nextTick(async ()=>{
			var buynumberEchart1 = echarts.init(document.getElementById("ordersbuynumberEchart1"),'theme');
			let params = {}
			context?.$http({
				url: `orders/value/goodname/buynumber?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].goodname);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].goodname				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '销量统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis,
        type: 'line'
    }
}
				buynumberEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				buynumberEchart1.setOption(option);
				//根据窗口的大小变动图表
				buynumberEchart1.resize();
			})
		})
	}
	const getordersChart2 = () => {
		nextTick(async ()=>{
			var discounttotalEchart2 = echarts.init(document.getElementById("ordersdiscounttotalEchart2"),'theme');
			let params = {}
			context?.$http({
				url: `orders/value/goodname/discounttotal?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].goodname);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].goodname				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '销售额统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis,
        type: 'line'
    }
}
				discounttotalEchart2.clear()
				// 使用刚指定的配置项和数据显示图表。
				discounttotalEchart2.setOption(option);
				//根据窗口的大小变动图表
				discounttotalEchart2.resize();
			})
		})
	}
	const getChartList = () => {
		if(btnAuth('sheyingzuopin','首页统计')){
			getsheyingzuopinChart1()
		}
		if(btnAuth('sheyingyuyue','首页统计')){
			getsheyingyuyueChart1()
		}
		if(btnAuth('huazhuangyuyue','首页统计')){
			gethuazhuangyuyueChart1()
		}
		if(btnAuth('kaojisheying','首页统计')){
			getkaojisheyingChart1()
		}
		if(btnAuth('zhoubianshangcheng','首页统计')){
			getzhoubianshangchengChart1()
		}
		if(btnAuth('zhoubianshangcheng','首页统计')){
			getzhoubianshangchengChart2()
		}
		if(btnAuth('orders','首页统计')){
			getordersChart1()
		}
		if(btnAuth('orders','首页统计')){
			getordersChart2()
		}
	}
	//获取统计图数据
	getChartList()
</script>
<style lang="scss" scoped>
	// 首页盒子
	.home_view {
        background-image: url("http://localhost:8080/sportsPhotography/file/efa8c4527e0d4b5fa31b9fa123463b16.webp")!important;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
</style>
<style>
.condition-box {
	display: flex;
	gap: 10px;
	justify-content: center;
}

.condition-box>* {
	max-width: 300px;
}
.home_view {
    padding: 30px;
    background: #fafafa !important;
}
/* 轮播图 */
.home_view .el-carousel{
    width: 100%;
    display: block;
    margin: 0 0 30px !important;
}
.home_view .el-carousel .el-carousel__container{
    height: 300px !important;
}
.home_view .el-carousel .el-carousel__container .el-carousel__item img{
    border-radius: 10px;
}

.home_view .projectTitle{
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.home_view .countList {
    width: calc(100% + 20px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 0 30px -10px;
}
.home_view .count-item {
    min-width: calc(25% - 20px);
    margin: 0 10px 20px;
    position: relative;
    border-radius: 10px;
    border:none;
    box-shadow:none;
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-width: 0px;
    border-style: solid;
    border-color: #eee;
    padding: 0 0 0 60px;
}

.home_view .el-card__header {
    display: none;
}

.home_view .count_title {
    color: #999;
}

.home_view .count_num {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.5;
}

.home_view .count-item:before {
    content:'';
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-size:100% 100%;
    border-radius: 100%;
    padding: 0px;
    position: absolute;
    top: 30px;
    left: 20px;
    background-image: url(http://localhost:8080/sportsPhotography/file/ad45bfcb13364fa7b8da737057b37544.png);
}
.home_view .count-item:nth-child(4n+1):before{
    background: url(http://localhost:8080/sportsPhotography/file/c58bf847dba74e2692dd45f605836e09.png) no-repeat center center,#3472fe20;
}
.home_view .count-item:nth-child(4n+2):before{
    background: url(http://localhost:8080/sportsPhotography/file/7732734e8d8a45a3b8d380c38187f23f.png) no-repeat center center,#16a34a20;
}
.home_view .count-item:nth-child(4n+3):before{
    background: url(http://localhost:8080/sportsPhotography/file/5935e19d1b03400fafb4daa0576783fe.png) no-repeat center center / 30px,#9333ea20;
}
.home_view .count-item:nth-child(4n+4):before{
    background: url(http://localhost:8080/sportsPhotography/file/0c8f3adab0c842558afe60438f413933.png) no-repeat center center / 28px,#ea580c20;
}
.home_view .count-item:nth-child(4n+5):before{
    background: url(http://localhost:8080/sportsPhotography/file/45b59adbdd3d44caac61b8e449e7cd5d.png) no-repeat center center,#dc262620;
}
.home_view .count-item:nth-child(4n+6):before{
    background: url(http://localhost:8080/sportsPhotography/file/a802cc2af24d41278511ea6b6e94fefc.png) no-repeat center center,#ca8a0420;
}

.home_view {
    padding: 30px;
    background: #fef7db;
}

.home_view .chartList {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin:0px;
}

.home_view .chartList .chart-item {
    flex: 1;
    min-width: 40%;
    background:#fff;
    border-radius: 10px;
    border: none !important;
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.05) !important;
}
.home_view .chartList .chart-item .chart-title{
     font-size: 18px;
     color: #333;
     font-weight:500;
     margin-bottom: 10px;
}

.home_view .row3 {
    display: flex;
    margin-top: 30px;
    gap: 30px;
}
.home_view .el-carousel img {
    object-fit: cover;
}

.home_view .el-carousel {
    margin-bottom: 20px;
}

.home_newsDialog .newImg{
    text-align: center;
}
.home_newsDialog .newImg img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: auto;
}

/* 后台首页新闻详情图片*/
.home_newsDialog .newImg{
    width: 100%;
    text-align: center;
    margin: 0 0 5px;
}
.home_newsDialog .newImg img{
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
    max-height: 400px !important;
    max-width: 100%;
}
.home-calendar{
    border: 0px solid #ddd;
    margin: 0px auto 0px;
    width: 48%;
    min-width: 480px;
    height: auto;
    background: #fff;
    border-radius: 10px;
    padding:20px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
    flex:1;
    order:2;
}
.home-calendar .header{
    width: 100%;
    height: auto;
    background: none;
    padding: 5px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 6px;
    border-width: 0px 0px 0px;
    border-style: solid;
    border-color: rgba(126, 96, 16, 0.1);
}
.home-calendar .header .btn{
  cursor: pointer;
  border: 0px solid rgb(153, 153, 153);
  padding: 0px 0px 0px 12px;
  align-items: center;
  color: rgb(102, 102, 102);
  border-radius: 4px;
  display: flex;
  width: auto;
  font-size: inherit;
  justify-content: center;
  order: 2;
}
.home-calendar .header .title{
  padding: 0px 10px;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgb(51, 51, 51);
}
.home-calendar table{
  width: 100%;
  padding: 0px 0px 0px;
  height: auto;
  background: #fff;
}
.home-calendar tbody,.home-calendar thead{
  width: 100%;
}
.home-calendar tr{
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
.home-calendar th{
  align-items: center;
  flex: 1;
  display: flex;
  line-height: 60px;
  justify-content: center;
}
.home-calendar td{
  cursor: pointer;
  padding:16px 12px 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
}

.home-calendar .header .btn.lastYear,.home-calendar .header .btn.nextYear {
    display: none;
}

.home-calendar .btn.lastMonth {
    margin-left: auto;
}

.home-calendar:before {
    content: '系统日历';
    font-size: 20px;
    color: #333;
    line-height: 60px;
    display: none;
}

.home-calendar .header .btn .text {
    display: none;
}

.home-calendar .lastMonth .iconfont {
    transform: rotate(180deg);
}

.home-calendar .iconfont {
    font-size: 16px;
    background: none;
    border-radius: 50%;
}
/*节日*/
.home-calendar td.festival{
  padding: 10px 5px;
  background: var(--theme50);
  border-radius:6px;
}
.home-calendar td.festival .text .old{
    white-space: nowrap;
}
/*今天*/
.home-calendar table td.today{
    padding: 10px 5px;
    background:var(--theme);
    color: #fff;
    border-radius: 6px;
}

.home_news {
    width: 48%;  
    padding: 20px 30px 10px;
    background: #fff;
    border-radius: 10px;
    height:auto;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
    flex:1;
}

.home_news .title {
    font-size: 18px;
    color: #333;
    line-height: 1.5;
    font-weight: 600;
}

.home_news .list {
    width: 100%;
    margin: 10px 0 0;
}

.home_news .list .el-carousel{
    width: 100%;
}
.home_news .list .el-carousel .el-carousel__container{
    height: 320px !important;
}
.home_news .list .el-carousel .el-carousel__container .el-carousel__item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.home_news .item {
    width: 100%;
    background: none;
    border-radius: 0px;
    border-bottom: 1px solid #eee;
    padding: 0 0 10px;
    margin-bottom: 10px;
}
.home_news .item:hover {
    cursor: pointer;
}

.home_news .row1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.home_news .t1 {
    width: 100%;
    font-size: 16px;
}

.home_news .time {
    font-size: 14px;
    color: #999;
    white-space: nowrap;
}

.home_news .row2 {
    width: 100%;
    color: #666;
    margin-top: 10px;
    display: block;
}

</style>