<template>
  <div class="flighrItem">
    <!-- 显示的机票信息 -->
    <div>
      <el-row type="flex" align="middle" class="flightInfo">
        <el-col :span="6">
          <span>东航</span> MU5316
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="InfoCenter">
            <el-col :span="8" class="flightAirport">
              <strong>20:30</strong>
              <span>白云机场T1</span>
            </el-col>
            <el-col :span="8" class="flightTime">
              <span>2时20分</span>
            </el-col>
            <el-col :span="8" class="flightAirport">
              <strong>22:50</strong>
              <span>虹桥机场T2</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flightRight">
          ￥
          <span class="sellPrice">810</span>起
        </el-col>
      </el-row>
    </div>
    <!-- 下拉的座位列表 -->
    <div class="flightRecommend">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flightSell">
            <el-col :span="16" class="sellLeft">
              <span>经济舱</span> | 上海一诺千金航空服务有限公司
            </el-col>
            <el-col :span="5" class="price">￥1345</el-col>
            <el-col :span="3" class="chooseButton">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：83</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.flighrItem{
    border: 1px solid #ddd;
    margin-bottom: 10px;
    .flightInfo{
        padding: 15px;
        cursor: pointer;
        > div{
            &:first-child,
            &:last-child{
                text-align: center;
            }
        }
        .InfoCenter{
            padding: 0 30px;
            text-align: center;
            .flightTime{
                span{
                    display: inline-block;
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                    color: #999;
                }
            }
            .flightAirport{
                strong{
                    display: block;
                    font-size: 24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .flightRight{
            .sellPrice{
                font-size: 24px;
                color: orange;
                margin: 0 2px;
            }
        }
    }
    .flightRecommend{
        background-color: #f6f6f6;
        border-top: 1px solid #eee;
        padding: 0 20px;
        .flightSell{
            border-bottom: 1px solid #eee;
            padding: 10px 0;
            &:last-child{
                border-bottom: none;
            }
            .sellLeft{
                font-size: 12px;
                span{
                    color: green;
                }
            }
            .price{
                font-size: 20px;
                color: orange;
            }
            .chooseButton{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
}
</style>