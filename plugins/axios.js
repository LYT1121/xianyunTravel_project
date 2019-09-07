// 用于处理axios请求的拦截插件 => 拦截器
// export default (nuxt)=>{
    // nuxt.$axios
// 引入element-ui=>错误提示
import {Massage} from 'element-ui'
export default ({$axios})=>{
    // 错误拦截
    $axios.onError(err=>{
        // 返回的res是一个错误对象=>可以通过response属性访问错误信息
        console.log(err.response);
        // 解构出错误信息
        const {message, statusCode} = err.response.data
        if(statusCode === 400){
            Message.warning({message});
        }
    })
}