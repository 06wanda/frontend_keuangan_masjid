import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import router from './routes/router';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(DashboardPlugin);

// Langsung buat app aja
new Vue({
  el: '#app',
  render: h => h(App),
  router
});
