<template>
  <div class="register-container">
    <b-container class="mt-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card class="p-4">
            <h3 class="text-center mb-4">Register</h3>
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
                  name="Password"
                  :rules="{ required: true, min: 6 }"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Password"
                  v-model="model.password"
                  class="mb-3"
                ></base-input>

                <base-input
                  name="Nomor HP"
                  :rules="{ required: true, min: 10 }"
                  prepend-icon="ni ni-mobile-button"
                  placeholder="Nomor HP"
                  v-model="model.no_hp"
                  class="mb-3"
                ></base-input>

                <div class="text-center">
                  <base-button type="primary" native-type="submit">Register</base-button>
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
import axios from 'axios'

export default {
  data() {
    return {
      model: {
        username: '',
        password: '',
        no_hp: '',
        role: 'pengurus',
        id_masjid: '', // sementara default id masjid
        must_change_password: false,
        status_aktif: true
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/users/registrasi', this.model);

        if (response.data.status) {
          alert("Registrasi berhasil. Silakan login.");
          this.$router.push('/login');
        } else {
          alert(response.data.msg);
        }
      } catch (err) {
        console.error(err)
        alert("Terjadi kesalahan server.");
      }
    }
  }
}
</script>
