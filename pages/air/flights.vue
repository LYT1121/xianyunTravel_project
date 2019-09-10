<template>
  <div class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flightsContent">
        <!-- 过滤条件 -->
        <div>
          <!-- 初始化数据，并传值 -->
          <flightsFilters :data="cacheFlightsData" @setData="setData"/>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- :data="item" :isShow="item.handleShow" =>组件传值(父组件传值给子组件) -->
          <!-- @unfoldMerge="changeUnfoldMerge"=> 子传父 自定义事件-->
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" :isShow="item.handleShow" @unfoldMerge="changeUnfoldMerge"/>
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </div>
</template>

<script>
// 引入组件
import flightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/FlightsAside.vue";
export default {
  // 注册组件
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 航班总数据
      flightsData: {
        // 看后台请求的数据
        flights: [],
        info: {},
        options: {}
      },
      // 复制航班总数据=>用于筛选时组件之间传递值不受筛选第一次之后影响(再筛选其他就变空值)
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 航班列表数据=>用于后面循环flightsItem组件=>单独出来方便处理分页
      dataList: [],
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      total: 0
    };
  },
  methods: {
    // 初始化dataList数据=>封装
    setDataList() {
      // 按照数学公式切换dataList的值
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // 分页列表数据默认合并
      this.dataList = this.dataList.map(e=>{
        e.handleShow = false
        return e
      })
    },
    // 监听器：监听路由的变化
    watch: {
      $route(){
        this.getDate()
      }
    },
    // 封装获取航班总数据
    getDate() {
      this.$axios({
        url: "airs",
        // 数据=>机票首页传递的5个参数(出发到达城市/城市代码/出发日期)
        params: this.$route.query
      }).then(result => {
        console.log(result);
        this.flightsData = result.data;
        // 复制总数据=>传值过程中不会修改
        this.cacheFlightsData = { ...result.data };
        // this.dataList = this.flightsData.flights;
        // 初始化分页列表数据
        this.setDataList();
        // 总数据
        this.total = this.flightsData.total;
      });
    },
    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      // 设置列表数据=>分页后重新获取
      this.setDataList();
    },
    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    },
    // 控制行展开合并
    changeUnfoldMerge(id){
      // 获取点击的航班列表数据=>判断当前id是否是点击的，取反
      // console.log(this.dataList,id);
      this.dataList = this.dataList.map(e=>{
        if(e.id === id){
          e.handleShow = !e.handleShow
        }
        return e
      })
    },
    // 该方法传递给子组件用于修改ddataList机票列表
    setData(arr){
      // 修改总的航班数据
      this.flightsData.flights = arr;
      // 加载时重新返回分页的第一页
      this.pageIndex = 1;
      // 调用封装好的分页
      this.setDataList();
      // 修改总条数
      this.total = arr.length;
    }
  },
  // 钩子函数=>调用上面事件处理封装好的航班总数据
  mounted() {
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