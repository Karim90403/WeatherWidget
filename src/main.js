import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueGeolocationApi from 'vue-geolocation-api'
import 'document-register-element/build/document-register-element'

import './assets/styles/main.css'
import VueCustomElement from 'vue-custom-element';
 
Vue.use(VueCustomElement)
Vue.use(VueGeolocationApi)
Vue.customElement('vue-widget', App)
// new Vue({
//     render: h => h(App)
// })
// .$mount("#app")


