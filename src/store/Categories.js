import axios from 'axios'
import Vue from 'vue'


const Categories = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
		page: 1
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},

		setPage(state, page) {
			state.setPage = page
		},
	},

	actions: {
		async fetchCategories({ commit, state }, payload) {
			try {
				const { orderingQuery } = payload

				const res = await axios(
					`/api/category${orderingQuery ? '?ordering=' + orderingQuery : ''}`
				)

				commit('setActiveItems', res.data)
				commit('setCountOfActiveItems', res.data.length)
			} catch (e) {
				console.log(e)
			}
		},

		async addCategory({ commit, state }, payload) {
			try {
				const res = await axios.post(
					`/api/category/`,
					{
						...payload
					}
				)

				console.log(res)
			} catch (e) {
				console.log(e)
			}
		}
	},

	getters: {
		getActiveItems: state => page => {
			return state.activeItems.slice((page - 1) * 5, page * 5)
		},
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Categories
