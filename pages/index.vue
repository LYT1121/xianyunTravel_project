<template>
  <div class="homePage">
    <!-- 轮播图  interval自动切换的时间间隔，单位为毫秒  若将arrow设置为always，则会一直显示-->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <!-- 替换template的图片地址为$axios.defaults.baseURL -->
        <!-- background-size:contain contain 背景图片尺寸自适应宽高 -->
        <div class="Bnimg" :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 轮播图数据
      banners:[]
    }
  },
  // 钩子函数=>一开始就加载
  mounted(){
    // 轮播图请求地址：http:127.0.0.1:1337/scenics/banners
    this.$axios({
      url:'/scenics/banners'
    }).then((result) => {
      // 获取数据=>看文档接口
      console.log(result)
      if(result.request.status===200){
        const {data} = result.data
        // 赋值给轮播图数据banners
        this.banners = data
      }
    }).catch((err) => {
      console.log(err)
    });
  },
}
</script>

<style lang="less" scoped>
.homePage{
  min-width: 1000px;
  margin: 0 auto;
  position: relative;// 相对定位
  /deep/.el-carousel__container{
    height: 700px;
  }
  .Bnimg{
    width: 100%;
    height: 100%;
  }
}
</style>