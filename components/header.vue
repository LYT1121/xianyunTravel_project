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
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
            <el-row type="flex" align="middle" class="el-dropdown-link">
                <!-- 路由跳转 -->
                <nuxt-link to="#">
                    <!-- 动态头像展示 登录成功打印的数据中获取-->
                    <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">
                    <!-- 用户姓名展示 -->
                    {{$store.state.user.userInfo.user.nickname}}
                </nuxt-link>
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-row>
            <!-- 下拉列表 -->
            <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                           <nuxt-link to="#">个人中心</nuxt-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <!-- 或者不用div 直接加点击事件@click.native="handleLogout" 给第三方组件添加事件时需要添加native-->
                            <div @click="handleLogout">退出</div> 
                        </el-dropdown-item>
                    </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="/user/login" v-else>登录 / 注册</nuxt-link>
    </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
    methods:{
        // 用户退出
        handleLogout(){
            // 清除登录信息
            this.$store.commit("user/clearUserInfo");
            this.$message({
                message: "退出成功",
                type: "success"
            })
        }
    },
    /* mounted() {
      console.log(this.$store.state.user.userInfo);
    }, */
}
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
.el-dropdown-link{
        margin-left: 20px;
        &:hover{
            img{
                border-color: #409eff;
            }
        }
        a{
            display: block;
        }
        img{
            width: 35px;
            height: 35px;
            vertical-align: middle;
            border: 2px solid #fff;
            border-radius: 50px;
        }
    }

</style>