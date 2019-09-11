<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{orderList.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 引入生成二维码的包
import QRCode from "qrcode";
export default {
    data(){
        return{
            // 订单详情数据收集
            orderList:{},
            // 用到定时器=>先定义一个定时器
            timer:null
        }
    },
    // 钩子函数
    mounted () {
        // 设置定时器
        setTimeout(()=>{
            // 请求数据
            this.$axios({
                url:'/airorders/'+this.$route.query.id,
                // 付款效验=>需要给接口单独加上请求头=>store仓库已保存有登录时的状态（token）
                headers:{
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res=>{
                // console.log(res);
                // 赋值
                this.orderList = res.data;
                // 生成二维码=>下载第三方包 npm install --save qrcode
                // 用原生的js方法获取元素
                const canvas = document.querySelector('#qrcode-stage');
                // 生成二维码的链接
                const { code_url } = res.data.payInfo;
                // 固定方法toCanvas
                QRCode.toCanvas(canvas,code_url,{width:200});
                // 轮询付款详情
                this.timer = setInterval(()=>{
                    this.checkPay()
                },3000)
            })
        },10)
    },
    // 用户有可能在付款页面未付款就进行切换到其他页面了，所以需要一个钩子函数=>组件卸载(切换)触发
    destroyed(){
        // 清除定时器
        clearInterval(this.timer);
        // 双重保证
        this.timer = null;
    },
    methods:{
        // 付款详情状态
        checkPay(){
            // 调用接口
            this.$axios({
                url:'/airorders/checkpay',
                method:'POST',
                // 付款效验=>需要给接口单独加上请求头=>store仓库已保存有登录时的状态（token）
                headers:{
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                },
                // 携带的数据
                data:{
                    id:this.$route.query.id,//订单id
                    nonce_str:this.orderList.price, //支付接口返回的订单金额
                    out_trade_no:this.orderList.orderNo //订单编号
                }
            }).then(res=>{
                // console.log(res);
                // 把提示信息解构出来
                const {statusTxt} = res.data;
                // 判断提示
                if(statusTxt === "支付完成"){
                    // 清除定时器
                    clearInterval(this.timer);
                    // 双重保证
                    this.timer = null;
                    // 提示用户
                    this.$confirm("订单支付成功", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'success'
                    })
              }
            })
        }
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>