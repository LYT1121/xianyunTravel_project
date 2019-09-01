<template>
    <div class="box">
        <div class="tab">
            <span v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" @click="aaa(index)" :class="{color:current === index}">
                {{item}}
            </span>
        </div>
        <div v-show="current === 0">
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </div>
        <div v-show="current === 1">
            <ul>
                <li>2</li>
                <li>2</li>
                <li>2</li>
            </ul>
        </div>
        <div>
            <ul v-show="current === 2">
                <li>3</li>
                <li>3</li>
                <li>3</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // 记录当前的状态
                current:0
            }
        },
        methods: {
        aaa(index){
            // 修改current
            this.current = index;
        }
    }
    }
</script>

<style lang="less" scoped>
.box{
    padding: 50px;
    margin-top: 20px;
    .tab{
        padding:0px 10px;
        span{
            cursor:pointer;
        }
    }
    .color{
        color: aquamarine
    }
}
</style>
