<template>
  <div class="app">
    <!-- 路由出口上 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
body,
html,
.app {
  width: 100%;
  height: 100%;
}
</style>