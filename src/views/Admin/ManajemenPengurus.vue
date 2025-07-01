<template>
  <div class="container mt-4">
    <h2 class="mb-2">Manajemen Pengurus Masjid</h2>

    <!-- Tombol Tambah Data Pengurus -->
    <div class="mb-3">
      <button class="btn btn-primary" @click="tambahDataPengurus">
        + Input Data Pengurus Masjid
      </button>
    </div>

    <!-- Notifikasi loading dan error -->
    <div v-if="loading" class="alert alert-info">Memuat data Pengurus...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Tabel data -->
    <div v-if="!loading && dataPengurus.length > 0" class="table-responsive">
      <table class="table table-bordered table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <th>Username</th>
            <th>No Handphone</th>
            <th>Nama Masjid</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataPengurus" :key="index">
            <td>{{ item.username }}</td>
            <td>{{ item.no_hp }}</td>
            <td>{{ item.masjid ? item.masjid.nama_masjid : '-' }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="editData(item)">
                Edit
              </button>
              <button class="btn btn-sm btn-danger" @click="hapusData(item)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Jika tidak ada data -->
    <div v-else-if="!loading && dataPengurus.length === 0">
      <p class="text-muted">Tidak ada data Pengurus.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataPengurus: [],
      loading: false,
      error: ''
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.error = ''
      try {
const res = await axios.get('https://apikeuanganmasjid-production.up.railway.app/admin/pengurus', {
  withCredentials: true
})
        console.log(res.data)
        if (res.data.status) {
          this.dataPengurus = res.data.data
        } else {
          this.error = 'Gagal mengambil data pengurus dari server.'
        }
      } catch (err) {
        this.error = 'Terjadi kesalahan saat mengambil data.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    tambahDataPengurus() {
      this.$router.push({ name: 'addpengurus' }) // Ganti dengan nama route form input pengurus
    },

    editData(item) {
      this.$router.push({ name: 'editpengurus', params: { id_transaksi: item.id_user } })
    },

    async hapusData(item) {
      const konfirmasi = confirm(`Yakin ingin menghapus Pengurus: ${item.username}?`)
      if (konfirmasi) {
        try {
const res = await axios.delete(`https://apikeuanganmasjid-production.up.railway.app/admin/delete-pengurus/${item.id_user}`, {
  withCredentials: true
})
          if (res.data.status) {
            alert('Data berhasil dihapus')
            this.fetchData()
          } else {
            alert('Gagal menghapus data')
          }
        } catch (error) {
          console.error(error)
          alert('Terjadi kesalahan saat menghapus data')
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
