import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: "zh_cn"
  },
  mutations: {
    langChange(state, lang) {
      // if (state.lang === "zh_cn") {
      //   state.lang = "zh_en"
      // } else {
      //   state.lang = "zh_cn"
      // }
      state.lang = lang
    }
  },
  actions: {
  },
  modules: {
  }
})
