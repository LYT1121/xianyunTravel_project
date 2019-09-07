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
        <div></div>
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
import flightsListHead from "@/components/air/flightsListHead.vue";
export default {
  // 注册组件
  components: {
    flightsListHead
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