<template>
  <div class="login-container">
    <b-container class="mt-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card class="p-4">
            <h3 class="text-center mb-4">Login</h3>
            <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
              <b-form @submit.prevent="handleSubmit(onSubmit)">
                <base-input
                  name="Username"
                  :rules="{ required: true, min: 4 }"
                  prepend-icon="ni ni-single-02"
                  placeholder="Username"
                  v-model="model.username"
                  class="mb-3"
                />
                <base-input
                  name="Passwoard"
                  :rules="{ required: true, min: 6 }"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Password"
                  v-model="model.password"
                  class="mb-3"
                />
                <div class="text-center">
                  <base-button type="primary" native-type="submit">Login</base-button>
                </div>
              </b-form>
            </validation-observer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
       const response = await axios.post(
  "https://apikeuanganmasjid-production.up.railway.app/users/login",
  this.model,
  { withCredentials: true } // ✅ wajib untuk kirim cookie session
);

        if (!response.data.status) {
          alert(response.data.msg);
          return;
        }

        // ✅ Cek session
       const userCheck = await axios.get(
  "https://apikeuanganmasjid-production.up.railway.app/users/check-session",
  { withCredentials: true } // ✅ wajib juga
);


        if (userCheck.data.status) {
          const user = userCheck.data.user;
          localStorage.setItem("role", user.role);
          localStorage.setItem("userId", user.id_user);

          if (user.role === "admin") {
            this.$router.replace("/dashboardadmin");
          } else if (user.role === "pengurus") {
            this.$router.replace("/dashboard");
          } else {
            this.$router.replace("/laporan-publik");
          }
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Terjadi kesalahan server. Silakan coba lagi.");
      }
    }
  }
};
</script>
