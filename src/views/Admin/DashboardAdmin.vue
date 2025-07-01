<template>
  <div>
    <h4 class="mt-4">Daftar Masjid</h4>
    <b-table
      :items="masjidList"
      :fields="['id_masjid', 'nama_masjid', 'alamat_masjid']"
      striped
      hover
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      masjidList: [],
    };
  },
  mounted() {
    this.getMasjid();
  },
  methods: {
    async getMasjid() {
      try {
        const res = await axios.get("https://apikeuanganmasjid-production.up.railway.app/admin/masjid");
        this.masjidList = res.data.data;
      } catch (err) {
        console.error("Gagal mengambil data masjid:", err);
      }
    },
    refreshData() {
      this.getMasjid();
    },
  },
};
</script>
