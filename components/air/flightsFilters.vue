<template>
  <div class="filters">
    <er-row type="flex" justify="space-between" class="fTop" alige="middle">
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
    </er-row>
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
    handleAirport(value) {},

    // 选择出发时间时候触发
    handleFlightTimes(value) {},

    // 选择航空公司时候触发
    handleCompany(value) {},

    // 选择机型时候触发
    handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {}
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