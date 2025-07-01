<template>
  <div class="wrapper">
    <notifications></notifications>

    <!-- Tetap passing userRole dan menu jika memang diperlukan -->
    <side-bar :userRole="userRole" :menu="menu" />

    <div class="main-content">
      <div @click="$sidebar.displaySidebar(false)">
        <!-- Transisi Vue -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from '@/components/Navbar/BaseNav.vue';

export default {
  name: 'DashboardLayout',
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      menu: [],         // Dikosongkan, karena sudah di-handle oleh SideBar.vue
      userRole: ''      // Diisi jika perlu lewat API / Vuex
    };
  },
  created() {
    // Kamu bisa atur userRole dari sumber lain di sini, misalnya Vuex:
    // this.userRole = this.$store.state.user.role || '';

    // Atau, kalau memang tidak dibutuhkan, biarkan kosong
    this.userRole = '';
  }
};
</script>

<style>
/* Efek transisi */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
  