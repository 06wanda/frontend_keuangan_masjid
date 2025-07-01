<template>
  <div class="container mt-5">
    <FormMasjid @masjid-diperbarui="refreshTabel" />
    <hr />
    <TabelMasjid ref="tabelMasjid" />
  </div>
</template>

<script>
import FormMasjid from './FormMasjid.vue';
import TabelMasjid from './TabelMasjid.vue';

export default {
  components: {
    FormMasjid,
    TabelMasjid
  },
  methods: {
    refreshTabel() {
      this.$refs.tabelMasjid.refreshData();
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
