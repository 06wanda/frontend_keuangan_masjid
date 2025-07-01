<template>
  <div class="container mt-5">
    <!-- Filter Tahun -->
    <div class="row justify-content-center my-4">
      <div class="col-md-4">
        <input v-model="tahun" type="number" class="form-control" placeholder="Masukkan Tahun" />
      </div>
      <div class="col-md-2">
        <button @click="ambilLaporan" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
          Tampilkan
        </button>
      </div>
    </div>

    <!-- Header Laporan -->
    <h4 class="text-center text-uppercase text-dark fw-bold">ENTITAS MASJID XYZ</h4>
    <h5 class="text-center fw-bold">Laporan Arus Kas</h5>
    <p class="text-center mb-0">Untuk Tahun yang Berakhir 31 Desember {{ tahun }}</p>
    <p class="text-center fst-italic">(dalam satuan rupiah)</p>

    <div v-if="laporan">
      <!-- Kas Awal Tahun -->
      <div class="d-flex justify-content-between fw-bold mt-3">
        <span>Kas Awal Tahun</span>
        <span>Rp {{ format(laporan.kas_awal_tahun) }}</span>
      </div>

      <!-- Operasional -->
      <h5 class="mt-4 fw-bold">Aktivitas Operasional</h5>
      <div v-if="laporan.rincian && laporan.rincian.Operasi && laporan.rincian.Operasi.rincian.length">
        <div v-for="(item, index) in laporan.rincian.Operasi.rincian" :key="'ops-' + index" class="d-flex justify-content-between">
          <span>{{ item.nama }} ({{ item.jenis }})</span>
          <span>Rp {{ format(item.jumlah) }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Kas Bersih dari Aktivitas Operasional</span>
        <span>Rp {{ format(laporan.kas_operasional) }}</span>
      </div>

      <!-- Investasi -->
      <h5 class="mt-4 fw-bold">Aktivitas Investasi</h5>
      <div v-if="laporan.rincian && laporan.rincian.Inventaris && laporan.rincian.Inventaris.rincian.length">
        <div v-for="(item, index) in laporan.rincian.Inventaris.rincian" :key="'inv-' + index" class="d-flex justify-content-between">
          <span>{{ item.nama }} ({{ item.jenis }})</span>
          <span>Rp {{ format(item.jumlah) }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Kas Bersih dari Aktivitas Investasi</span>
        <span>Rp {{ format(laporan.kas_investasi) }}</span>
      </div>

      <!-- Pendanaan -->
      <h5 class="mt-4 fw-bold">Aktivitas Pendanaan</h5>
      <div v-if="laporan.rincian && laporan.rincian.Pendanaan && laporan.rincian.Pendanaan.rincian.length">
        <div v-for="(item, index) in laporan.rincian.Pendanaan.rincian" :key="'pend-' + index" class="d-flex justify-content-between">
          <span>{{ item.nama }} ({{ item.jenis }})</span>
          <span>Rp {{ format(item.jumlah) }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Kas Bersih dari Aktivitas Pendanaan</span>
        <span>Rp {{ format(laporan.kas_pendanaan) }}</span>
      </div>

      <!-- Total dan Kas Akhir Tahun -->
      <div class="d-flex justify-content-between fw-bold border-top pt-2 mt-4">
        <span>Total Kenaikan (Penurunan) Kas</span>
        <span>Rp {{ format(laporan.total_kas_bersih) }}</span>
      </div>
      <div class="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Kas Akhir Tahun</span>
        <span>Rp {{ format(laporan.kas_akhir_tahun) }}</span>
      </div>
    </div>

    <div v-else-if="!loading" class="alert alert-warning text-center mt-4">
      Silakan masukkan tahun dan klik "Tampilkan" untuk melihat laporan.
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tahun: '',
      laporan: null,
      loading: false,
    }
  },
  methods: {
    async ambilLaporan() {
      if (!this.tahun) {
        alert('Masukkan tahun terlebih dahulu.')
        return
      }

      this.loading = true
      try {
        const response = await axios.get(`https://apikeuanganmasjid-production.up.railway.app/laporan/arus-kas?tahun=${this.tahun}`)
        this.laporan = response.data
      } catch (error) {
        console.error("Gagal ambil data:", error)
        alert(
          (error && error.response && error.response.data && error.response.data.msg) ||
          "Terjadi kesalahan saat mengambil laporan."
        )
      } finally {
        this.loading = false
      }
    },
    format(angka) {
      return new Intl.NumberFormat('id-ID').format(angka || 0)
    }
  }
}
</script>

<style scoped>
.container {
  font-size: 14px;
}
h4,
h5 {
  margin: 0;
}
.d-flex {
  font-size: 14px;
}
.border-top {
  font-weight: bold;
}
</style>
