<template>
  <div class="register">
    <el-form :model="form" ref="form" class="form" :rules="rules">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名手机" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="form.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="您的名字" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="checkPassword">
        <el-input placeholder="请再次确认密码" v-model="form.checkPassword" type="password"></el-input>
      </el-form-item>
      <!-- 注册按钮 -->
      <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义验证规则 =>确认密码
    // 确认密码
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", //用户名
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPassword: "" //确认密码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名手机号", trigger: "blur" },
          {
            pattern: /^1[3578]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        captcha: [
          { required: true, message: "请输入手机收到的验证码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入您的名字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        checkPassword: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 获取验证码
    handleSendCaptcha() {
        if(this.form.username.length !== 11){
            this.$alert('手机号码格式错误', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        });
        return;
        }
        this.$axios({
            url:'/captchas',
            method:'post',
            data:{
                tel:this.form.username
            }
        })
        .then((result) => {
            console.log(result)
            const {code} = result.data
            this.$alert(`模拟手机验证码为：${code}`, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
        });
        })
    },
    // 注册提交
    handleRegSubmit() {
        // 二次验证
        this.$refs.form.validate(valid=>{
            if(valid){
                // 注册提交=>确认密码是不需要传值的，所有把其提出来
                const { checkPassword, ...newForm} = this.form
                this.$axios({
                    url:'/accounts/register',
                    method:'post',
                    data:newForm
                })
                .then((result)=>{
                console.log(result)
                // 成功提示
                this.$message({
                  message: "注册成功，正在跳转",
                  type: "success"
                });
                // 把token值储存到本地
                this.$store.commit("user/setUserInfo", result.data)
                // 跳转到首页
                setTimeout(() => {
                    // replace 页面跳转会销毁上一个页面，点击返回会返回上上个页面
                      this.$router.replace("/")
                }, 1000);
              })
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.form-item {
  margin-bottom: 20px;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>