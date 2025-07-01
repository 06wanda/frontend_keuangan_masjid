<template>
  <div class="container mt-4">
    <h2 class="mb-4">Daftar Transaksi Keuangan Masjid</h2>

    <!-- Notifikasi loading dan error -->
    <div v-if="loading" class="alert alert-info">Memuat data transaksi...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Tabel data -->
    <div v-if="!loading && dataTransaksi.length > 0" class="table-responsive">
      <table class="table table-bordered table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <th>Jenis Transaksi</th>
            <th>Tanggal</th>
            <th>Nominal</th>
            <th>Keterangan</th>
            <th>Bukti</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataTransaksi" :key="index">
            <td>{{ item.jenis_transaksi }}</td>
            <td>{{ formatTanggal(item.tanggal_transaksi) }}</td>
            <td>Rp {{ formatNominal(item.nominal) }}</td>
            <td>{{ item.keterangan }}</td>
            <td>
              <img
                v-if="item.bukti"
                :src="getImageUrl(item.bukti)"
                alt="Bukti Transaksi"
                style="max-width: 100px; max-height: 70px; object-fit: cover;"
              />
              <span v-else class="text-muted">Tidak ada</span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-warning me-2"
                @click="editData(item)"
              >
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
    <div v-else-if="!loading && dataTransaksi.length === 0">
      <p class="text-muted">Tidak ada data transaksi.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dataTransaksi: [],
      loading: false,
      error: ''
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.error = ''
      try {
        const res = await axios.get('http://localhost:3000/data_keuangan/get-data')
        if (res.data.status) {
          this.dataTransaksi = res.data.data
        } else {
          this.error = 'Gagal mengambil data transaksi dari server.'
        }
      } catch (err) {
        this.error = 'Terjadi kesalahan saat mengambil data.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    formatTanggal(tgl) {
      const date = new Date(tgl)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    formatNominal(nominal) {
      const value = Number(nominal)
      return value.toLocaleString('id-ID')
    },
    getImageUrl(filename) {
      return `http://localhost:3000/img/${filename}`
    },
    editData(item) {
      // Pindah ke halaman edittransaksi dengan id
  this.$router.push({ name: 'edittransaksi', params: { id_transaksi: item.id_transaksi } })
    },
    async hapusData(item) {
      const konfirmasi = confirm(`Yakin ingin menghapus transaksi: ${item.keterangan}?`)
      if (konfirmasi) {
        try {
const res = await axios.delete(`https://apikeuanganmasjid-production.up.railway.app/data_keuangan/delete-transaksi/${item.id_transaksi}`)
          if (res.data.status) {
            alert('Data berhasil dihapus')
            this.fetchData()
          } else {
            console.log(item)
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
