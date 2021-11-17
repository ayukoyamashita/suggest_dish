<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
</script>

<style lang="scss">
  @import './assets/scss/destyle.css';
  @import './assets/scss/_settings.scss';

  * {
    color: $color-text;
    font-family: YuGothic,sans-serif;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
