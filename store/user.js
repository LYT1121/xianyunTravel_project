// state => 表示数据
export const state = {
    // 采用接口返回的数据结构
    userInfo:{
        token:'',
        user:{}
    }
};
// mutations => 同步修改state数据
export const mutations = {
    // 保存用户信息到state  state作为第一个参数必须的 data是调用方法时传入的参数=>不是必须的
    // 可以向 store.commit 传入额外的参数，即 mutation 的 载荷(payload) => 比如下面data
    setUserInfo(state,data){
        //data 后台返回的用户信息
        state.userInfo = data
    },

    // 清空用户信息
    clearUserInfo(state){
        // 清除本地存储原生的方法=>localStorage.removeItem('userInfo');
        // 引用插件的方法=>直接重新赋值
        state.userInfo={
            key:'',
            user:{}
        }
    }
};
// actions => 异步修改state数据
export const actions = {
    // 登录 => 需要调用commit很多次时=>用解构的方式传参
    login({commit},data){
        // Action 通过 store.dispatch 方法触发=>可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
        return this.$axios({
            url:"/accounts/login",
            method:'POST',
            data:data
          })
          .then((result) => {
            const data = result.data;
            // 把得到的值保存到state
            commit('setUserInfo',data);
            return data;
          })
    }
}