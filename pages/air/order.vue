<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <!-- 父组件接口传值=>把机票数据传递到子组件 -->
                <orderForm :data="infoData"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                 <orderAside :data="infoData"/>         
            </div>
        </el-row>
    </div>
</template>

<script>
// 引入组件
import orderForm from '@/components/air/orderForm.vue'
import orderAside from '@/components/air/orderAside.vue'

export default {
    data(){
        return{
            // 机票的数据
            infoData:{
                // 保险id的集合=>数组=>初始化
                insurances:[],
                seat_infos: {}
            }
        }
    },
    // 事件处理
    mounted(){
        // 把选择机票跳转需要携带的参数解构出来=>获取路由携带的参数用query（$route）=>带r($router)是路由跳转
        const {id,seat_xid} = this.$route.query;
        // 请求机票数据
        this.$axios({
            url: "/airs/" + id, // 或者可以这样写 `/airs/${id}`
            params:{ seat_xid }
        }).then(res=>{
            // 保存机票的数据
            this.infoData = res.data
            // console.log(this.infoData);
        })
    },
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