<template>
  <!-- CALK - Catatan Atas Laporan Keuangan -->
<div class="card mt-4">
  <div class="card-header bg-gradient-primary text-white">
    <h4 class="mb-0">Catatan Atas Laporan Keuangan (CALK)</h4>
    <small>Untuk Tahun Berakhir 31 Desember 20XX</small>
  </div>
  <div class="card-body">
    <!-- 1. Kebijakan Akuntansi -->
    <div class="mb-3">
      <h5>1. Kebijakan Akuntansi yang Signifikan</h5>
      <p class="text-muted">
        Laporan keuangan ini disusun sesuai dengan ISAK 35 untuk entitas nirlaba. Kebijakan yang digunakan
        termasuk pengakuan pendapatan dari sumbangan, pengakuan nilai aset dari donasi, dll.
      </p>
    </div>

    <!-- 2. Aset Tetap dari Donasi -->
    <div class="mb-3">
      <h5>2. Aset Tetap dari Donasi</h5>
      <table class="table table-bordered table-sm">
        <thead class="bg-light">
          <tr>
            <th>Nama Aset</th>
            <th>Jumlah</th>
            <th>Nilai</th>
            <th>Tanggal Perolehan</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Karpet</td>
            <td>5</td>
            <td>9,000,000</td>
            <td>2025-06-03</td>
            <td>Donasi dari H. Ahmad</td>
          </tr>
          <tr>
            <td>Kipas Angin</td>
            <td>3</td>
            <td>900,000</td>
            <td>2025-06-04</td>
            <td>Donasi dari Ibu Siti</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 3. Saldo Awal Aset Neto -->
    <div class="mb-3">
      <h5>3. Saldo Awal Aset Neto</h5>
      <p>Saldo awal untuk Aset Neto Tanpa Pembatasan: <strong>Rp x.xxx.xxx</strong></p>
      <p>Saldo awal untuk Aset Neto Dengan Pembatasan: <strong>Rp x.xxx.xxx</strong></p>
    </div>

    <!-- 4. Aset Neto yang Dibebaskan dari Pembatasan -->
    <div class="mb-3">
      <h5>4. Aset Neto yang Dibebaskan dari Pembatasan</h5>
      <p>Selama tahun ini, terdapat pemindahan dari Aset Neto Dengan Pembatasan ke Aset Neto Tanpa Pembatasan sebesar: <strong>Rp x.xxx.xxx</strong></p>
    </div>

    <!-- 5. Lainnya (Sesuai Kebutuhan) -->
    <div class="mb-3">
      <h5>5. Informasi Lain</h5>
      <p>Penjelasan terkait transaksi khusus atau perubahan signifikan lainnya yang terjadi selama periode pelaporan dapat dicatat di sini.</p>
    </div>
  </div>
</div>

</template>
<!-- 
<script>
import axios from "axios";

export default {
  data() {
    return {
      tahun: "",
      calk: null,
    };
  },
  methods: {
    async ambilCALK() {
      if (!this.tahun) {
        alert("Masukkan tahun terlebih dahulu.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/laporan/calk?tahun=${this.tahun}`
        );
        this.calk = res.data;
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil CALK");
      }
    },
    format(nilai) {
      return new Intl.NumberFormat("id-ID").format(nilai || 0);
    },
  },
};
</script>

<style scoped>
.table {
  font-size: 14px;
}
</style> -->
