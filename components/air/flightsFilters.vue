<template>
  <div class="filters">
    <el-row type="flex" justify="space-between" class="fTop" alige="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <!-- 起飞机场下拉列表 -->
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option v-for="(item,index) in data.options.airport" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
             v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 筛选 -->
    <div class="filter-cancel">
    <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        airport:'',// 机场
        flightTimes:'',// 起飞时间
        company:'',// 航空公司
        airSize:'',// 机型
        // 后台获取的机型数据是：显示label: "大", 返回value: "L"=>重新定义
        airSizeList:[
            {label:'大',value:'L'},
            {label:'中',value:'M'},
            {label:'小',value:'S'}
        ]
    };
  },
  // data是flights组件获取的大的数据=>父组件传值给子组件=>flights/info/options/total
  props:{
      data:{
          type:Object,
          default:{}
      }
  },

  methods: {
    // 选择机场时候触发
    handleAirport(value) {
        // 过滤数据，只保留选中的机场的数据 filter()=>过滤数组中不满足条件的值，返回一个新数组不改变原数组的值
        const arr = this.data.flights.filter(v=>{
            return v.org_airport_name === value;
        })
        // 子组件向父组件传值
        this.$emit('setData',arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
        // 数据解构赋值 const [from,to] = [6,12]
        const [from,to] = value.split(',');// 以逗号分隔
        // 过滤数据，只保留选中的出发时间的航班
        const arr = this.data.flights.filter(v=>{
            // 每趟航班出发时间的小时=>只取以:分隔的小时数就好
            const current = v.dep_time.split(":")[0];
            // 需要满足在某个时间段 => 前面加+,保证是数字
            return +current >= +from && +current < +to
        })
        // 子组件向父组件传值
        this.$emit('setData',arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
        // 过滤数据，只保留选中的航空公司的数据 filter()=>过滤数组中不满足条件的值，返回一个新数组不改变原数组的值
        const arr = this.data.flights.filter(v=>{
            return v.airline_name === value;
        })
        // 子组件向父组件传值
        this.$emit('setData',arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
        // 过滤数据，只保留选中的机型数据 filter()=>过滤数组中不满足条件的值，返回一个新数组不改变原数组的值
        const arr = this.data.flights.filter(v=>{
            return v.plane_size === value;
        })
        // 子组件向父组件传值
        this.$emit('setData',arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
        // 让所有的值为空
        this.airport = "";          // 机场
        this.flightTimes =  "";     // 出发时间
        this.company = "";          // 航空公司
        this.airSize = "";         // 机型大小
        this.pageIndex = 1;  // 返回分页第一页
        // 返回全部的数据
        this.$emit('setData',this.data.flights)
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  margin-bottom: 20px;
  .fTop {
    > div {
      /deep/ .el-select {
        margin-left: 10px;
      }
    }
  }
  .filter-cancel{
        margin-top:10px;
    }
}
</style>