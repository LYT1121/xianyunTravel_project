<template>
  <div class="flighrItem">
    <!-- 显示的机票信息 -->
    <div @click="handleShowRecommend">
      <el-row type="flex" align="middle" class="flightInfo">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="InfoCenter">
            <el-col :span="8" class="flightAirport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flightTime">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flightAirport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flightRight">
          ￥
          <!-- <span class="sellPrice">{{data.base_price}}</span>起 -->
          <span class="sellPrice">{{floorPrice}}</span>起
        </el-col>
      </el-row>
    </div>
    <!-- 下拉的座位列表 -->
    <div class="flightRecommend" v-if="isShow">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flightSell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="sellLeft">
              <span>{{item.group_name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.par_price}}</el-col>
            <el-col :span="3" class="chooseButton">
              <el-button type="warning" size="mini" @click="handleChoose(data.id, item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制列表的展开
      // isShow: false
    };
  },
  // props: ["data"]
  props: {
    // data表示组件可以接收的属性
    data: {
      // type不能修改，用于声明属性的类型
      type: Object,
      // 调用组件之间不传值，用default默认值
      default: {}
    },
    // 把控制列表的展开传递到父组件
    isShow:{
      // type 为Boolean属性类型
      type: Boolean,
      default:false
    }
  },
  computed: {
    // 计算属性=>计算相差时间
    rankTime() {
      // 出发和到达时间=>返回值是数组
      const dep = this.data.dep_time.split(":"); // 出发时间
      const arr = this.data.arr_time.split(":"); // 到达时间
      // 判断=>如果是第二天凌晨时间段，需加24小时
      if (arr[0] < dep[0]) {
          arr[0]+=24
      }
      // 把时间转换为分钟
      const depVal = dep[0] * 60 + +dep[1];
      const arrVal = arr[0] * 60 + +arr[1];
      // 出发与到达时间相减
      let distime = arrVal - depVal;
      // 得到时间差
      return `${Math.floor(distime / 60)}时${distime % 60}分`;
    },
    // 计算属性=>把最低价格展示
    floorPrice(){
        // 创建一个空数组，把价格收集起来
        let minPrice = [];
        // 遍历原价格数组
        this.data.seat_infos.forEach(e=>{
            minPrice.push(e.par_price)
        })
        // 使用math中的方法
        let min = Math.min.apply(null, minPrice)
        return min;
        }
  }, 
  methods:{
      // 控制推荐列表的展开收起
      handleShowRecommend(){
        console.log(this.data.id);
          // this.isShow = !this.isShow
          this.$emit('unfoldMerge',this.data.id)
      },
      // 给选定按钮添加点击事件实现跳转
      handleChoose(id,seatId){
        this.$router.push({
          path:'/air/order',
          query:{
            id,
            seat_xid:seatId
          }
        })
      }
  }
};
</script>

<style lang="less" scoped>
.flighrItem {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  .flightInfo {
    padding: 15px;
    cursor: pointer;
    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
    .InfoCenter {
      padding: 0 30px;
      text-align: center;
      .flightTime {
        span {
          display: inline-block;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          color: #999;
        }
      }
      .flightAirport {
        strong {
          display: block;
          font-size: 24px;
          font-weight: normal;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .flightRight {
      .sellPrice {
        font-size: 24px;
        color: orange;
        margin: 0 2px;
      }
    }
  }
  .flightRecommend {
    background-color: #f6f6f6;
    border-top: 1px solid #eee;
    padding: 0 20px;
    .flightSell {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      &:last-child {
        border-bottom: none;
      }
      .sellLeft {
        font-size: 12px;
        span {
          color: green;
        }
      }
      .price {
        font-size: 20px;
        color: orange;
      }
      .chooseButton {
        text-align: center;
        color: #666;
        button {
          display: block;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>