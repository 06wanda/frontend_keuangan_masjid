<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5>Input Aset</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="simpanAset">
          <!-- Nama Aset -->
          <div class="form-group">
            <label>Nama Aset</label>
            <input v-model="form.nama_aset" class="form-control" required />
          </div>

          <!-- Jumlah Aset -->
          <div class="form-group">
            <label>Jumlah Aset</label>
            <input
              v-model.number="form.jumlah"
              class="form-control"
              required
              placeholder="Contoh: 5"
              min="1"
            />
          </div>

          <!-- Nilai Aset -->
          <div class="form-group">
            <label>Nilai Aset (Rp)</label>
            <input v-model.number="form.nilai_aset" class="form-control" required />
          </div>

          <!-- Asal Aset -->
          <div class="form-group">
            <label>Asal Aset</label>
            <select v-model="form.sumber_aset" class="form-control" required>
              <option disabled value="">-- Pilih Asal Aset --</option>
                <option value="kas_umum">Dibeli dari Kas Umum</option>
    <option value="kas_terikat">Dibeli dari Kas Terikat</option>
    <option value="donasi_barang">Donasi Langsung (Barang)</option>
            </select>
          </div>

          <!-- Tanggal Perolehan -->
          <div class="form-group">
            <label>Tanggal Perolehan</label>
            <input v-model="form.tanggal_perolehan" type="date" class="form-control" required />
          </div>

          <!-- Status Pembayaran -->
          <div class="form-group">
            <label>Status Pembayaran</label>
            <select v-model="form.status_pembayaran" class="form-control" required>
              <option value="lunas">Lunas</option>
              <option value="belum_lunas">Belum Lunas</option>
            </select>
          </div>

          <div v-if="form.status_pembayaran === 'belum_lunas'">
            <div class="form-group">
              <label>Nilai Dibayar (Rp)</label>
              <input v-model.number="form.nilai_bayar" class="form-control" placeholder="Contoh: 40000000" />
            </div>
            <div class="form-group">
              <label>Nilai Sisa (Rp)</label>
              <input v-model.number="form.nilai_sisa" class="form-control" placeholder="Contoh: 30000000" />
            </div>
          </div>

          <button type="submit" class="btn btn-success mt-3">Simpan Aset</button>
        </form>

        <!-- ALERT -->
        <div v-if="message" :class="['alert mt-3', alertTypeClass]">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        nama_aset: "",
        jumlah: null,
        nilai_aset: null,
        sumber_aset: "",
        tanggal_perolehan: "",
        status_pembayaran: "lunas",
        nilai_bayar: 0,
        nilai_sisa: 0,
      },
      message: "",
      alertType: "success", // success | danger | warning | info
    };
  },
  computed: {
    alertTypeClass() {
      // Mengembalikan class Bootstrap alert sesuai tipe
      return `alert-${this.alertType}`;
    },
  },
  methods: {
    async simpanAset() {
      const idMasjid = localStorage.getItem("id_masjid");
      if (!idMasjid) {
        this.message = "ID Masjid tidak ditemukan.";
        this.alertType = "danger";
        return;
      }

      const payload = {
        id_masjid: idMasjid,
        nama_aset: this.form.nama_aset,
        jumlah: this.form.jumlah,
        nilai_aset: this.form.nilai_aset,
        sumber_aset: this.form.sumber_aset,
        tanggal_perolehan: this.form.tanggal_perolehan,
        status_pembayaran: this.form.status_pembayaran,
        nilai_bayar:
          this.form.status_pembayaran === "belum_lunas"
            ? this.form.nilai_bayar
            : this.form.nilai_aset,
        nilai_sisa:
          this.form.status_pembayaran === "belum_lunas"
            ? this.form.nilai_sisa
            : 0,
      };

      try {
        const res = await axios.post("https://apikeuanganmasjid-production.up.railway.app/data_aset/input", payload);
        this.message = res.data.msg;
        this.alertType = "success";
        this.resetForm();
      } catch (error) {
        this.message = "Gagal menyimpan data.";
        this.alertType = "danger";
      }
    },
    resetForm() {
      this.form = {
        nama_aset: "",
        jumlah: null,
        nilai_aset: null,
        sumber_aset: "",
        tanggal_perolehan: "",
        status_pembayaran: "lunas",
        nilai_bayar: 0,
        nilai_sisa: 0,
      };
    },
  },
};
</script>
