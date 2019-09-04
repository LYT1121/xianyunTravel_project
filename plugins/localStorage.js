import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    // 插件的方法
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}