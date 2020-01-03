<template>
    <div class="calc">
        <van-nav-bar title="PT计算器" left-text="返回" left-arrow @click-left="routerback" />
        <div class="mainbox">
            <van-cell-group>
                <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
                <van-field v-model="password" label="密码" placeholder="请输入密码" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import {
        NavBar,
        Cell,
        CellGroup,
        Field
    } from 'vant'
    export default {
        name: "calc",
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [NavBar.name]: NavBar
        },
        data() {
            return {
                startScore: 0, //初始分数
                nowScore: 0, //当前分数
                targetScore: 0, //目标分数
                startLvl: 1, //初始等级
                nowLvl: 0, //当前等级
                startExp: 0, //初始经验
                nowExp: 0, //当前经验
                startEnergy: 0, //初始体力
                nowEnergy: 0, //当前体力
                startTicket: 0, //初始体力
                nowTicket: 0, //当前体力
                startItem: 0, //初始物品数
                nowItem: 0, //当前物品数
                dailyItem: 360, //每日奖励物品数
                normalLiveGetItem: 85, //普通打歌获得道具
                normalLiveGetScore: 85, //普通打歌获得pt
                eventLiveGetScore: 537, //活动打歌获得pt
                eventLiveCostItem: 180, //活动打歌花费道具
                workLiveGetItem: 595, //十倍打歌券获得道具
                workLiveGetScore: 595, //十倍打歌券获得pt
                multiNormal: 1,
                multiEvent: 1,
                useJewel: 0,
                liveGetExp30: 306,
                workGetExp30: 215,
                dayRemain: 0,
                work: false,
                count: {
                    work: 0,
                    normal: 0,
                    event: 0,
                    cost: 0
                },
                resultDlg: false,
                model: {}
            }
        },
        computed: {
            nextLvlNeed() {
                return 100 * (this.nowLvl - 1) + 50;
            },
            lvlMaxEnergy() {
                let l = this.nowLvl;
                if (l < 60) {
                    return 60 + Math.floor(l / 2)
                }
                if (l < 150) {
                    return 90 + Math.floor((l - 60) / 3)
                }
                if (l < 426) {
                    return 120 + Math.floor((l - 150) / 4)
                }
                if (l < 586) {
                    return 189 + Math.floor((l - 426) / 5)
                }
                if (l < 700) {
                    return 221 + Math.floor((l - 586) / 6)
                }
                return 240
            },
            watchStatus() {
                return {
                    nowScore: this.nowScore, //当前分数
                    nowLvl: this.nowLvl, //当前等级
                    nowExp: this.nowExp, //当前经验
                    nowEnergy: this.nowEnergy, //当前体力
                    nowTicket: this.nowTicket, //当前打歌券
                    nowItem: this.nowItem, //当前物品数
                }
            }
        },
        watch: {},
        methods: {
            routerback() {
                this.$router.replace('/')
            },
            startCalc() {
                this.clear()
                this.nowScore = this.startScore;
                this.nowLvl = this.startLvl;
                this.nowExp = this.startExp;
                this.nowEnergy = this.startEnergy;
                this.nowItem = this.startItem;
                this.nowItem += this.dayRemain * this.dailyItem; //每天给的道具
                this.nowExp += this.dayRemain * 1620; //每天offer给的经验
                this.nowEnergy += this.dayRemain * 288 //每天自然回复体力
                this.calcMain();
            },
            calcMain() {
                while (this.nowScore < this.targetScore) {
                    this.checkExp();
                    // 道具足够时优先打活动歌
                    if (this.eventLiveCostItem * this.multiEvent < this.nowItem) {
                        this.nowItem -= this.eventLiveCostItem * this.multiEvent;
                        this.nowScore += this.eventLiveGetScore * this.multiEvent;
                        this.nowExp += this.liveGetExp30;
                        this.count.event++;
                        continue;
                    }
                    if (this.work) {
                        // 打歌券足够时优先打歌
                        if (this.nowTicket >= 300) {
                            this.nowTicket -= 300;
                            this.nowScore += this.workLiveGetScore;
                            this.nowItem += this.workLiveGetItem;
                            this.count.normal++
                            continue;
                        }
                        // 打歌券不够，检测体力，不够的话补体力
                        if (this.nowEnergy < 30) {
                            this.count.cost += 50;
                            this.nowEnergy += this.lvlMaxEnergy;
                            continue;
                        }
                        // 打歌券不够，体力足够，打一次工
                        this.nowEnergy -= 30;
                        this.nowTicket += 30;
                        this.nowExp += this.workGetExp30;
                        this.count.work++;
                    } else {
                        // 体力不够时恢复体力
                        if (this.nowEnergy < (30 * this.multiNormal)) {
                            this.count.cost += 50;
                            this.nowEnergy += this.lvlMaxEnergy;
                            continue;
                        }
                        // 体力足够时正常打歌
                        this.nowEnergy -= (30 * this.multiNormal);
                        this.nowScore += this.normalLiveGetScore * this.multiNormal;
                        this.nowItem += this.normalLiveGetItem * this.multiNormal;
                        this.nowExp += this.liveGetExp30;
                        this.count.normal++;
                    }
                }
                this.resultDlg = true;
            },
            checkExp() {
                if (this.nowExp >= this.nextLvlNeed) {
                    this.nowExp -= this.nextLvlNeed;
                    this.nowLvl += 1;
                    this.nowEnergy += this.lvlMaxEnergy;
                }
            },
            clear() {
                for (let n in this.count) {
                    this.count[n] = 0;
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .mainbox{
        padding: 20px 5%;
    }
</style>