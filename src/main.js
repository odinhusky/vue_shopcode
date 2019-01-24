// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
// import VeeValidate, { Validator } from 'vee-validate';
import zh_feedback from 'vee-validate/dist/locale/zh_TW';


import App from './App';
import router from './router';
import './bus';
import Cfilter from './filters/currency';
import dateFilter from './filters/dateFilter';



Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
// 開啟cookies的存取
axios.defaults.withCredentials = true;
// 全域啟用Vue Loading
Vue.component('Loading', Loading);
// 啟用filter
Vue.filter('currency', Cfilter);
Vue.filter('date', dateFilter);
// 啟用驗證
Vue.use(VeeValidate, {
  events: 'input|blur',
});
// 載入語系檔
VeeValidate.Validator.localize('zh_TW',zh_feedback);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

router.beforeEach((to, from, next) => {
  console.log('to=');
  console.log(to);
  console.log('from=');
  console.log(from);
  console.log('next=');
  console.log(next);
  if(to.meta.requiresAuth){
    // console.log('這裡需要判斷是否登入');
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success == true){
        next();
      }else{
        next({
          path: '/login'
        });
      }
    });
  }else{
    next();
  }
  
})


