import axios from 'axios'

const TABLES_URL = 'http://127.0.0.1:8000/tables/'
const RESERVED_NUMBERS_URL = `http://127.0.0.1:8000/tables/reserved_numbers`
const ORDERS_URL = 'http://127.0.0.1:8000/orders/'

const api = {
	getTables () {
		/* 
			Gets table list from the backend server 
		*/
		return axios.get(TABLES_URL).then((response) => {
				let result = response.data
				console.log(`Table list: SUCCESS. ${response.status}`)
				
				return result
			}).catch(error => {
				console.log(`Table list: FAILED. ${error}`)
			})
	},
	getReserved (date) {
		/* 
			Gets the numbers of reserved tables 
		    for a certain date from the backend server 
		*/
		return axios.post(RESERVED_NUMBERS_URL,{date: date}).then(response => {
				const result = response.data.reserved_numbers
				console.log(`Reserved numbers: SUCCESS. ${response.status}`)
				return result
			}).catch(error => {
				console.log(`Reserved numbers: FAILED. ${error}`)
			})

	},
	createOrder (selected_numbers, date) {
		/*
			Creates an orders on a selected date for 
			each table, which number in the selected numbers list  
		*/
		
		return new Promise((resolve, reject) => {
			let promices = []

			selected_numbers.forEach((table) => {
				/*
					Forms the list of promices 
					that are executed asynchronously
				*/
				let promice = axios.post(ORDERS_URL, {
					table: table,
					date: date,
				})
				promices.push(promice)
			})

			//Waiting for the completion of the 'promices' list
			Promise.all(promices).then(response => {
					console.log(`Order: SUCCESS`)

					// Finish the execution of the current promice
					resolve()
				}).catch(error => {
					console.log(`Order: FAILED`)
				})
		})
		
	}
}

export default api