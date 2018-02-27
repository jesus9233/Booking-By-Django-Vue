import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/main.scss'
import store from './store'
import { mapActions } from 'vuex'


// Components
import TableSelect from './components/tableselect/TableSelect.vue'
import DateInput from './components/dateinput/DateInput.vue'
import Booking from './components/booking/Booking.vue'
import Success from './components/success/Success.vue'


Vue.use(BootstrapVue)
Vue.use(VueRouter)


const router = new VueRouter({
	routes: [
		{
			path: '', 
			name: 'date-select',
			component: DateInput
		},
		{
			path: '/table-select', 
			name: 'table-select',
			component: TableSelect
		},
		{
			path: '/booking', 
			name: 'booking',
			component: Booking,
		},
		{
			path: '/success', 
			name: 'success',
			component: Success
		},
	]
})


new Vue({
	el: '#app',
	store,
	router,
	methods: {
		...mapActions([
			'initStorage'
			]),
	},
	created () {
		this.initStorage()
	}
})
