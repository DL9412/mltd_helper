import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import common from "./common"
import F2 from '@antv/f2';


import { Toast } from 'vant';
Vue.use(Toast);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$comm = common;
Vue.prototype.$F2 = F2;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
