import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'
import store from  './model'

import {
  Button,
  Toast,
  MessageBox,
} from 'mint-ui'

//引入接口对象用于vue的实例全局调用
import * as API  from './api'
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component(Button.name , Button)
Vue.component(Toast.name, Toast)
Vue.component(MessageBox.name, MessageBox)

new Vue({
  render: h => h(App),
  components:{
    App,
  },
  router,
  store
}).$mount('#app')

// new Vue({
//   el: '#app',
//   components: {App},
//   template: '<App />',
//   router,
// })
