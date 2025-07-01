<template>
  <div class="container mt-4">
    <h3>Data Aset</h3>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Aset</th>
          <th>Nilai</th>
          <th>Tanggal Perolehan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aset in dataAset" :key="aset.id_aset">
          <td>{{ aset.id_aset }}</td>
          <td>{{ aset.nama_aset }}</td>
          <td>Rp {{ formatNumber(aset.nilai_aset) }}</td>
          <td>{{ new Date(aset.tanggal_perolehan).toLocaleDateString() }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning me-2"
              @click="editData(aset)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="hapusData(aset.id_aset)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="message" class="alert alert-danger mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataAset: [],
      message: ""
    };
  },
  async mounted() {
    await this.getDataAset();
  },
  methods: {
    async getDataAset() {
      try {
        const res = await axios.get(`https://apikeuanganmasjid-production.up.railway.app/data_aset/get-data`);
        if (res.data.status) {
          this.dataAset = res.data.data;
        } else {
          this.message = res.data.msg;
        }
      } catch (error) {
        this.message = "Gagal memuat data aset.";
      }
    },
    formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    editData(aset) {
      // Arahkan ke halaman edit dengan id_aset
      this.$router.push(`/editaset/${aset.id_aset}`);
    },
    async hapusData(id_aset) {
      if (!confirm("Anda yakin ingin menghapus data ini?")) return;

      try {
        const res = await axios.delete(`https://apikeuanganmasjid-production.up.railway.app/data_aset/delete-aset/${id_aset}`);
        //const res = await axios.delete(`http://localhost:3000/data_keuangan/delete-transaksi/${item.id_transaksi}`)

        alert(res.data.msg);
        this.getDataAset();
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  }
};
</script>
