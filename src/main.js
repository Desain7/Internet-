import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icons/iconfont.css'
import router from './router'
import store from './store'
import SIdentify from '@/components/SIdentify'
Vue.use(ElementUI);
Vue.use(SIdentify);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
