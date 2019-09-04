<template>
  <div>
    <!-- 表单组件 -->
    <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item class="formItem" prop="username">
        <el-input placeholder="用户名/手机号" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="formItem" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>
      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      // 验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          // 登录请求方式为post  http:127.0.0.1:1337/accounts/login
          /* this.$axios({
            url:"/accounts/login",
            method:'POST',
            data:this.form
          })
          .then((result) => {
            console.log(result)
          }).catch((err) => {
            console.log('登录失败')
          }); */
          // 调用store里请求的数据
          // Action 通过 store.dispatch 方法触发=>可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
          /* 
          仓库store那边没有执行异步actions=>可以这样获取仓库数据
          设置用户信息mutation下的setUserInfo的方法 commit
          commit接受两个参数，第一个mutations参数是方法名，第二个参数数据
          this.$store.commit("user/setUserInfo", res.data)
          */
          this.$store
            .dispatch("user/login", this.form)
            .then(result => {
              console.log(result);
              // 成功提示
              this.$message({
                message: "登录成功，正在跳转",
                type: "success"
              });
              // 跳转到首页
              setTimeout(() => {
                        this.$router.replace("/")
                    }, 1000);
            })
            .catch(err => {
              // 失败提示
              this.$message({
                message: "登录失败，请检查输入是否有误",
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
  .formItem {
    margin-bottom: 20px;
  }
  .form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>