export default{
    state:{
        cityPosition:'',
        detailPosition:''
    },
    mutations:{
        getcity_position(state){
            state.cityPosition = sessionStorage.getItem('cityPosition')
        },
        getdetai_position(state){
            state.detailPosition = sessionStorage.getItem('detailPosition')
        }
    },
    actions:{
        refresh_position(context){
            context.commit('getcity_position')
            context.commit('getdetai_position')
        }
    }
}