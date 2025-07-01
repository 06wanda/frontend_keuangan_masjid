<template>
  <div class="container mt-4">
    <h2>Edit Transaksi</h2>

    <form @submit.prevent="updateTransaksi">
      <div class="form-group">
        <label>Jenis Transaksi</label><br />
        <label><input type="radio" value="Pemasukan" v-model="form.jenis_transaksi" required /> Pemasukan</label>
        <label><input type="radio" value="Pengeluaran" v-model="form.jenis_transaksi" required /> Pengeluaran</label>
      </div>

      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal_transaksi" class="form-control" required />
      </div>

      <div class="form-group">
        <label>Nominal (Rp)</label>
        <input type="number" v-model.number="form.nominal" min="1" class="form-control" required />
      </div>

      <div class="form-group">
        <label>Keterangan</label>
        <input type="text" v-model="form.keterangan" class="form-control" required />
      </div>

      <!-- ✅ Preview Gambar Lama -->
      <div class="form-group" v-if="buktiPreview">
        <label>Preview Bukti:</label><br />
        <img :src="buktiPreview" alt="Bukti" style="max-width: 200px; border: 1px solid #ccc;" />
      </div>

      <!-- ✅ Upload Gambar Baru (opsional) -->
      <div class="form-group">
        <label>Ganti Bukti (opsional)</label>
        <input type="file" @change="handleFileUpload" accept="image/*" ref="fileInput" />
      </div>

      <button type="submit" class="btn btn-warning">Update Transaksi</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        jenis_transaksi: '',
        tanggal_transaksi: '',
        nominal: null,
        keterangan: ''
      },
      bukti: null,
      buktiPreview: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id_transaksi
      try {
        const res = await axios.get(`https://apikeuanganmasjid-production.up.railway.app/get-data/${id}`)
        if (res.data.status) {
          const data = res.data.data
          this.form = {
            jenis_transaksi: data.jenis_transaksi,
            tanggal_transaksi: data.tanggal_transaksi.slice(0,10),
            nominal: data.nominal,
            keterangan: data.keterangan
          }

          // ✅ Tampilkan gambar dari backend
          if (data.bukti) {
            this.buktiPreview = `https://apikeuanganmasjid-production.up.railway.app/img/${data.bukti}` // sesuai path backend
          }
        } else {
          alert('Data tidak ditemukan')
        }
      } catch (error) {
        console.error(error)
        alert('Gagal mengambil data transaksi')
      }
    },

    handleFileUpload(event) {
      this.bukti = event.target.files[0]

      // ✅ Tampilkan preview gambar baru jika di-upload
      if (this.bukti) {
        this.buktiPreview = URL.createObjectURL(this.bukti)
      }
    },

    async updateTransaksi() {
      const id = this.$route.params.id_transaksi
      const formData = new FormData()
      formData.append('jenis_transaksi', this.form.jenis_transaksi)
      formData.append('tanggal_transaksi', this.form.tanggal_transaksi)
      formData.append('nominal', this.form.nominal)
      formData.append('keterangan', this.form.keterangan)

      if (this.bukti) {
        formData.append('bukti', this.bukti)
      }

      try {
        await axios.put(`https://apikeuanganmasjid-production.up.railway.app/data_keuangan/update-transaksi/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Data berhasil diupdate!')
        this.$router.push('/datatransaksi')
      } catch (error) {
        console.error('Gagal update:', error)
        alert('Gagal mengupdate data')
      }
    }
  }
}
</script>
