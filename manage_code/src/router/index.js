import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import login from '@/views/login.vue'
import index from '@/views/index.vue'
import HomeView from '@/views/HomeView.vue'
export const routes = [{
		path: '/login',
		name: 'login',
        meta: { title: '登录' },
		component: login
	},{
		path: '/',
		name: '首页',
        meta: { title: '首页' },
		component: index,
		children: [{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				affix: true,
                title: '首页'
			}
		}, {
			path: '/updatepassword',
			name: 'updatepassword',
            meta: { title: '修改密码' },
			component: () => import('../views/updatepassword.vue')
		}

		,{
			path: '/usersCenter',
			name: 'usersCenter',
            meta: { title: '管理员个人中心' },
			component: ()=>import('@/views/users/center')
		}
		,{
			path: '/sheyingyuyue',
			name: 'sheyingyuyue',
            meta: { title: '摄影预约' },
			component: ()=>import('@/views/sheyingyuyue/list')
		}
		,{
			path: '/news',
			name: 'news',
            meta: { title: '新闻资讯' },
			component: ()=>import('@/views/news/list')
		}
		,{
			path: '/biaoqian',
			name: 'biaoqian',
            meta: { title: '标签' },
			component: ()=>import('@/views/biaoqian/list')
		}
		,{
			path: '/kaojisheyingyuyue',
			name: 'kaojisheyingyuyue',
            meta: { title: '考级摄影预约' },
			component: ()=>import('@/views/kaojisheyingyuyue/list')
		}
		,{
			path: '/address',
			name: 'address',
            meta: { title: '地址' },
			component: ()=>import('@/views/address/list')
		}
		,{
			path: '/discusszhoubianshangcheng',
			name: 'discusszhoubianshangcheng',
            meta: { title: '周边商城评论-评论' },
			component: ()=>import('@/views/discusszhoubianshangcheng/list')
		}
		,{
			path: '/sheyingleixing',
			name: 'sheyingleixing',
            meta: { title: '摄影类型' },
			component: ()=>import('@/views/sheyingleixing/list')
		}
		,{
			path: '/zhoubianshangcheng',
			name: 'zhoubianshangcheng',
            meta: { title: '周边商城' },
			component: ()=>import('@/views/zhoubianshangcheng/list')
		}
		,{
			path: '/discusssheyingzuopin',
			name: 'discusssheyingzuopin',
            meta: { title: '摄影作品评论-评论' },
			component: ()=>import('@/views/discusssheyingzuopin/list')
		}
		,{
			path: '/syslog',
			name: 'syslog',
            meta: { title: '操作日志' },
			component: ()=>import('@/views/syslog/list')
		}
		,{
			path: '/storeup',
			name: 'storeup',
            meta: { title: '我的收藏' },
			component: ()=>import('@/views/storeup/list')
		}
		,{
			path: '/huazhuangyuyue',
			name: 'huazhuangyuyue',
            meta: { title: '化妆预约' },
			component: ()=>import('@/views/huazhuangyuyue/list')
		}
		,{
			path: '/users',
			name: 'users',
            meta: { title: '管理员' },
			component: ()=>import('@/views/users/list')
		}
		,{
			path: '/rechargeRecord',
			name: 'rechargeRecord',
            meta: { title: '充值记录' },
			component: ()=>import('@/views/rechargeRecord/list')
		}
		,{
			path: '/systemintro',
			name: 'systemintro',
            meta: { title: '网站介绍' },
			component: ()=>import('@/views/systemintro/list')
		}
		,{
			path: '/chathelper',
			name: 'chathelper',
            meta: { title: '聊天助手' },
			component: ()=>import('@/views/chathelper/list')
		}
		,{
			path: '/chat',
			name: 'chat',
            meta: { title: '客服聊天' },
			component: ()=>import('@/views/chat/list')
		}
		,{
			path: '/yonghu',
			name: 'yonghu',
            meta: { title: '用户' },
			component: ()=>import('@/views/yonghu/list')
		}
		,{
			path: '/shangpinfenlei',
			name: 'shangpinfenlei',
            meta: { title: '商品分类' },
			component: ()=>import('@/views/shangpinfenlei/list')
		}
		,{
			path: '/orders',
			name: 'orders',
            meta: { title: '订单管理' },
			component: ()=>import('@/views/orders/list')
		}
		,{
			path: '/sheyingzuopin',
			name: 'sheyingzuopin',
            meta: { title: '摄影作品' },
			component: ()=>import('@/views/sheyingzuopin/list')
		}
		,{
			path: '/kaojisheying',
			name: 'kaojisheying',
            meta: { title: '考级摄影' },
			component: ()=>import('@/views/kaojisheying/list')
		}
		,{
			path: '/config',
			name: 'config',
            meta: { title: '轮播图' },
			component: ()=>import('@/views/config/list')
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
