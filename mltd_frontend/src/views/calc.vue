<template>
    <div class="calc">
        <van-nav-bar title="PT计算器" left-text="返回" left-arrow @click-left="routerback" />
        <div class="typeSelect">
            <van-tabs v-model="eventType">
                <van-tab title="传统" name="0"></van-tab>
                <van-tab title="Tour" name="1"></van-tab>
            </van-tabs>
        </div>
        <div class="mainbox" v-if="eventType == 0">
            <van-cell-group class="contentbox bw">
                <van-field v-model.number="startScore" label="当前分数" input-align="right" />
                <van-field v-model.number="targetScore" label="目标分数" input-align="right" />
                <van-field v-model.number="startLvl" label="当前等级" input-align="right" />
                <van-field v-model.number="startExp" label="当前经验" input-align="right" />
                <van-field v-model.number="startEnergy" label="当前体力" input-align="right" />
                <van-field v-model.number="startTicket" label="当前打歌券" input-align="right" />
                <van-field v-model.number="startItem" label="当前道具" input-align="right" />
                <van-field v-model.number="dayRemain" label="剩余天数" input-align="right" />
                <van-switch-cell v-model="work" title="打工10倍打歌" input-align="right" />
                <van-dropdown-menu>
                    <van-dropdown-item v-model.number="multiNormal" title="普通打歌倍率"
                        :options="[{ text: '1', value: 1 },{ text: '2', value: 2 }]" v-if="!work" />
                    <van-dropdown-item v-model.number="multiEvent" title="活动打歌倍率"
                        :options="[{ text: '1', value: 1 },{ text: '2', value: 2 },{ text: '3', value: 3 },{ text: '4', value: 4 }]" />
                </van-dropdown-menu>
            </van-cell-group>
            <div class="contentbox">
                <van-button type="primary" size="large" @click="startCalc">开始计算</van-button>
            </div>
        </div>
        <div class="mainbox" v-if="eventType == 1">
            <van-cell-group class="contentbox bw">
                <van-field v-model.number="startScore" label="当前分数" input-align="right" />
                <van-field v-model.number="targetScore" label="目标分数" input-align="right" />
                <van-field v-model.number="startLvl" label="当前等级" input-align="right" />
                <van-field v-model.number="startExp" label="当前经验" input-align="right" />
                <van-field v-model.number="startEnergy" label="当前体力" input-align="right" />
                <van-field v-model.number="startItem" label="当前道具" input-align="right" />
                <van-field v-model.number="dayRemain" label="剩余天数" input-align="right" />
                <van-switch-cell v-model="work" title="打工代替打歌" input-align="right" />
                <van-switch-cell v-model="maxonly" title="只打五倍" input-align="right" />
                <van-dropdown-menu>
                    <van-dropdown-item v-model.number="multiNormal" title="普通打歌倍率"
                        :options="[{ text: '1', value: 1 },{ text: '2', value: 2 }]" v-if="!work" />
                    <van-dropdown-item v-model.number="multiEvent" title="活动打歌倍率"
                        :options="[{ text: '1', value: 1 },{ text: '2', value: 2 },{ text: '3', value: 3 }]" />
                </van-dropdown-menu>
            </van-cell-group>
            <div class="contentbox">
                <van-button type="primary" size="large" @click="startCalc">开始计算</van-button>
            </div>
            <tips :msg="['本计算仅供参考，可能与实际结果无法完全吻合','实际消耗大概会比计算的少一些吧...天知道多出来那些pt哪来的']"></tips>
        </div>
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
        name: "calc",
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
                eventType: 0,
                startScore: '', //初始分数
                nowScore: 0, //当前分数
                targetScore: '', //目标分数
                startLvl: '', //初始等级
                nowLvl: 0, //当前等级
                startExp: '', //初始经验
                nowExp: 0, //当前经验
                startEnergy: '', //初始体力
                nowEnergy: 0, //当前体力
                startTicket: '', //初始体力
                nowTicket: 0, //当前体力
                startItem: '', //初始物品数
                nowItem: 0, //当前物品数
                nowProgress: 0, //tour当前进度
                mustMaxProgerss: 0,
                mustMaxLimit: 40,
                maxonly: false, //只打五倍，不开的话随机打4.5倍
                normalLiveGetItem: 85, //普通打歌获得道具
                normalLiveGetProgress: 6, //普通打歌获得进度
                normalLiveGetScore: 85, //普通打歌获得pt
                eventLiveGetScore: 537, //活动打歌获得pt
                eventLiveCostItem: 180, //活动打歌花费道具
                workLiveGetItem: 595, //十倍打歌券获得道具
                workLiveGetScore: 595, //十倍打歌券获得pt
                tourNormalLiveGetScore: 140, //tour普通打歌获得pt
                tourWorkGetScore: 82, //tour打工获得pt
                tourEventLiveGetScore: 144, //活动打歌获得pt
                tourEventLiveCostItem: 1, //活动打歌花费道具
                multiNormal: 1,
                multiEvent: 1,
                useJewel: 0,
                liveGetExp30: 306,
                workGetExp30: 215,
                dayRemain: '',
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
            dailyItem(){
                return this.eventType?2:360;
            },
            
        },
        watch: {},
        methods: {
            routerback() {
                this.$router.replace('/')
            },
            startCalc() {
                this.clear()
                this.nowScore = this.startScore || 0;
                this.nowLvl = this.startLvl || 0;
                this.nowExp = this.startExp || 0;
                this.nowEnergy = this.startEnergy || 0;
                this.nowItem = this.startItem || 0;
                this.nowItem += (this.dayRemain || 0) * this.dailyItem; //每天给的道具
                this.nowExp += (this.dayRemain || 0) * 1620; //每天offer给的经验
                this.nowEnergy += (this.dayRemain || 0) * 288 //每天自然回复体力
                this.nowProgress = 0;
                this.calcMain();
            },
            calcMain() {

                if(!this.eventType){
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
                }else{
                    while (this.nowScore < this.targetScore) {
                        this.checkExp();
                        this.checkProgress(); // 检查道具进度
                        let rd = this.rd();
                        let need;
                        if(this.work){
                            need = 30;
                        }else{
                            need = 30*this.multiNormal;
                        }

                        if(!rd){ //倍率不够时,打歌或打工
                            if (this.nowEnergy < need) {  // 检测体力，不够的话补体力
                                this.count.cost += 50;
                                this.nowEnergy += this.lvlMaxEnergy;
                            }
                            if(this.work){  //打工
                                this.nowEnergy -= need;
                                this.nowExp += this.workGetExp30;
                                this.nowScore += this.tourWorkGetScore;
                                this.nowProgress += this.normalLiveGetProgress;
                                this.count.work ++;
                            }else{  //按倍率打歌
                                this.nowEnergy -= need;
                                this.nowExp += this.liveGetExp30;
                                this.nowScore += this.tourNormalLiveGetScore;
                                this.nowProgress += this.normalLiveGetProgress * this.multiNormal;
                                this.count.normal ++;
                            }
                            continue;
                        }else{
                            if(this.nowItem > this.multiEvent*this.tourEventLiveCostItem){ //道具足够，打活动歌
                                this.nowItem -= this.multiEvent*this.tourEventLiveCostItem;
                                this.nowScore += this.tourEventLiveGetScore*rd*this.multiEvent;
                                this.nowExp += this.liveGetExp30;
                                this.count.event ++;
                                continue;
                            }
                            if (this.nowEnergy < need) {  // 检测体力，不够的话补体力
                                this.count.cost += 50;
                                this.nowEnergy += this.lvlMaxEnergy;
                            }
                            if(this.work){  //打工
                                this.nowEnergy -= need;
                                this.nowExp += this.workGetExp30;
                                this.nowScore += this.tourWorkGetScore;
                                this.nowProgress += this.normalLiveGetProgress;
                                this.count.work ++;
                            }else{  //按倍率打歌
                                this.nowEnergy -= need;
                                this.nowExp += this.liveGetExp30;
                                this.nowScore += this.tourNormalLiveGetScore;
                                this.nowProgress += this.normalLiveGetProgress * this.multiNormal;
                                this.count.normal ++;
                            }
                            continue;
                        }
                    }
                }
                this.resultDlg = true;
                Dialog.alert({
                    title: '计算结果',
                    message: `打工次数 ${this.count.work}
普通打歌 ${this.count.normal}
活动打歌 ${this.count.event}
消耗钻石 ${this.count.cost}
最终等级 ${this.nowLvl}
升级 ${this.nowLvl - this.startLvl}`
                })
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
            },
            checkProgress() {
                if(this.nowProgress >= 20){
                    this.nowItem ++;
                    this.nowProgress -= 20;
                }
            },
            rd() {
                if(this.mustMaxProgerss >= this.mustMaxLimit){
                    this.mustMaxProgerss -= this.mustMaxLimit;
                    return 5;
                }
                let r = (Math.floor(Math.random()*4)+7)*0.5; //7,8,9,10*0.5
                if(this.maxonly && r==5) return r; //maxonly
                if(r>4) return r; //include random 4.5
                return false;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bw {
        background: white;
    }

    .contentbox {
        margin: 20px 0;
        padding: 10px 5%;
    }

    .working{
        padding: 30px 0;
        text-align: center;
        color: #999;
        font-size: 16px;
    }
</style>