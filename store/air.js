export const state = () => {
    return {
        // 总价格
        allPrice: 0,
    }
}

export const mutations = {
    // 修改总价格
    setAllPirce(state, price){
        state.allPrice = price
    }
}