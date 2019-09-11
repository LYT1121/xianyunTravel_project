<template>
  <div class="post">
    <!-- 左边 -->
    <el-row type="flex" class="leftContent" :span="8">
      <!-- 导航菜单 -->
      <el-menu class="nav">
      <el-menu-item class="menuItem" v-for="(item,index) in menuList" :key="index" @mouseover.native="childShow(index)" @mouseout.native="childHide">
        <template slot="title">
              <span>
                {{item.type}}
              </span>
        </template>
      </el-menu-item>
      <div class="childrenList" v-show="isShow">
                <ul>
                  <li v-for="(child,index) in childrenList" :key="index">
                    <span class="one">{{index+1}}</span>
                    <span class="two">{{child.city}}</span>
                    <span class="three">{{child.desc}}</span>
                  </li>
                </ul>
      </div>
    </el-menu>
    </el-row>
    <!-- 右边 -->
    <el-row type="flex" class="rightContent" :span="16">
    <!-- https://github.com/hsian/vue-word-editor 富文本框使用 -->
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        menuList:[],
        childrenList:[],
        isShow:false
      }
    },
    mounted () {
      this.$axios({
        url:'/posts/cities'
      })
      .then((result) => {
        console.log(result);
        this.menuList = result.data.data
      }).catch((err) => {
        
      });
    },
    methods: {
      childHide(){
        this.isShow = false
      },
      childShow(index){
        this.isShow = true
        this.childrenList = this.menuList[index].children
      }
    },
  }
</script>

<style lang="less" scoped>
.post{
  width: 1000px;
  margin: 20px auto;
  display: flex;
  .leftContent{
    margin-right: 40px;
    .nav{
      z-index: 5;
      position: relative;
      width: 260px;
      .menuItem{
        font-size: 14px;
        color: #000;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ccc;
        border-top: none;
        &:first-child{
          border-top: 1px solid #ccc;
        }
      }
      .childrenList{
        width: 350px;
        position: absolute;
        border: 1px solid #ccc;
        background-color: #fff;
        left: 258px;
        top: 0px;
        padding: 5px;
        vertical-align: middle;
        li{
          text-indent: 1em;
          font-size: 14px;
          padding: 5px 0;
          .one{
            font-style: italic;
            font-size: 22px;
            font-weight: 600;
            color: orange;
            margin-right: 10px;
          }
          .two{
            color: orange;
            margin-right: 10px;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          .three{
            color: #999;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  
  .rightContent{
    
  }
}
</style>