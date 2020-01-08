<template>
  <div class="navtop">
    <div class="navtitle">
      
    </div>
    <van-cell title="计算器" arrow-direction="right" to="calc" />
    <van-cell title="event" arrow-direction="right" to="event" />
  </div>
</template>

<script>
  import {
    Cell,
    CellGroup
  } from 'vant'

  export default {
    name: 'navtop',
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