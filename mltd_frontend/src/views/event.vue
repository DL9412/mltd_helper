<template>
  <div class="event">
    <van-nav-bar title="活动查询" left-text="返回" left-arrow @click-left="routerback"></van-nav-bar>
    <div class="typeSelect">
      <van-tabs v-model="eventType" type="card"  @change="getevents()">
        <van-tab title="传统" name="3"></van-tab>
        <van-tab title="Tour" name="4"></van-tab>
      </van-tabs>
    </div>
    <div class="filter">
      <van-dropdown-menu>
        <van-dropdown-item v-model.number="filterDuration" title="持续天数"
            :options="[{ text: 'all', value: 0 },...durationArr]" />
        <van-dropdown-item v-model="desc" title="排序方式" @change="getevents()"
            :options="[{ text: '正序', value: false },{ text: '倒序', value: true }]" />
      </van-dropdown-menu>
    </div>
    <div class="mainbox">
      <van-cell-group class="contentbox bw">
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.name"
          @click="goEventDetail(item.id)"
          v-show="filterDuration==0 || filterDuration==item.duration"
        />
      </van-cell-group>
    </div>
    <tips :msg="['数据来源 matsurihi.me,感谢日本同僚提供的数据接口']"></tips>
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
  import tips from '@/components/tips.vue'

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
      [Tabs.name]: Tabs,
      tips
    },
    data() {
      return {
        eventType:3,
        list:[],
        durationArr:[],
        filterDuration:0,
        desc:true
      }
    },
    watch: {
    },
    computed: {},
    methods: {
      getevents(){
        var url = `/api/mltd/v1/events/?type=${this.eventType}`
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
      },
      goEventDetail(id){
        this.$router.push({path: `/eventdetail/${id}`})
      }
    },
    mounted() {
      this.getevents()
    },
  }
</script>
<style scoped>
  .typeSelect{
    padding: 20px 20px;
  }
</style>