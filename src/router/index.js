import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/index.vue'
import Register from '../components/Register/index.vue'
import home from '../components/Home路由组件_静态/Home/index.vue'
import TypeNav from '../components/Home路由组件_静态/TypeNav/index.vue'
import ShopCart from '../components/ShopCart组件_静态/ShopCart/index.vue'
import Center from '../components/订单与支付相关组件_静态/Center/index.vue'
import Detail from '../components/Detail路由组件_静态/Detail/index.vue'
import Search from '../components/Search路由组件_静态/search/index.vue'
import AddCartSuccess from '../components/添加到购物车成功_静态/AddCartSuccess/index.vue'
import Trade from '../components/订单与支付相关组件_静态/Trade/index.vue'
import pay from '../components/订单与支付相关组件_静态/Pay/index.vue'
import paysuccess from '../components/订单与支付相关组件_静态/PaySuccess/index.vue'
Vue.use(VueRouter)
Vue.component('TypeNav', TypeNav) //注册全局组件
const routes = [{
	// 注册页路由
	path: '/',
	redirect: '/home'
}, {
	// 登录页
	path: '/Login',
	component: Login
}, {
	// 注册页路由
	path: '/Register',
	component: Register
}, {
	// 购物车
	path: '/ShopCart',
	component: ShopCart
}, {
	// 订单
	path: '/Center',
	component: Center,
	beforeEvent:(to,from,next)=>{
		if(sessionStorage.getItem('token')){
			next()
		}else{
			next('/')
		}
	}
}, {
	// 搜索页
	path: '/Search/:keyword',
	name:'Search',
	component: Search
}, {
	path: '/home',
	component: home
}, {
	// 商品详情页
	path: '/Detail/:id',
	name:'Detail',
	component: Detail
}, {
	// 添加商品页
	path: '/AddCartSuccess/:skuId/:skuNum',
	component: AddCartSuccess
}, {
	// 结算页
	path: '/Trade',
	component: Trade
}, {
	// 支付页
	path: '/pay/:orderId',
	component: pay
}, {
	// 支付结果页
	path: '/paysuccess/:orderId',
	component: paysuccess
}]

const router = new VueRouter({
	routes
})

export default router
