import Vue from 'vue'
import 'reset-css'//清除默认样式
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import 'echarts'
import ECharts from 'vue-echarts'


Vue.component('ECharts', ECharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
