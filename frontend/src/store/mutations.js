const mutations = {
	updateTables (state, result) {
		state.tables = result
	},
	updateReservedNumbers (state, result) {
		state.reserved_numbers = result
	},
	updateSelectedNumbers (state, number) {
	/*
		Add a number to the list if it's not there 
		or delete it if it's there
	*/
		const index = state.selected_numbers.indexOf(number)
		if (index == -1)
			state.selected_numbers.push(number)
		else
			state.selected_numbers.splice(index, 1)
	},
	clearSelectedNumbers (state) {
		state.selected_numbers = []
	},
	updateSelectedDate (state, date) {
		state.selected_date = date
	}
}

export default mutations;