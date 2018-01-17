import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Components/Main/Home.vue'
import Orders from './Components/Main/Orders.vue'
import Collection from './Components/Main/Collection.vue'
import Addboot from './Components/Main/Addboot.vue'
import Header from './Components/Header.vue'
import Register from './Components/Main/Register.vue'
import RegisterComplete from './Components/Main/RegisterComplete.vue'
import Checkout from './Components/Main/Checkout.vue'
import OrderComplete from './Components/Main/OrderComplete.vue'
import VueResource from 'vue-resource'
import Dropdown from 'vue-js-dropdown'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

window.endpoint = 'https://orders-microservice.cfapps.io';
window.moment = require('moment');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.options.xhr = { withCredentials : true };


Vue.use(Dropdown)

Vue.component('app-collection', Collection)
Vue.component('app-header', Header)
Vue.component('app-register', Register)
Vue.component('app-registerComplete', RegisterComplete)
Vue.component('app-checkout', Checkout)
Vue.component('app-addboot', Addboot)
Vue.component('app-orderComplete', OrderComplete)
Vue.component('app-orders', Orders)

Vue.use(VueRouter)

const routes = [
  { name: 'collection' , path: '/collection', component: Collection },
  { path: '/register', component: Register },
  { name: 'registerComplete' ,path: '/registerComplete', component: RegisterComplete},
  { path: '/checkout', component: Checkout },
  { path: '/addboot', component: Addboot },
  { name: 'order-complete' , path: '/order-complete/:id', component: OrderComplete },
  { path: '/orders', component: Orders },
  { name: 'home' , path: '/', component: Home }
]

const router = new VueRouter ({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use(VueResource)

