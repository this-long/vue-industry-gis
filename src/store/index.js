import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: "zh_cn",
    newCoordinate: [],
    instryType: 'one'
  },
  mutations: {
    langChange(state, lang) {
      state.lang = lang
    },
    getCoordinate(state, newCoordinate) {
      // 拾取遗产坐标
      state.newCoordinate = newCoordinate
    },
    changeinstryType(state, type) {
      state.instryType = type
    }
  },
  actions: {
  },
  modules: {
  }
})
