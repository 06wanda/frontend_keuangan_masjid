import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash && to.hash.length > 1 && to.hash !== '#/') {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

// Route Guard
router.beforeEach(async (to, from, next) => {
  const publicPages = ['/auth/login', '/auth/register', '/auth/not-found'];

  // Izinkan masuk ke halaman public
  if (publicPages.includes(to.path)) {
    return next();
  }

  let role = localStorage.getItem('role');

  // Jika role belum ada, coba fetch dari backend
  if (!role) {
    try {
      const res = await axios.get("/users/check-session", {
        withCredentials: true,
      });
role = res.data && res.data.user ? res.data.user.role : null;
      if (role) {
        localStorage.setItem('role', role);
      }
    } catch (error) {
      console.error(error);
      return next("/auth/login");
    }
  }

  // Sekarang role sudah tersedia, validasi
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next("/auth/not-found"); // Akses tidak sesuai role
  }

  next();
});

export default router;
