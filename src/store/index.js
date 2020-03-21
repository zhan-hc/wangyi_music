import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CategoryStatus: false
  },
  mutations: {
    showCategory (state) {
      state.CategoryStatus = true
    },
    hideCategory (state) {
      state.CategoryStatus = false
    }
  }
})
