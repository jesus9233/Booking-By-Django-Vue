import { toString } from 'datejs';
import api from '../api';

const actions = {
	async getTableList ({commit}) {
		commit('updateTables', await api.getTables());
	},

	async getReservedNumbers ({state, commit}) {
		commit('clearSelectedNumbers'); // Clear selected numbers list
		commit(
			'updateReservedNumbers',
			await api.getReserved(state.selected_date)
		);
	},

	changeDate ({commit, dispatch}, date) {
		commit('updateSelectedDate', date);

		// Reload reserved numbers
		dispatch('getReservedNumbers');
	},

	makeOrder ({state, dispatch, commit}) {
		return new Promise((resolve, reject) => {
			api.createOrder(
				state.selected_numbers,
				state.selected_date
			).then(() => {
				dispatch('getReservedNumbers');

				// Finish the execution of the current promice
				resolve();
			})
		})
	},

	initStorage ({dispatch}) {
		// Basic actions for creating a normal state
		dispatch('getTableList');
		dispatch('changeDate', (new Date()).toString('yyyy-MM-dd'));
	}
}

export default actions;
