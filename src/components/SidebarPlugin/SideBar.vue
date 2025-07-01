<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!-- Toggler -->
      <navbar-toggle-button @click.native="showSidebar" />

      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="Logo">
      </router-link>

      <slot name="mobile-right"></slot>
      <slot></slot>

      <!-- Sidebar Menu -->
      <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

        <!-- Collapse Header (Mobile) -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" alt="Logo">
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar" />
            </div>
          </div>
        </div>

        <!-- Dynamic Menu Items -->
        <ul class="navbar-nav">
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link"
              @click.native="handleClick"
            >
              <i :class="item.icon"></i>
              <span class="nav-link-text">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>

        <!-- Optional Documentation -->
        <hr class="my-3">
        <h6 class="navbar-heading text-muted">Documentation</h6>
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link" href="https://www.creative-tim.com/learning-lab/bootstrap-vue/alerts/argon-dashboard" target="_blank">
              <i class="ni ni-spaceship"></i> Getting started
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard" target="_blank">
              <i class="ni ni-palette"></i> Foundation
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.creative-tim.com/learning-lab/bootstrap-vue/alerts/argon-dashboard" target="_blank">
              <i class="ni ni-ui-04"></i> Components
            </a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import NavbarToggleButton from '@/components/NavbarToggleButton'
import routes from '@/routes/routes'

export default {
  name: 'sidebar',
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: 'img/brand/green.png',
      description: 'Sidebar app logo'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menuItems: []
    };
  },
  async created() {
    let role = localStorage.getItem("role");

    // Jika belum ada role, fetch dari backend
    if (!role) {
      try {
        const res = await axios.get("/users/check-session", {
          withCredentials: true,
        });
role = res.data && res.data.user ? res.data.user.role : null;
        if (role) {
          localStorage.setItem("role", role);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Sekarang role pasti tersedia
    this.menuItems = this.getMenuByRole(role || "jamaah");
  },
  methods: {
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    handleClick() {
      if (window.innerWidth < 768 && this.autoClose) {
        this.closeSidebar();
      }
    },
    getMenuByRole(role) {
      const dashboardRoutes = this.$router.options.routes.find(
        route => route.component.name === 'DashboardLayout'
      );
      if (!dashboardRoutes || !dashboardRoutes.children) return [];

      const hiddenRoutes = [
        'addpengurus',
        'edittransaksi',
        'addmasjid',
        'gantipassword',
        'icons',
        'tables',
        'Apa ini',
      ];

      return dashboardRoutes.children.filter(route => {
        if (!route.path || route.path === '/') return false;

        if (hiddenRoutes.includes(route.name)) return false;

        if (!route.meta || !route.meta.roles) return true;

        return route.meta.roles.includes(role);
      }).map(route => ({
        name: this.getRouteName(route),
        path: route.path.startsWith('/')
              ? route.path
              : `/${route.path}`,
        icon: this.getIconByPath(route.path)
      }));

    },
    getRouteName(route) {
      const nameMap = {
        dashboardadmin: 'Dashboard Admin',
        manajemenpengurus: 'Manajemen Pengurus',
        dashboard: 'Dashboard',
        transaksi: 'Transaksi',
        datatransaksi: 'Data Transaksi',
        'laporan-publik': 'Laporan Keuangan',
        profile: 'Profil'
      };
      const cleanPath = route.path.replace('/', '');
      return nameMap[cleanPath] || route.name || 'Menu';
    },
    getIconByPath(path) {
      const iconMap = {
        dashboardadmin: 'ni ni-tv-2 text-primary',
        manajemenpengurus: 'ni ni-single-02 text-orange',
        dashboard: 'ni ni-tv-2 text-primary',
        transaksi: 'ni ni-money-coins text-success',
        datatransaksi: 'ni ni-bullet-list-67 text-red',
        'laporan-publik': 'ni ni-chart-bar-32 text-info',
        profile: 'ni ni-single-02 text-purple'
      };
      const cleanPath = path.replace('/', '');
      return iconMap[cleanPath] || 'ni ni-circle-08 text-default';
    }
  },
  beforeDestroy() {
    this.$sidebar.showSidebar = false;
  }
};


</script>
