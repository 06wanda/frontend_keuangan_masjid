<template>
  <div>
    <h4>Tambah Masjid</h4>
    <b-form @submit.prevent="tambahMasjid">
      <b-form-group label="Nama Masjid" label-for="namaMasjid">
        <b-form-input
          id="namaMasjid"
          v-model="nama_masjid"
          placeholder="Masukkan nama masjid"
          required
        />
      </b-form-group>

      <b-form-group label="Alamat Masjid" label-for="alamatMasjid">
        <b-form-input
          id="alamatMasjid"
          v-model="alamat_masjid"
          placeholder="Masukkan alamat masjid"
          required
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Tambah Masjid</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nama_masjid: "",
      alamat_masjid: "",
    };
  },
  methods: {
    async tambahMasjid() {
      try {
        const payload = {
          nama_masjid: this.nama_masjid,
          alamat_masjid: this.alamat_masjid,
        };
        await axios.post(
          "https://apikeuanganmasjid-production.up.railway.app/admin/masjid",
          payload,
          { withCredentials: true } // penting jika pakai session login
        );
        alert("Masjid berhasil ditambahkan!");
        this.nama_masjid = "";
        this.alamat_masjid = "";
        this.$emit("masjid-diperbarui"); // emit ke parent
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menambahkan masjid.");
      }
    },
  },
};
</script>
