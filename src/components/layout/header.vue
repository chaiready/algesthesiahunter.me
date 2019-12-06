<template>
  <header class="header-container">
    <div class="header">
      <div class="header-main">
        <div class="logo-main">
          <svg-icon icon-class="logo"></svg-icon>
          <div>lgesthesiafield</div>
        </div>
        <div class="header-slogan">{{ $t('text.slogan') }}</div>
      </div>
      <div class="header-search">
        <svg-icon icon-class="search" class="search"></svg-icon>
        <input type="text" @change="seach" :placeholder="$t('text.search')" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    seach(a) {
      console.log(a)
    },
  },
}
</script>

<style scoped lang="scss">
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  user-select: none;
  backdrop-filter: blur(5px);
  background-color: $module-bg;
  .header {
    width: 1250px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .header-main {
    color: $primary;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-left: 10px;
    .logo-main {
      display: flex;
      align-items: center;
    }
    .header-slogan {
      font-size: 14px;
      margin-left: 48px;
    }
  }
  .header-search {
    height: 60px;
    display: flex;
    align-items: center;
    opacity: 0.8;
    .search {
      transform: translateY(1px);
      font-size: 16px;
    }
    input {
      height: 20px;
      font-size: 12px;
      color: $text;
      padding: 0 8px;
      background-color: transparent;
    }
  }
}

@keyframes logo-blink {
  0% {
    mask-position: -30%;
  }
  100% {
    mask-position: 666%;
  }
}
.logo-main {
  mask-size: 88%;
  mask-position: -30%;
  mask-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.2)
  );
  animation: logo-blink 6s ease-in 1s infinite;
}
</style>
