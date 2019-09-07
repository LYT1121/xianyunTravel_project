<template>
  <div class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flightsContent">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead/>
        </div>

        <!-- 航班信息 -->
        <div>
            <!-- :data="item"=>组件传值(父组件传值给子组件) -->
            <flightsItem v-for="(item,index) in dataList" :key="index" :data="item"/>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </div>
</template>

<script>
// 引入组件
import flightsListHead from "@/components/air/flightsListHead.vue"
import flightsItem from "@/components/air/flightsItem.vue"
export default {
  // 注册组件
  components: {
    flightsListHead,
    flightsItem
  },
  data(){
      return{
          // 航班总数据
          flightsData:{},
          // 航班列表数据=>用于后面循环flightsItem组件=>单独出来方便处理分页
          dataList:[]
      }
  },
  methods:{
    // 封装获取航班总数据
    getDate(){
          this.$axios({
          url:'airs',
          // 数据=>机票首页传递的5个参数(出发到达城市/城市代码/出发日期)
          params:this.$route.query
      }).then((result)=>{
          console.log(result);
          this.flightsData = result.data;
          this.dataList = this.flightsData.flights
      })
    }
  },
  // 钩子函数=>调用上面事件处理封装好的航班总数据
  mounted () {
      this.getDate();
  }
};
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flightsContent {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>