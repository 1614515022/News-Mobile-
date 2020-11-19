<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#app {
  margin-left: auto;
  margin-right: auto;
  max-width: 535px;
  h1 {
    text-align: center;
  }
}
</style>
