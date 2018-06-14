import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		tables:[],
		reserved_numbers: [],
		selected_numbers: [],
		selected_date: ''
	},
	getters: {
		tables: state => state.tables,
		reserved_numbers: (state) => state.reserved_numbers,
		selected_numbers: state => state.selected_numbers.sort(),
		selected_numbers_length: state => state.selected_numbers.length,
		selected_date: state => state.selected_date
	},
	mutations,
	actions
});

export default store;
