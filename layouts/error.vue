<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">
          This page could not be found
        </h2>
      </div>
      <p class="error-link">
        <nuxt-link class="link" to="/"> rua~</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.error-page {
  font-family: 'Futura';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @keyframes error-item {
    0% {
      opacity: 0;
      transform: translate3d(0, -30%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  > .error-content {
    > .error-code,
    > .error-link,
    > .error-wrapper-message {
      color: $black-light;
      animation: error-item ease-out both 0.6s;
    }
    .error-link {
      margin-top: 1em;
      > .link {
        color: $black-light;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    > .error-code {
      text-transform: uppercase;
      font-size: 10em;
      font-weight: normal;
      margin: 0;
    }

    > .error-wrapper-message {
      > .error-message {
        font-weight: normal;
        margin-top: 0;
      }
    }
  }
}
</style>
