<template>
  <div id="app">
    <router-view />
    <Global></Global>
  </div>
</template>

<script>
  import Global from './components/Global.vue'

  export default {
    name: 'app',
    components: {
      Global
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>