import axios from 'axios'
import router from '../router/index'
import toolUtil from '@/utils/toolUtil'
import config from '@/utils/config'

const http = axios.create({
    timeout: 1000 * 86400,
    withCredentials: true,
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
// 请求拦截
http.interceptors.request.use(config => {
    config.headers['Token'] = toolUtil.storageGet('Token') // 请求头带上token
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(response => {
    if (response.data && response.data.code == 401) { // 401, token失效
		toolUtil.storageClear()
		ElMessage.error({
            message:response.data.msg,
            grouping:true,
            repeatNum:-99,
        })
        router.push('/login')
		return Promise.reject(response)
    }
	else if(response.data && response.data.code == 0){
		return response
	}else{
        if(!response.config.noErrorTip){
            ElMessage.error({
                message:response.data.msg,
                grouping:true,
                repeatNum:-99,
            })
        }
		return Promise.reject(response)
	}
    
}, error => {
    return Promise.reject(error)
})
http.defaults.paramsSerializer = {
    serialize: (params) => {
        //执行axios默认的URLSearchParams序列化（保留所有原生逻辑）
        const defaultStr = new URLSearchParams(params).toString();
        //仅对[]做全局替换编码，其他字符完全不变
        const finalStr = defaultStr
            .replace(/\[/g, '%5B')  // 全局替换[为%5B
            .replace(/\]/g, '%5D'); // 全局替换]为%5D
        return finalStr;
    }
}
export default http