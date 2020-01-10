<template>
  <div class="navtop">
    <div class="navtitle">
      <h2>MLTD helper</h2>
      <div class="board">
        {{bordeInfo}}
      </div>
    </div>
    <van-cell-group title="当前活动信息" v-if="nowEvent">
      <van-cell title="开始时间" :value="moment(nowEvent.schedule.beginDate).format('YYYY-MM-DD HH:mm')" />
      <van-cell title="结束时间" :value="moment(nowEvent.schedule.endDate).format('YYYY-MM-DD HH:mm')" />
      <van-cell title="剩余时间" :value="timeRemain(nowEvent.schedule.endDate)"/>
      <van-cell title="距开启四倍还有" v-if="nowEvent.schedule.boostBeginDate" :value="timeRemain(nowEvent.schedule.boostBeginDate)"/>
      <van-cell title="活动类型" :value="eventType[nowEvent.type]"/>
      <van-cell title="属性up" v-if="nowEvent.appealType" :value="appealType[nowEvent.appealType]" :value-class="appealType[nowEvent.appealType]"/>
    </van-cell-group>
    <van-cell-group title="小工具">
      <van-cell title="计算器" :is-link="true" arrow-direction="right" to="calc" />
      <van-cell title="活动列表" :is-link="true" arrow-direction="right" to="event" />
    </van-cell-group>
  </div>
</template>

<script>
  import {
    Cell,
    CellGroup
  } from 'vant'
  import moment from 'moment'

  export default {
    name: 'navtop',
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {
        nowEvent: false,
        loading: true,
        eventType:{
          1:'THEATER SHOW TIME☆',
          2:'ミリコレ！',
          // 3:'プラチナスターシアター(theater)',
          // 4:'プラチナスターツアー(tour)',
          3:'theater',
          4:'tour',
          5:'周年記念イベント',
          6:'MILLION LIVE WORKING☆',
          7:'エイプリルフール',
          9:'ミリコレ！（ボックスガシャ）',
        },
        appealType: {
          1:'Vo',
          2:'Da',
          3:'Vi'
        }
      }
    },
    computed: {
      bordeInfo() {
        if (this.loading) return `欢迎！`
        if (!this.nowEvent) return `欢迎！现在没有在进行的活动`
        return `欢迎！现在正在进行的活动是${this.nowEvent.name}`
      },
      moment() {
        return moment;
      }
    },
    methods: {
      getnow() {
        var url =
          `/api/mltd/v1/events/?at=${moment().format()}`
        this.$axios.get(url)
          .then((res) => {
            if (res.data.length > 0) {
              this.nowEvent = res.data[0];
            }
            this.loading = false
          }).catch((err) => {
            this.loading = false
          });
      },
      timeRemain(e){
        let now = new Date();
        let end = new Date(e);
        let t = end.getTime() - now.getTime();
        if(t<=0){
          return 0
        }
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % (1000 * 60)) / 1000);
        return days + "天" + hours + "小时" + minutes + "分钟";
      }
    },
    created() {
      this.getnow()
    },
  }
</script>
<style scoped>
  .navtitle {
    background: white;
    padding: 20px;
    margin-bottom: 30px;
  }

  .navtitle h2 {
    margin-top: 10px;
    text-align: center;
  }

  .Vo{
    color: red;
  }
  .Da{
    color: blue;
  }
  .Vi{
    color: yellow;
  }
</style>