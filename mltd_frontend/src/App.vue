<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    },
    data() {
      return {}
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
    overflow: auto;
    background: #ececec;
  }
</style>