<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{'navbar-dark': type === 'default'}"
  >
    <a
      href="#"
      aria-current="page"
      class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"
    >{{$route.name}}</a>

    <!-- Navbar links... kode lainnya tetap -->

    <base-dropdown
      menu-on-right
      class="nav-item"
      tag="li"
      title-tag="a"
      title-classes="nav-link pr-0"
    >
      <a href="#" class="nav-link pr-0" slot="title-container">
        <b-media no-body class="align-items-center">
          <span class="avatar avatar-sm rounded-circle">
            <img alt="Image placeholder" src="img/theme/team-4.jpg" />
          </span>
          <b-media-body class="ml-2 d-none d-lg-block">
            <span class="mb-0 text-sm font-weight-bold">John Snow</span>
          </b-media-body>
        </b-media>
      </a>

      <template>
        <b-dropdown-header class="noti-title">
          <h6 class="text-overflow m-0">Welcome!</h6>
        </b-dropdown-header>
        <b-dropdown-item href="#!">
          <i class="ni ni-single-02"></i> <span>My profile</span>
        </b-dropdown-item>
        <b-dropdown-item href="#!">
          <i class="ni ni-settings-gear-65"></i> <span>Settings</span>
        </b-dropdown-item>
        <b-dropdown-item href="#!">
          <i class="ni ni-calendar-grid-58"></i> <span>Activity</span>
        </b-dropdown-item>
        <b-dropdown-item href="#!">
          <i class="ni ni-support-16"></i> <span>Support</span>
        </b-dropdown-item>
        <div class="dropdown-divider"></div>
        <!-- ✅ Tombol Logout yang memanggil method logout -->
        <b-dropdown-item href="#!" @click="logout">
          <i class="ni ni-user-run"></i> <span>Logout</span>
        </b-dropdown-item>
      </template>
    </base-dropdown>
  </base-nav>
</template>

<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import axios from "axios";

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },
  props: {
    type: {
      type: String,
      default: "default",
      description: "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    async logout() {
      try {
        await axios.post("http://localhost:3000/users/logout", {}, {
          withCredentials: true,
        });
        this.$router.replace("/auth/login");
      } catch (error) {
        console.error(error);
        alert("Gagal logout. Silakan coba lagi.");
      }
    },
  },
};
</script>
