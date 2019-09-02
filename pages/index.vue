<template>
  <div class="homePage">
    <!-- 轮播图  interval自动切换的时间间隔，单位为毫秒  若将arrow设置为always，则会一直显示-->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <!-- 替换template的图片地址为$axios.defaults.baseURL -->
        <!-- background-size:contain contain 背景图片尺寸自适应宽高 -->
        <div
          class="Bnimg"
          :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="content">
      <div class="searchBar">
        <!-- tab栏 -->
        <el-row type="flex" class="searchTab">
          <span
            v-for="(item,index) in searchOption"
            :key="index"
            @click="handleOption(index)"
            :class="{active:current===index}"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" class="tabInput">
          <input :placeholder="searchOption[current].placeholder" @keydown.enter="handleSearch" v-model="inputValue"/>
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 定义tab栏数据
      searchOption: [
        {
          name: "攻略",
          placeholder: "请输入城市"
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          name: "机票",
          placeholder: ""
        }
      ],
      // 当前索引
      current: 0,
      // 输入框的值
      inputValue:'',
    };
  },
  // 事件处理
  methods: {
    // tab栏切换
    handleOption(index) {
      // 点击索引为2时，代表点击的是机票
      if (index === 2) {
        // 跳转=>pages可以直接访问，可以通用路由的方法
        this.$router.push("/air");
      }
      // 把当前点击的索引赋值给current
      this.current = index;
    },
    // 搜索按钮事件
    handleSearch() {
      if(this.current === 0){
        this.$router.push(`/post?city=${this.inputValue}`);
      }else if(this.current === 1){
        this.$router.push(`/hotel?city=${this.inputValue}`);
      }
    }
  },
  // 钩子函数=>一开始就加载
  mounted() {
    // 轮播图请求地址：http:127.0.0.1:1337/scenics/banners
    this.$axios({
      url: "/scenics/banners"
    })
      .then(result => {
        // 获取数据=>看文档接口
        console.log(result);
        if (result.request.status === 200) {
          const { data } = result.data;
          // 赋值给轮播图数据banners
          this.banners = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.homePage {
  min-width: 1000px;
  margin: 0 auto;
  position: relative; // 相对定位
  /deep/.el-carousel__container {
    height: 700px;
  }
  .Bnimg {
    width: 100%;
    height: 100%;
  }
  .content {
    z-index: 5;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translateX(-50%);
    border-top: 1px transparent solid;
    .searchBar {
      width: 552px;
      margin: 0 auto;
    }
    .searchTab {
      // 颜色变化
      .active {
        i {
          color: #333;
        }
        &::after {
          background-color: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          border-radius: 1px 2px 0 0;
        }
      }
    }
    .tabInput {
      width: 550px;
      height: 46px;
      background-color: #fff;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-radius: 0 4px 4px 4px;
      border-top: none;
      box-sizing: unset;
      input {
        flex: 1;
        height: 46px;
        outline: none;
        font-size: 16px;
        border: 0;
        text-indent: 1em;
      }
      i {
        font-size: 30px;
        line-height: 45px;
        padding-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>