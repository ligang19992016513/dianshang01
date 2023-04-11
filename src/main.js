import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axios插件
import axios from 'axios'
// 设置axios的响应拦截器，处理数据
axios.interceptors.response.use(res => {
	return res.data
})
Vue.config.productionTip = false
// 将axios对象挂载到Vue实例原型对象
Vue.prototype.$http = axios
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
