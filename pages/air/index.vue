<template>
  <div>
    <div class="container">
      <!-- 国内机票 -->
      <h2 class="airTitle">
        <span class="iconfont iconfeiji"></span>
        <i>国内机票</i>
      </h2>
      <!-- 搜索栏 -->
      <el-row type="flex" justify="space-between">
        <!-- 搜索表单 -->
        <seaveForm/>
        <!-- 广告区域 -->
        <div class="banner">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </el-row>
      <!-- 广告 -->
      <el-row type="flex" class="statement">
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF"></i>
          <span>100%航协认证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont iconbaozheng" style="color:green;"></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>
          <span>7x24小时服务</span>
        </el-col>
      </el-row>
      <!-- 特价机票 -->
      <h2 class="airSaleTitle">
        <span class="iconfont icontejiajipiao"></span>
        <i>特价机票</i>
      </h2>
      <!-- 优惠机票区域 -->
      <div class="airSale"></div>
    </div>
  </div>
</template>

<script>
// 引入搜索组件
import seaveForm from '@/components/air/seaveForm'
export default {
  data(){
    return{}
  },
  // 注册组件
  components:{
    seaveForm
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .airTitle {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: orange;
    span {
      font-size: 20px;
    }
  }
  .statement {
    margin: 15px 0;
    border: 1px #ddd solid;
    background: #f5f5f5;
    height: 58px;
    padding: 10px 0;
    box-sizing: border-box;
    > div {
      text-align: center;
      line-height: 38px;
      border-right: 1px #ddd solid;

      &:last-child {
        border-right: none;
      }

      * {
        vertical-align: middle;
      }

      i {
        font-size: 30px;
      }
    }
  }
  .airSaleTitle {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: #409eff;
    span {
      font-size: 20px;
    }
  }
}
</style>