<template>
  <div class="event">
    <van-nav-bar title="活动详情" left-text="返回" left-arrow @click-left="routerback"></van-nav-bar>
    <van-cell-group title="最终档线图">
      <van-collapse v-model="activeShow">
        <van-collapse-item title="最终档线" name="1">
          <canvas id="lastScoreChart" style="width: 100%;height: 300px;"></canvas>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
    <tips :msg="['此图表为每个活动最后一次收集到的数据，对正在进行的活动同理，并非预测档线']"></tips>
    <van-cell-group title="档位趋势图">
      <!-- <div v-for="(r, i) in rankLine" :key="i">
        <van-cell :title="'Rank '+r"></van-cell>
        <canvas :id="'rank'+r" style="width: 100%;height: 300px;"></canvas>
      </div> -->
      <van-collapse v-model="activeRank">
        <van-collapse-item :title="'Rank '+r" :name="r" v-for="(r, i) in rankLine" :key="i">
          <canvas :id="'rank'+r" style="width: 100%;height: 300px;"></canvas>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
    <tips :msg="['数据来源 matsurihi.me,感谢日本同僚提供的数据接口']"></tips>

  </div>
</template>

<script>
  import moment from 'moment'
  require('@antv/f2/lib/interaction/pan')
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
    Tabs,
    Collapse,
    CollapseItem
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
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      tips
    },
    data() {
      return {
        activeShow: ['1'],
        activeRank: [],
        lastScoreArr: [],
        mainArr: [],
        rankTimeChart: {},
        rankLine: [100, 2500, 5000, 10000, 25000]
      }
    },
    watch: {},
    computed: {
      eid() {
        return this.$route.params.id;
      }
    },
    methods: {
      getdetail() {
        var url =
          `/api/mltd/v1/events/${this.eid}/rankings/logs/eventPoint/${this.rankLine.join(',')}`
        this.$axios.get(url)
          .then((res) => {
            this.mainArr = res.data;
            this.setLastScoreChart();
            this.setRankTimeChart();
          }).catch((err) => {});
      },
      routerback() {
        this.$router.back()
      },
      setLastScoreChart() {
        this.lastScoreArr = [];
        this.mainArr.forEach(ele => {
          this.lastScoreArr.push({
            rank: String(ele.rank),
            score: ele.data[ele.data.length - 1].score
          })
        });
        this.lastScoreArr.reverse();
        let chart = new this.$F2.Chart({
          id: 'lastScoreChart',
          pixelRatio: window.devicePixelRatio, // 指定分辨率
          animate: true
        });
        chart.source(this.lastScoreArr);
        chart.legend(false);
        chart
          .interval()
          .position('rank*score')
          .color('rank', ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7']);
        chart.render();
      },
      setRankTimeChart() {
        this.$nextTick(() => {
          this.rankLine.forEach((r, i) => {
            let data = this.mainArr[i].data;
            data.forEach(item => {
              item.time = moment(item.summaryTime).format('YYYY-MM-DD HH:mm:ss')
              delete item.summaryTime;
            })
            let charts = new this.$F2.Chart({
              id: 'rank' + r,
              pixelRatio: window.devicePixelRatio, // 指定分辨率
              animate: true
            });
            charts.source(data, {
              time: {
                type: 'timeCat',
                mask: 'MM-DD HH:mm'
              }
            });
            charts.tooltip({
              showCrosshairs: true,
              showItemMarker: true,
              onShow: function onShow(ev) {
                const items = ev.items;
                items[0].name = items[0].title;
                items[0].value = items[0].value;
              }
            });
            charts.line().position('time*score');
            charts.render();
          })
        })
      }
    },
    mounted() {
      this.activeRank = [...(this.rankLine)]
      this.getdetail()
    },
  }
</script>
<style scoped>
  .typeSelect {
    padding: 20px 20px;
  }
</style>