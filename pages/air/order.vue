<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <orderForm/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                 <orderAside/>         
            </div>
        </el-row>
    </div>
</template>

<script>
// 引入组件
import orderForm from '@/components/air/orderForm.vue'
import orderAside from '@/components/air/orderAside.vue'

export default {
    // 注册组件
    components:{
        // 表单组件
        orderForm,
        // 展示订单组件=>侧边栏
        orderAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>