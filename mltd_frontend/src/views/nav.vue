<template>
  <div class="nav">
    <div class="navtitle">
      
    </div>
    <van-cell title="计算器" arrow-direction="right" to="calc" />
  </div>
</template>

<script>
  import {
    Cell,
    CellGroup
  } from 'vant'

  export default {
    name: 'nav',
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>