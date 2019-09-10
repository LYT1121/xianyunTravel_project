<template>
  <div class="main">
    <!-- 订单表单页 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <!-- 下拉列表 -->
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 添加多个乘机人时会显示 可点击删除 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <!-- 添加乘机人按钮 -->
      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
            <!-- 添加多选框change 事件 -->
          <el-checkbox :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" border @change="changeInsurances(item.id)"></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 接收父组件传过来的数据
  props:{
       // 接收机票信息
       data:{
           type:Object,
           default:{}
       }   
  },
  data() {
    return {
      // 乘机人用户数据=>看文档得知需要传的是数组对象
      users: [
        {
          username: "",
          id: ""
        }
      ],
      // 是否购买保险 => 需要id，是一个数组(集合id)=>父组件中已获取
      insurances:[],
      contactName: "",    // 联系人
      contactPhone: "",   // 联系电话
      captcha: "",        // 验证码
      invoice: false,     // 发票字段，默认false
      seat_xid: "",       // 座位id，来自于url的参数
      air: "" ,           // 航班的id,来自于url的id  
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
        // 添加多一个列表
        this.users.push({
            username: "",
            id: ""
        })
    },

    // 移除乘机人
    handleDeleteUser(index) {
        // 把users里的某一项移除 => 数组的方法splice(从第几个开始删除,删除几个[,插入项(多个用数组写)])
        this.users.splice(index,1)
    },
    // 保险选中事件
    changeInsurances(id){
        // 先判断数组中是否已经包含该id => 存在则删除
        if(this.insurances.indexOf(id) > -1){
            this.insurances.splice(this.insurances.indexOf(id),1)
        }else{
            // 不存在则添加
            this.insurances.push(id)
        }
    },

    // 发送手机验证码
    handleSendCaptcha() {},

    // 提交订单
    handleSubmit() {}
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    // 删除按钮通过样式控制=>第一个列表不显示
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>