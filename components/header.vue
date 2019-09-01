<template>
  <div class="header">
      <!-- justify-content:space-between 左右贴边对齐 -->
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
      </div>
      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
      <!-- nuxt-link的作用和使用方式和router-link一样 -->
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/post">旅游攻略</nuxt-link>
      <nuxt-link to="/hotel">酒店</nuxt-link>
      <nuxt-link to="/air">精选机票</nuxt-link>
    </el-row>
    <!-- 登录跳转 -->
    <el-row type="flex" class="login">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
    </el-row>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    box-shadow: 1px 2px 2px #ccc;
}
.logo{
    padding-top:5px;
    width: 180px;
    img{
        display: block;
        width: 100%;
    }
}
.main{
    width: 1000px;
    margin: 0 auto;
}
.navs{
    flex: 1;
    margin-left: 15px;
    a{
        display: block;
        height: 60px;
        line-height: 60px;
        padding:0 30px;
        box-sizing: border-box;
        &:hover{
            color: #409eff;
            border-bottom: 5px #409eff solid;
        }
    }
    // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
    .nuxt-link-exact-active{
        background-color: #409eff;
        color: #fff;
        &:hover{
            color: #fff;
        }
    }
}

</style>