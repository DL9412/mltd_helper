<template>
  <div class="event">
    <van-nav-bar title="活动详情" left-text="返回" left-arrow @click-left="routerback"></van-nav-bar>
    {{$route.params.id}}
  </div>
</template>

<script>
  import {
    NavBar,
    Cell,
    CellGroup,
    Field,
    SwitchCell,
    DropdownMenu,
    DropdownItem,
    Button,
    Dialog,
    Tab,
    Tabs
  } from 'vant'

  export default {
    name: 'event',
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [NavBar.name]: NavBar,
      [SwitchCell.name]: SwitchCell,
      [DropdownMenu.name]: DropdownMenu,
      [DropdownItem.name]: DropdownItem,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs
    },
    data() {
      return {
        eventType:3,
        list:[],
        durationArr:[],
        filterDuration:0,
        desc:false
      }
    },
    watch: {
    },
    computed: {},
    methods: {
      getevents(){
        var url = `https://api.matsurihi.me/mltd/v1/events/?type=${this.eventType}`
        this.$axios.get(url)
        .then((res) => {
          this.durationArr = []
          let durationTmpArr = []
          res.data.forEach(item=>{
            let startTime = new Date(item.schedule.beginDate);
            let endTime = new Date(item.schedule.endDate);
            item.duration = Math.floor((endTime-startTime)/1000/60/60/24);
            durationTmpArr.push(item.duration);
          });
          let tmp = new Set(durationTmpArr);
          durationTmpArr = this.$comm.quickSort([...tmp]);
          durationTmpArr.forEach(i=>{
            this.durationArr.push({
              text:i,
              value:i
            })
          })
          if(this.desc){
            res.data.reverse();
          }
          this.list = res.data;
        }).catch((err) => {
        });
      },
      routerback() {
          this.$router.replace('/')
      }
    },
    mounted() {
      console.log(this.$route.params.id);
    },
  }
</script>
<style scoped>
  .typeSelect{
    padding: 20px 20px;
  }
</style>