<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-success text-white">
        <h5 class="mb-0">
          <i class="fas fa-edit"></i> Input Transaksi Keuangan Masjid
        </h5>
      </div>

      <div class="card-body">
        <!-- Notifikasi -->
        <div v-if="message" :class="['alert', alertTypeClass]" role="alert">
          {{ message }}
          <button type="button" class="close" @click="message = ''">&times;</button>
        </div>

        <!-- Form Start -->
        <form @submit.prevent="simpanTransaksi">
          <!-- Jenis Transaksi -->
          <div class="form-group">
            <label class="font-weight-bold d-block mb-2">Jenis Transaksi</label>
            <div class="d-flex flex-wrap gap-2">
              <span
                class="badge rounded-pill"
                :class="form.jenis_transaksi === 'Pemasukan'
                  ? 'badge-success px-3 py-2'
                  : 'badge-light text-dark border px-3 py-2'"
                style="cursor: pointer; font-size: 16px;"
                @click="form.jenis_transaksi = 'Pemasukan'"
              >
                <i class="fas fa-arrow-down mr-1"></i> Pemasukan
              </span>

              <span
                class="badge rounded-pill"
                :class="form.jenis_transaksi === 'Pengeluaran'
                  ? 'badge-danger px-3 py-2'
                  : 'badge-light text-dark border px-3 py-2'"
                style="cursor: pointer; font-size: 16px;"
                @click="form.jenis_transaksi = 'Pengeluaran'"
              >
                <i class="fas fa-arrow-up mr-1"></i> Pengeluaran
              </span>
            </div>
            <input type="text" v-model="form.jenis_transaksi" class="d-none" required />
          </div>

          <!-- Kategori -->
          <div class="form-group" v-if="form.jenis_transaksi">
            <label><i class="fas fa-list-ul"></i> Kategori</label>
            <select v-model="form.kategori" class="form-control" required>
              <option disabled value="">-- Pilih Kategori --</option>
              <option
                v-for="kategori in filteredKategori"
                :key="kategori.nama"
                :value="kategori.nama"
              >
                {{ kategori.nama }}
              </option>
            </select>
          </div>

          <!-- Sumber Dana -->
          <div class="form-group">
            <label><i class="fas fa-link"></i> Apakah dana ini terikat?</label><br />
            <div class="form-check form-check-inline">
              <input type="radio" id="terikat" value="terikat" v-model="form.sumber_dana" class="form-check-input" required />
              <label for="terikat" class="form-check-label">Ya (Terikat)</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" id="bebas" value="tidak_terikat" v-model="form.sumber_dana" class="form-check-input" required />
              <label for="bebas" class="form-check-label">Tidak (Bebas Digunakan)</label>
            </div>
          </div>

          <!-- Nominal -->
          <div class="form-group">
            <label><i class="fas fa-money-bill-wave"></i> Nominal (Rp)</label>
            <input type="number" v-model.number="form.nominal" min="1" class="form-control" required />
          </div>

          <!-- Tanggal -->
          <div class="form-group">
            <label><i class="fas fa-calendar-alt"></i> Tanggal</label>
            <input type="date" v-model="form.tanggal_transaksi" class="form-control" required />
          </div>

          <!-- Keterangan -->
          <div class="form-group">
            <label><i class="fas fa-info-circle"></i> Keterangan (opsional)</label>
            <input
              type="text"
              v-model="form.keterangan"
              class="form-control"
              placeholder="Contoh: Donasi dari Bpk. Ahmad RT 02"
            />
          </div>

          <!-- Bukti -->
          <div class="form-group">
            <label><i class="fas fa-paperclip"></i> Upload Bukti (gambar)</label>
            <input
              type="file"
              @change="handleFileUpload"
              accept="image/*"
              ref="fileInput"
              class="form-control-file"
              required
            />
          </div>

          <!-- Tombol Simpan -->
          <button type="submit" class="btn btn-success">
            <i class="fas fa-save"></i> Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
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
        sumber_dana: '',
        kategori: '',
        keterangan: '',
        klasifikasi_kas: ''
      },
      bukti: null,
      message: '',
      alertType: 'success',
      semuaKategori: [
        { nama: 'Infaq Harian', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Infaq Kotak Jumat', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Infaq Hamba Allah', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Infaq Biaya Listrik', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Infaq Biaya Air', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Donasi Tetap', jenis: 'Pemasukan', klasifikasi: 'Operasi' },
        { nama: 'Donasi Pembangunan', jenis: 'Pemasukan', klasifikasi: 'Inventaris' },

        { nama: 'Gaji Marbot', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Listrik & Air', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Perlengkapan Ibadah', jenis: 'Pengeluaran', klasifikasi: 'Inventaris' },
        { nama: 'Kegiatan Sosial', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Konsumsi Jamaah', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Pembangunan / Renovasi', jenis: 'Pengeluaran', klasifikasi: 'Inventaris' },
        { nama: 'Kebersihan Masjid', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Santunan Sosial', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Honor Kegiatan', jenis: 'Pengeluaran', klasifikasi: 'Operasi' },
        { nama: 'Lainnyaa', jenis: 'Pemasukan', klasifikasi: 'Operasi' }
      ]
    }
  },
  computed: {
    alertTypeClass() {
      return this.alertType === 'success' ? 'alert-success' : 'alert-danger'
    },
    filteredKategori() {
      return this.semuaKategori.filter(k => k.jenis === this.form.jenis_transaksi)
    }
  },
  watch: {
    'form.kategori'(val) {
      const selected = this.semuaKategori.find(k => k.nama === val)
      this.form.klasifikasi_kas = selected ? selected.klasifikasi : ''
    }
  },
  methods: {
    handleFileUpload(e) {
      this.bukti = e.target.files[0]
    },
    async simpanTransaksi() {
      if (!this.bukti) {
        this.message = 'Silakan pilih file gambar bukti transaksi!'
        this.alertType = 'danger'
        return
      }

      const idMasjid = localStorage.getItem('id_masjid')
      if (!idMasjid) {
        this.message = 'ID Masjid tidak ditemukan. Silakan login ulang.'
        this.alertType = 'danger'
        return
      }

      try {
        const formData = new FormData()
        formData.append('id_masjid', idMasjid)
        formData.append('jenis_transaksi', this.form.jenis_transaksi)
        formData.append('tanggal_transaksi', this.form.tanggal_transaksi)
        formData.append('nominal', this.form.nominal)
        formData.append('sumber_dana', this.form.sumber_dana)
        formData.append('kategori', this.form.kategori)
        formData.append('keterangan', this.form.keterangan)
        formData.append('klasifikasi_kas', this.form.klasifikasi_kas)
        formData.append('bukti', this.bukti)

        const res = await axios.post(
          'https://apikeuanganmasjid-production.up.railway.app/data_keuangan/input',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        this.message = res.data.msg || 'Data berhasil disimpan!'
        this.alertType = 'success'
        this.resetForm()
      } catch (err) {
        this.message = 'Gagal menyimpan data. Silakan coba lagi.'
        this.alertType = 'danger'
      }
    },
    resetForm() {
      this.form = {
        jenis_transaksi: '',
        tanggal_transaksi: '',
        nominal: null,
        sumber_dana: '',
        kategori: '',
        keterangan: '',
        klasifikasi_kas: ''
      }
      this.bukti = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    }
  }
}
</script>
