export default{
    state:{
        smsType:'',
        cellPhone:'',
        second:60,
        show:false
    },
    getters:{
        //可定义多个
        not_show(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations:{
        computed_second(state){
            state.second = state.second - 1
        },
    },
    actions:{
        computed_second(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('computed_second');
            //你还可以在这里触发其他的mutations方法
        },
    }
}
