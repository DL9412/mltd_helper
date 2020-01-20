<template>
    <div class='tips'>
        <p v-for="(item, index) in msg" :key="index">
            <span>*</span>
            {{item.trim()}}
        </p>
    </div>
</template>

<script>
export default {
    name: 'tips',
    props: {
        msg:{
            default:()=>{return []},
            type: Array
        }
    },
    mounted() {
    },
}
</script>

<style scoped>

.tips{
    text-align: left;
    font-size: 12px;
    padding: 0 20px;
}
.tips p{
    padding: 0;
    line-height: 16px;
    color: #aaaaaa;
    text-indent: -10px;
    padding-left: 10px;
}

.tips p span{
    width: 10px;
    display: inline-block;
    text-indent: 0;
}

</style>