<template>
  <div class="container mt-3">
    <h3>Input Data Aset Lama</h3>
    <form @submit.prevent="submitAset">
      <div class="mb-3">
        <label for="nama_aset" class="form-label">Nama Aset</label>
        <input
          type="text"
          id="nama_aset"
          v-model="form.nama_aset"
          required
          placeholder="Masukkan nama aset"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="jumlah" class="form-label">Jumlah</label>
        <input
          type="number"
          id="jumlah"
          v-model.number="form.jumlah"
          min="1"
          required
          placeholder="Masukkan jumlah aset"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="nilai_aset" class="form-label">Nilai Aset (Rp)</label>
        <input
          type="number"
          id="nilai_aset"
          v-model.number="form.nilai_aset"
          min="0"
          step="1000"
          required
          placeholder="Masukkan nilai aset"
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>

    <div v-if="message" :class="['alert mt-3', success ? 'alert-success' : 'alert-danger']">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nama_aset: '',
        jumlah: null,
        nilai_aset: null,
      },
      message: '',
      success: false,
    };
  },
  methods: {
    async submitAset() {
      try {
        const response = await axios.post('https://apikeuanganmasjid-production.up.railway.app/data_aset/input-aset-lama', {
          nama_aset: this.form.nama_aset,
          jumlah: this.form.jumlah,
          nilai_aset: this.form.nilai_aset,
        });

        if (response.data.status) {
          this.message = response.data.msg || 'Berhasil menyimpan data';
          this.success = true;
          // reset form
          this.form.nama_aset = '';
          this.form.jumlah = null;
          this.form.nilai_aset = null;
        } else {
          this.message = response.data.msg || 'Gagal menyimpan data';
          this.success = false;
        }
      } catch (error) {
        this.message = 'Terjadi kesalahan saat mengirim data';
        this.success = false;
      }
    },
  },
};
</script>
