import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VuePartivles from 'vue-particles';
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/utils/request";

// import VueParticles from 'vue-particles'
// Vue.use(VueParticles)

Vue.config.productionTip = false
//Vue.use(ElementUI,option{size:"mini"});设置空间大小
Vue.use(ElementUI);
Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
