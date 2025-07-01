<template>
  <div class="container mt-4">
    <h4 class="text-center text-uppercase fw-bold">Laporan Perubahan Aset Neto</h4>
    <!-- Input Tahun -->
    <div class="row justify-content-center my-3">
      <div class="col-md-4">
        <input
          v-model="tahun"
          type="number"
          class="form-control"
          placeholder="Masukkan Tahun"
        />
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary w-100" @click="ambilLaporan">
          Tampilkan
        </button>
      </div>
    </div>

    <!-- Tabel Laporan -->
    <div v-if="laporan">
      <table class="table table-bordered table-sm">
        <tbody>
          <tr><td colspan="2" class="fw-bold">ASET NETO TANPA PEMBATASAN</td></tr>
          <tr><td>Saldo awal</td><td class="text-end">Rp {{ format(laporan.saldoAwalTidakTerikat) }}</td></tr>
          <tr><td>Surplus tahun berjalan</td><td class="text-end">Rp {{ format(laporan.surplusTidakTerikat) }}</td></tr>
          <tr><td>Saldo akhir</td><td class="text-end">Rp {{ format(laporan.saldoAkhirTidakTerikat) }}</td></tr>

          <tr><td colspan="2" class="fw-bold">Penghasilan Komprehensif Lain</td></tr>
          <tr><td>Saldo awal</td><td class="text-end">Rp {{ format(laporan.saldoAwalKomprehensif) }}</td></tr>
          <tr><td>Penghasilan tahun berjalan</td><td class="text-end">Rp {{ format(laporan.penghasilanKomprehensifLain) }}</td></tr>
          <tr><td>Saldo akhir</td><td class="text-end">Rp {{ format(laporan.saldoAkhirKomprehensif) }}</td></tr>

          <tr><td colspan="2" class="fw-bold">ASET NETO DENGAN PEMBATASAN</td></tr>
          <tr><td>Saldo awal</td><td class="text-end">Rp {{ format(laporan.saldoAwalTerikat) }}</td></tr>
          <tr><td>Surplus tahun berjalan</td><td class="text-end">Rp {{ format(laporan.surplusTerikat) }}</td></tr>
          <tr><td>Saldo akhir</td><td class="text-end">Rp {{ format(laporan.saldoAkhirTerikat) }}</td></tr>

          <tr class="fw-bold"><td>TOTAL ASET NETO</td><td class="text-end">Rp {{ format(laporan.totalAsetNeto) }}</td></tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-warning text-center mt-3">
      Silakan masukkan tahun dan klik "Tampilkan" untuk melihat laporan.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
          `https://apikeuanganmasjid-production.up.railway.app/laporan/aset-neto?tahun=${this.tahun}`
        );
        this.laporan = res.data.data;
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil laporan.");
      }
    },
    format(value) {
      return new Intl.NumberFormat("id-ID").format(value || 0);
    },
  },
};
</script>

