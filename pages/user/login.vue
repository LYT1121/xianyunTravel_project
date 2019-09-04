<template>
  <div class="login">
     <!-- 用户登录注册页面 -->
     <!-- 24分栏布局 -->
       <el-row type="flex" justify="center" align="middle" class="main">
           <!-- 表单头部 -->
           <div class="formTab">
               <el-row type="flex" justify="center" class="tabs">
                   <span v-for="(item,index) in [`登录`,`注册`]" :key="index" @click="loginClick(index)" :class="{active:currentTab===index}">
                     {{item}}
                   </span>
               </el-row>
               <!-- 登录功能组件 导入组件-->
               <loginForm v-if="currentTab === 0"></loginForm>
               <!-- 注册功能组件 -->
               <registerForm v-if="currentTab === 1"></registerForm>
           </div>
       </el-row>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm.vue'
import registerForm from '@/components/user/registerForm.vue'
  export default {
    data(){
      return{
        // 判断当前点击的
        currentTab:0
      }
    },
    // 注册登录页面组件和注册页面组件
    components:{
      loginForm,
      registerForm
    },
    methods: {
      loginClick(index){
         this.currentTab = index
      }
    },
    mounted() {
      // console.log(this.$store.state);
      // console.log(this.$store.state.user.userInfo);
    },
  }
</script>

<style lang="less" scoped>
.login{
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main{
    width: 1000px;
    height: 100%;
    position: relative;
    margin: 0 auto;
    .formTab{
      width: 400px;
      margin: 0 auto;
      background-color: #fff;
      overflow: hidden;
      box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
      .tabs{
        span{
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px solid #eee;
          background-color: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active{
            font-weight: 600;
            color: skyblue;
            border-top-color: skyblue;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>