<template>
  <div class="container mt-5">
    <!-- Input Tahun -->
    <div class="row justify-content-center my-4">
      <div class="col-md-4">
        <input
          v-model="tahun"
          type="number"
          class="form-control"
          placeholder="Masukkan Tahun"
        />
      </div>
      <div class="col-md-2">
        <button @click="ambilLaporan" class="btn btn-primary w-100">Tampilkan</button>
      </div>
    </div>

    <!-- Header -->
    <h4 class="text-center fw-bold text-uppercase">ENTITAS MASJID XYZ</h4>
    <h5 class="text-center fw-bold">Laporan Posisi Keuangan</h5>
    <p class="text-center">Untuk tahun yang berakhir pada 31 Desember {{ tahun }}</p>
    <p class="text-center fst-italic">(dalam satuan rupiah)</p>

    <!-- Tabel Laporan -->
    <div v-if="laporan">
      <!-- ASET -->
      <h5 class="fw-bold">ASET</h5>
      <div class="ms-3">
        <strong>Aset Lancar</strong>
        <div class="d-flex justify-content-between">
          <span>Kas dan setara kas</span>
          <span>Rp {{ format(laporan.aset.lancar.kas_dan_setara_kas) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Piutang bunga</span>
          <span>Rp {{ format(laporan.aset.lancar.piutang || 0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Investasi jangka pendek</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Aset lancar lain</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total Aset Lancar</span>
          <span>Rp {{ format(laporan.aset.lancar.total_aset_lancar) }}</span>
        </div>

        <strong class="mt-3">Aset Tidak Lancar</strong>
        <div class="d-flex justify-content-between">
          <span>Properti investasi</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Investasi jangka panjang</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Aset tetap</span>
          <span>Rp {{ format(laporan.aset.tidak_lancar.aset_tetap) }}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total Aset Tidak Lancar</span>
          <span>Rp {{ format(laporan.aset.tidak_lancar.total_aset_tidak_lancar) }}</span>
        </div>

        <div class="d-flex justify-content-between fw-bold border-top pt-2">
          <span>TOTAL ASET</span>
          <span>Rp {{ format(laporan.aset.total_aset) }}</span>
        </div>
      </div>

      <!-- LIABILITAS -->
      <h5 class="fw-bold mt-4">LIABILITAS</h5>
      <div class="ms-3">
        <strong>Liabilitas Jangka Pendek</strong>
        <div class="d-flex justify-content-between">
          <span>Pendapatan diterima di muka</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Utang jangka pendek</span>
          <span>Rp {{ format(laporan.liabilitas.jangka_pendek) }}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total Liabilitas Jangka Pendek</span>
          <span>Rp {{ format(laporan.liabilitas.jangka_pendek) }}</span>
        </div>

        <strong class="mt-3">Liabilitas Jangka Panjang</strong>
        <div class="d-flex justify-content-between">
          <span>Utang jangka panjang</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Liabilitas imbalan kerja</span>
          <span>Rp {{ format(0) }}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total Liabilitas Jangka Panjang</span>
          <span>Rp {{ format(laporan.liabilitas.jangka_panjang) }}</span>
        </div>

        <div class="d-flex justify-content-between fw-bold border-top pt-2">
          <span>Total Liabilitas</span>
          <span>Rp {{ format(laporan.liabilitas.total_liabilitas) }}</span>
        </div>
      </div>

      <!-- ASET NETO -->
      <h5 class="fw-bold mt-4">ASET NETO</h5>
      <div class="ms-3">
        <strong>Tanpa Pembatasan (without restrictions)</strong>
        <div class="d-flex justify-content-between">
          <span>Saldo tidak terikat</span>
          <span>Rp {{ format(laporan.asetNetoTidakTerikat) }}</span>
        </div>

        <strong class="mt-2">Dengan Pembatasan (with restrictions)</strong>
        <div class="d-flex justify-content-between">
          <span>Saldo terikat</span>
          <span>Rp {{ format(laporan.saldoAkhirTerikat) }}</span>
        </div>

        <div class="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
          <span>Total Aset Neto</span>
          <span>Rp {{
            format(
              (laporan.totalAsetNeto)
            )
          }}</span>
        </div>
      </div>

      <div class="d-flex justify-content-between fw-bold mt-3 border-top pt-2">
        <span>TOTAL LIABILITAS DAN ASET NETO</span>
        <span>Rp {{ format(laporan.total_liabilitas_dan_aset_neto) }}</span>
      </div>
    </div>

    <div v-else class="alert alert-warning text-center mt-4">
      Silakan masukkan tahun dan klik "Tampilkan" untuk melihat laporan.
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tahun: "",
      laporan: null,
    };
  },
  methods: {
    async ambilLaporan() {
      if (!this.tahun) {
        alert("Masukkan tahun terlebih dahulu.");
        return;
      }
      try {
        const res = await axios.get(
          `https://apikeuanganmasjid-production.up.railway.app/laporan/posisi-keuangan?tahun=${this.tahun}`
        );
        this.laporan = res.data.laporanPosisiKeuangan;
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data laporan.");
      }
    },
    format(angka) {
      return new Intl.NumberFormat("id-ID").format(angka || 0);
    },
  },
};
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
