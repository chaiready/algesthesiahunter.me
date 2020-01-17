<template>
  <footer class="footer-container">
    <span>{{ $t('footer.powered') }} </span>
    <a href="https://nuxtjs.org"
      ><span class="keyworld">{{ $t('footer.nuxt') }}</span></a
    >
    、<a href="https://nestjs.com"
      ><span class="keyworld last-keyworld">{{ $t('footer.nest') }}</span></a
    >
    <span>{{ $t('footer.and') }} </span>
    <span style="margin-left:5px">{{ $t('footer.drive') }} </span>
    <span class="gb">|</span>
    <span>{{ $t('footer.design') }} </span>
    <NuxtLink to="/about">
      <span class="keyworld">{{ $t('footer.me') }}</span>
    </NuxtLink>
    <span class="gb">|</span>
    <span>蜀ICP备20002208号</span>
  </footer>
</template>
<style scoped lang="scss">
.footer-container {
  user-select: none;
  margin-top: 14px;
  background-color: $module-bg;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .keyworld {
    text-decoration: underline;
    margin-left: 4px;
  }
  .last-keyworld {
    margin-right: 4px;
  }
  .gb {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
  }
}
</style>
