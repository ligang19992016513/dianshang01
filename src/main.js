import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axios插件
import axios from 'axios'
// 导入公共样式
import './assets/css/reset.css'
// 设置axios的响应拦截器，处理数据
axios.interceptors.response.use(res => {
	return res.data
})
// axios设置请求拦截器：在发起请求前就会进入拦截器request
axios.interceptors.request.use(config => {
	// 获取token
	var tokenStr = sessionStorage.getItem('token')
	// 设置请求头
	config.headers.token = tokenStr
	config.headers.userTempId = ''
	return config
}, err => {
	console.log(err)
})
Vue.config.productionTip = false
// 将axios对象挂载到Vue实例原型对象
Vue.prototype.$http = axios
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
