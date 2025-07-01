<template>
  <div class="container mt-5">
    <b-row class="justify-content-center">
      <b-col lg="5" md="7">
        <b-card class="p-4">
          <h3 class="text-center mb-4">Ganti Password</h3>
          <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
            <b-form @submit.prevent="handleSubmit(onSubmit)">
              <base-input
                name="Password Baru"
                :rules="{ required: true, min: 6 }"
                prepend-icon="ni ni-lock-circle-open"
                type="password"
                placeholder="Password Baru"
                v-model="password"
                class="mb-3"
              />
              <base-input
                name="Konfirmasi Password"
                :rules="{ required: true, is: password }"
                prepend-icon="ni ni-lock-circle-open"
                type="password"
                placeholder="Konfirmasi Password"
                v-model="konfirmasi"
                class="mb-3"
              />
              <div class="text-center">
                <base-button type="primary" native-type="submit">Simpan Password</base-button>
              </div>
            </b-form>
          </validation-observer>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      konfirmasi: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const id_user = user.id_user;

        await axios.put(`http://localhost:3000/users/ganti-password/${id_user}`, {
          password: this.password,
        });

        alert('Password berhasil diganti. Silakan login kembali.');

        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this.$router.push('/');
      } catch (error) {
        alert('Gagal mengganti password.');
        console.error(error);
      }
    },
  },
};
</script>
