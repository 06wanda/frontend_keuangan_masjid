<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-warning text-white">
        <h5>Edit Aset</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateAset">
          
          <div class="form-group">
            <label>Nama Aset</label>
            <input v-model="form.nama_aset" class="form-control" required />
          </div>

          <div class="form-group">
            <label>Jumlah Aset</label>
            <input
              type="number"
              v-model.number="form.jumlah"
              class="form-control"
              required
              placeholder="Contoh: 5"
              min="1"
            />
          </div>

          <div class="form-group">
            <label>Nilai Aset (Rp)</label>
            <input
              v-model.number="form.nilai_aset"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label>Asal Aset</label>
            <select v-model="form.sumber_aset" class="form-control" required>
              <option disabled value="">-- Pilih Asal Aset --</option>
              <option value="pembelian">Pembelian dari Kas</option>
              <option value="donasi">Donasi</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tanggal Perolehan</label>
            <input
              v-model="form.tanggal_perolehan"
              type="date"
              class="form-control"
              required
            />
          </div>

          <!-- Status Pembayaran -->
          <div class="form-group">
            <label>Status Pembayaran</label>
            <select v-model="form.status_pembayaran" class="form-control" required>
              <option value="lunas">Lunas</option>
              <option value="belum_lunas">Belum Lunas</option>
            </select>
          </div>

          <!-- Nilai Dibayar (hanya muncul kalau belum lunas) -->
          <div class="form-group" v-if="form.status_pembayaran === 'belum_lunas'">
            <label>Nilai Dibayar (Rp)</label>
            <input
              v-model.number="form.nilai_bayar"
              class="form-control"
              placeholder="Contoh: 40000000"
            />
          </div>

          <!-- Nilai Sisa (hanya muncul kalau belum lunas) -->
          <div class="form-group" v-if="form.status_pembayaran === 'belum_lunas'">
            <label>Nilai Sisa (Rp)</label>
            <input
              v-model.number="form.nilai_sisa"
              class="form-control"
              placeholder="Contoh: 30000000"
            />
          </div>

          <button type="submit" class="btn btn-success mt-3">
            Simpan Perubahan
          </button>
        </form>

        <div v-if="message" :class="['alert mt-3', alertTypeClass]">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<!-- SCRIPT -->
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
      alertType: "success",
    };
  },
  computed: {
    alertTypeClass() {
      return this.alertType === "success" ? "alert-success" : "alert-danger";
    },
  },
  async created() {
    await this.getAsetById();
  },
  methods: {
    async getAsetById() {
      const id = this.$route.params.id_aset;
      if (!id) {
        this.message = "ID Aset tidak ditemukan dari route.";
        this.alertType = "danger";
        return;
      }

      try {
        const res = await axios.get(`https://apikeuanganmasjid-production.up.railway.app/data_aset/get-data/${id}`);
        const data = res.data.data;

        this.form.nama_aset = data.nama_aset;
        this.form.jumlah = data.jumlah;
        this.form.nilai_aset = Number(data.nilai_aset);
        this.form.sumber_aset = data.sumber_aset;
        this.form.tanggal_perolehan = new Date(data.tanggal_perolehan).toISOString().substr(0, 10);
        this.form.status_pembayaran = data.status_pembayaran;
        this.form.nilai_bayar = Number(data.nilai_bayar) || 0;
        this.form.nilai_sisa = Number(data.nilai_sisa) || 0;
      } catch (error) {
        this.message = "Gagal memuat data.";
        this.alertType = "danger";
        console.error(error);
      }
    },
    async updateAset() {
      try {
        const id = this.$route.params.id_aset;

        const nilaiBayar = isNaN(parseFloat(this.form.nilai_bayar))
            ? 0
            : parseFloat(this.form.nilai_bayar);
        const nilaiSisa = isNaN(parseFloat(this.form.nilai_sisa))
            ? 0
            : parseFloat(this.form.nilai_sisa);

        const payload = {
          nama_aset: this.form.nama_aset,
          jumlah: this.form.jumlah,
          nilai_aset: this.form.nilai_aset,
          sumber_aset: this.form.sumber_aset,
          tanggal_perolehan: this.form.tanggal_perolehan,
          status_pembayaran: this.form.status_pembayaran,
          nilai_bayar: nilaiBayar,
          nilai_sisa: nilaiSisa,
        };
        const res = await axios.put(`https://apikeuanganmasjid-production.up.railway.app/data_aset/update-aset/${id}`, payload);
        this.message = res.data.msg;
        this.alertType = "success";
      } catch (error) {
        this.message = "Gagal menyimpan perubahan.";
        this.alertType = "danger";
      }
    },
  },
};
</script>
