import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun'

// axios.interceptors.request.use((res) => {
//     // res.headers.Authorization = window.sessionStorage.getItem('token')
//     var end = res.data
//     return end
// });

//创建为全局文件,将$axios封装为axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

export default axios;
