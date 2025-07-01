<template>
  <div class="register-container">
    <b-container class="mt-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card class="p-4 shadow">
            <h3 class="text-center mb-4">Tambah Pengurus Masjid</h3>

            <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
              <b-form @submit.prevent="handleSubmit(onSubmit)">
                <!-- Username -->
                <base-input
                  name="Username"
                  :rules="{ required: true, min: 4 }"
                  prepend-icon="ni ni-single-02"
                  placeholder="Username"
                  v-model="model.username"
                  class="mb-3"
                />

                <!-- Password -->
                <base-input
                  name="Password"
                  type="password"
                  :rules="{ required: true, min: 6 }"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Password"
                  v-model="model.password"
                  class="mb-3"
                />

                <!-- Nomor HP -->
                <base-input
                  name="Nomor HP"
                  type="text"
                  :rules="{ required: true, min: 10 }"
                  prepend-icon="ni ni-mobile-button"
                  placeholder="Nomor HP"
                  v-model="model.no_hp"
                  class="mb-3"
                />

                <!-- Pilih Masjid -->
                <validation-provider name="Masjid" rules="required" v-slot="{ errors }">
                  <b-form-group label="Pilih Masjid">
                    <v-select
                      :options="masjidOptions"
                      label="text"
                      :reduce="masjid => masjid.value"
                      v-model="model.id_masjid"
                      placeholder="Cari atau pilih masjid"
                      :class="{ 'is-invalid': errors.length > 0 }"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>

                <!-- Tombol Simpan -->
                <div class="text-center">
                  <base-button type="primary" native-type="submit">
                    Simpan
                  </base-button>
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
        no_hp: "",
        role: "pengurus",
        id_masjid: "",
        must_change_password: true,
      },
      masjidOptions: [],
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post("/users/registrasi", this.model);

        if (response.data.status) {
          alert("Pengurus berhasil disimpan.");
          this.$router.push("/manajemenpengurus");
        } else {
          alert(response.data.msg || "Registrasi gagal.");
        }
      } catch (err) {
        console.error("Error saat registrasi:", err);
        alert("Terjadi kesalahan server saat menyimpan pengurus.");
      }
    },

    async getMasjid() {
      try {
        const response = await axios.get("/admin/masjid");
        if (response.data.status) {
          this.masjidOptions = response.data.data.map(item => ({
            value: item.id_masjid,
            text: item.nama_masjid,
          }));
        } else {
          alert("Gagal memuat daftar masjid.");
        }
      } catch (error) {
        console.error("Gagal mengambil daftar masjid:", error);
        alert("Terjadi kesalahan saat mengambil data masjid.");
      }
    },
  },
  mounted() {
    this.getMasjid();
  },
};
</script>

<style scoped>
/* Tambahkan styling opsional di sini */
</style>
