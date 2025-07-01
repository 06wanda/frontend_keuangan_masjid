<template>
  <div class="container mt-5">
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
        <button
          @click="ambilLaporan"
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
          Tampilkan
        </button>
      </div>
    </div>

    <div class="text-center">
      <h4 class="fw-bold text-uppercase">ENTITAS MASJID XYZ</h4>
      <h5 class="fw-bold">Laporan Penghasilan Komprehensif</h5>
      <p>Untuk tahun yang berakhir pada 31 Desember {{ tahun }}</p>
      <p class="fst-italic">(dalam satuan rupiah)</p>
    </div>

    <div v-if="laporan" class="mt-4">
      <!-- Bagian Tanpa Pembatasan -->
      <h6 class="fw-bold">Tanpa Pembatasan</h6>
      <div v-for="(item, idx) in laporan.result.tidak_terikat.rincian_pendapatan" :key="idx" class="d-flex justify-content-between">
        <span class="text-capitalize">{{ item.nama }}</span>
        <span>Rp {{ format(item.jumlah) }}</span>
      </div>
      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total Pendapatan</span>
        <span>Rp {{ format(laporan.result.tidak_terikat.total_pendapatan) }}</span>
      </div>

      <!-- Beban -->
      <div class="mt-3 fw-bold fst-italic">Beban</div>
      <div v-for="(item, idx) in laporan.result.tidak_terikat.rincian_beban" :key="idx" class="d-flex justify-content-between">
        <span class="text-capitalize">{{ item.nama }}</span>
        <span>Rp {{ format(item.jumlah) }}</span>
      </div>
      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total Beban</span>
        <span>Rp {{ format(laporan.result.tidak_terikat.total_beban) }}</span>
      </div>

      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Surplus (Defisit)</span>
        <span>
          Rp {{ format((laporan && laporan.surplus && laporan.surplus.tidak_terikat) || 0) }}
        </span>
      </div>

      <!-- Bagian Dengan Pembatasan -->
      <h6 class="fw-bold mt-4">Dengan Pembatasan</h6>
      <div v-for="(item, idx) in laporan.result.terikat.rincian_pendapatan" :key="idx" class="d-flex justify-content-between">
        <span class="text-capitalize">{{ item.nama }}</span>
        <span>Rp {{ format(item.jumlah) }}</span>
      </div>
      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total Pendapatan</span>
        <span>Rp {{ format(laporan.result.terikat.total_pendapatan) }}</span>
      </div>

      <!-- Beban Terikat -->
      <div class="mt-3 fw-bold fst-italic">Beban</div>
      <div v-for="(item, idx) in laporan.result.terikat.rincian_beban" :key="idx" class="d-flex justify-content-between">
        <span class="text-capitalize">{{ item.nama }}</span>
        <span>Rp {{ format(item.jumlah) }}</span>
      </div>
      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total Beban</span>
        <span>Rp {{ format(laporan.result.terikat.total_beban) }}</span>
      </div>

      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Surplus (Defisit)</span>
        <span>
          Rp {{ format((laporan && laporan.surplus && laporan.surplus.terikat) || 0) }}
        </span>
      </div>

      <!-- Penghasilan Komprehensif Lain -->
      <div class="d-flex justify-content-between fw-bold mt-4">
        <span>Penghasilan Komprehensif Lain</span>
        <span>Rp {{ format(laporan.penghasilan_komprehensif_lain || 0) }}</span>
      </div>

      <!-- Total Komprehensif -->
      <div class="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total Penghasilan Komprehensif</span>
        <span>Rp {{ format(totalPenghasilanKomprehensif) }}</span>
      </div>
    </div>

    <div v-else class="alert alert-warning text-center">
      Silakan masukkan tahun dan klik "Tampilkan" untuk melihat laporan.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tahun: '',
      laporan: null,
      loading: false
    };
  },
  computed: {
    totalPenghasilanKomprehensif() {
      const surplus = this.laporan && this.laporan.surplus;
      const terikat = surplus ? surplus.terikat : 0;
      const tidakTerikat = surplus ? surplus.tidak_terikat : 0;
      const lain = this.laporan ? this.laporan.penghasilan_komprehensif_lain : 0;
      return terikat + tidakTerikat + lain;
    }
  },
  methods: {
    async ambilLaporan() {
      if (!this.tahun) return alert('Masukkan tahun.');
      this.loading = true;
      try {
        const res = await axios.get(`http://localhost:3000/laporan/aktivitas?tahun=${this.tahun}`);
        this.laporan = res.data;
      } catch (err) {
        console.error(err);
        alert('Gagal mengambil data.');
      } finally {
        this.loading = false;
      }
    },
    format(value) {
      return new Intl.NumberFormat('id-ID').format(value || 0);
    }
  }
};
</script>
