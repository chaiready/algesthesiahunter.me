<template>
  <footer class="footer-container">
    <span>{{ $t('footer.day') }} &nbsp;</span>
    <span class="gb">|</span>
    <span>{{ $t('footer.powered') }} &nbsp;</span>
    <span>{{ $t('footer.library') }} &nbsp;</span>
    <span>{{ $t('footer.drive') }}&nbsp;</span>
    <span class="gb">|</span>
    <span>{{ $t('footer.me') }}</span>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.footer-container {
  margin-top: 14px;
  background-color: $module-bg;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  .gb {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
  }
}
</style>
