import Vue from 'vue'
import Vuex from 'vuex'
import Todos from './Todos.js'
import Categories from './Categories.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
	Todos, Categories
  }
})

