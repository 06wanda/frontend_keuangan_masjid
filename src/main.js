import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import router from './routes/router';
import axios from 'axios';

// ✅ Setting untuk akses ke backend di Railway
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://apikeuanganmasjid-production.up.railway.app';

Vue.use(DashboardPlugin);

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
