import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: "zh_cn",
    newCoordinate: [],//遗产添加经纬度记录
    instryType: 'one',//记录当前操作的遗产类型
    applyCoordinate: [],//遗产申报经纬度记录
    CoordinateType: 'add'//当前坐标拾取对应的值

  },
  mutations: {
    langChange(state, lang) {
      state.lang = lang
    },
    getCoordinate(state, newCoordinate) {
      // 拾取遗产坐标
      state.newCoordinate = newCoordinate
    },
    getapplyCoordinate(state, newCoordinate) {
      // 拾取遗产坐标
      state.applyCoordinate = newCoordinate
    },
    changeinstryType(state, type) {
      state.instryType = type
    },

    changeCoordinateType(state, type) {
      state.CoordinateType = type
    }
  },
  actions: {
  },
  modules: {
  }
})
