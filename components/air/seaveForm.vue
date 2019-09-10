<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="searchTab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:index===currentTab}"
        @click="handleSearchTab(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 表单 -->
    <el-form class="searchContent" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          class="el-autocomplete"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartBlur"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete class="el-autocomplete"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDespSelect"
          @blur="handleDestBlur"
          v-model="form.destCity"></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker 
                type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label>
        <!-- 按钮 -->
        <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <!-- 交换 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入moment
import moment from 'moment'
export default {
  data() {
    return {
      // 头部切换标题
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      // 默认
      currentTab: 0,
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "",   // 到达城市
        destCode: "",   // 到达城市代码
        departDate: ""  // 出发时间
      },
      departData: [], // 存储后台返回的出发城市数组
      destData: []    // 存储后台返回的到达城市数组
    };
  },
  methods: {
    // 头部tab切换
    handleSearchTab(index) {
      // 因为没有做往返，所以给用户提示
      if (index === 1) {
        this.$alert("目前暂时不支持往返", "提示");
      }
    },
    // 出发城市下拉选择时触发 itme=>选中的对象
    handleDepartSelect(item) {
      // 把选中的值设置给form
      this.form.departCity = item.value;
      this.form.departCode = item.sort
    },
    // 出发城市搜索建议事件=>value输入框的值,callback回调函数=>必须调用，参数的值会显示在下拉框中(调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性)
    queryDepartSearch(value,callback){
        // 先判断非空状态
        if(!value){
            // 传递空数组的时候不会出现下拉框 => 回调给一个空数组
            callback([])
            return
        }
        // 发起请求=>根据用户的输入
        this.$axios({
            url:'/airs/city',
            // get方式传值用params
            params:{
                // 输入框的关键字
                name: value
            }
        })
        .then((result) => {
                // console.log(result);
                // 解构数组
                const {data} = result.data
                // 因为原来获取数组中的城市数据有带‘市’,我们并不需要=>先定义一个空数组 给数组中每个对象添加value属性
                let newForm = [];
                // 遍历数组
                data.forEach(e=>{
                    // 添加value属性 replace方法替换字符串中的字
                    e.value = e.name.replace('市','');
                    // 把带有value属性的对象添加到新数组中
                    newForm.push(e);
                })
                // 用户体验=>如果用户输入时不点下拉框，默认选择下拉框的第一个=>有bug，比如本来默认广州，输入广元时会自动插入广州=>广州元
                /* this.form.departCity = newForm[0].value;
                this.form.departCode = newForm[0].sort; */
                // 把转换后的数组赋值给data
                this.departData = newForm
                // 把城市显示到下拉列表中
                callback(newForm)
        })
    },
    // 失焦事件=>出发城市
    handleDepartBlur(){
      this.form.departCity = this.departData[0]?this.departData[0].value:'';
      this.form.departCode = this.departData[0]?this.departData[0].sort:''
    },
    // 失焦事件=>到达城市
    handleDestBlur(){
      this.form.destCity = this.destData[0]?this.destData[0].value:'';
      this.form.destCode = this.destData[0]?this.destData[0].sort:''
    },
    // 到达城市下拉选择时触发
    handleDespSelect(item){
      this.form.destCity = item.value;
      this.form.destCode = item.sort
    },
    // 到达城市搜索建议事件
    queryDestSearch(value,callback){
      // 判断非空
      if(!value){
        callback([]);
        return;
      }
      // 发起请求
      this.$axios({
        url:'/airs/city',
        params:{
          // 输入框的关键字
          name: value
        }
      })
      .then((result)=>{
        // 结构数组
        const {data} = result.data;
        // 定义一个空数组
        let newForm = [];
        // 遍历数组
        data.forEach(e=>{
          // 添加value属性 replace方法替换字符串中的字
          e.value = e.name.replace('市','');
          // 把带有value属性的对象添加到新数组中
          newForm.push(e)
        })
        // 把转换后的数组赋值给data
        this.destData = newForm
        // 把城市显示到下拉列表中
        callback(newForm)
      })
    },
    // 日期 => 需要转换用到moment
    handleDate(value){
      this.form.departDate = moment(value).format(`YYYY-MM-DD`)
    },
    // 切换出发城市和到达城市
    handleReverse(){
      // 解构
      const {departCity,departCode,destCity,destCode} = this.form
      // 交叉赋值
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },
    // 搜索按钮点击事件=>提交表单触发
    handleSubmit(){
      // 把需要验证的表单解构出来
      const {departCity,destCity,departDate} = this.form;
      // 判断非空
      if(!departCity){
        this.$alert('出发城市不能为空！','提示')
        return
      }
      if(!destCity){
        this.$alert('到达城市不能为空！','提示')
        return
      }
      if(!departDate){
        this.$alert('日期不能为空哦！','提示')
        return
      }
      // 添加本地存储=>机票列表页需要展示搜索记录
      const airs = JSON.parse(localStorage.getItem('airs') || `[]`);// 获取本地存储，转换为数组
      // 把数组添加到总的数据form中
      airs.push(this.form);
      // 把新的数组存到本地=>转换字符串
      localStorage.setItem("airs", JSON.stringify(airs));
      // 跳转到机票列表页 /air/flights
      this.$router.push({
        path: "/air/flights",
        // url携带的参数
        query: this.form
      })
    }
  }
};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px solid #ddd;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
  .searchTab {
    span {
      display: block;
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px #eee solid;
      background: #eee;
    }
    .active {
      border-top-color: orange;
      background: #fff;
    }
    i {
      margin-right: 5px;
      font-size: 18px;
      &:first-child {
        font-size: 16px;
      }
    }
  }
  .searchContent {
    padding: 15px 50px 15px 15px;
    position: relative;
    .el-autocomplete {
      width: 100%;
    }
    .reverse {
      position: absolute;
      top: 35px;
      right: 15px;
      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: -35px;
        width: 25px;
        height: 1px;
        background: #ccc;
      }
      &:after {
        top: 0;
      }
      &:before {
        top: 60px;
      }
      span {
        display: block;
        position: absolute;
        top: 20px;
        right: 0;
        font-size: 12px;
        background: #999;
        color: #fff;
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;

        &:after,
        &:before {
          display: block;
          content: "";
          position: absolute;
          left: 10px;
          width: 1px;
          height: 20px;
          background: #ccc;
        }

        &:after {
          top: -20px;
        }

        &:before {
          top: 20px;
        }
      }
    }
  }
}
</style>