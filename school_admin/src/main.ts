import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.getUserInfo=()=>{
    var userinfo=sessionStorage.getItem('userInfo');
    if(userinfo&&userinfo!='{}'){
      return JSON.parse(userinfo);
    }else {
      return {}
    }
};
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
