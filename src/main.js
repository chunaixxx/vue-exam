import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://django-exam.std-1288.ist.mospolytech.ru/'

new Vue({
	router,
	store,
	vuetify,
	render: function (h) {
		return h(App)
	},
}).$mount('#app')
