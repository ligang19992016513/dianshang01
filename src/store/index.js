import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginPhone: sessionStorage.getItem('uname'),
		loginToken: sessionStorage.getItem('token')
	},
	getters: {},
	mutations: {
		changData(state, res) {
			console.log(state.loginToken)
			state.loginPhone = res
			sessionStorage.setItem('uname', state.loginPhone)
		},
	},
	actions: {},
	modules: {}
})
