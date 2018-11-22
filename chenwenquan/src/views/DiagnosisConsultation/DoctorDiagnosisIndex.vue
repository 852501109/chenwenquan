<template>
    <div>
        <div class="container">
            <div class="my-search"><i class="icon iconfont">&#xe65b;</i><input type="text" placeholder="  搜索" /></div>
            <ul class="my-navList">
                <li v-for="(item,index) in navType" :key="index" v-bind:class="{ navActive:item.isActive }" @click="navTab(item)">{{item.name}}</li>
            </ul>
            <div class="wrapper"
                    ref="docwrapper"
                    v-bind:style="{ height: (availHeight - 50) + 'px' }"
                >
                <ul class="person-wrap">
                    <div class="tips-before-data" style="background:#eee;color:#333;"  v-if="personList && personList.length === 0">
                        <i v-if="isLoading" class="el-icon-loading"></i>
                        <span v-else>{{tipMsg}}</span>
                    </div>
                    <li class="person-List" @click="goToDoctorInquisition(index)" v-else  v-for="(item,index) in personList" :key="index">
                        <img class="person-picture" :src="picture">
                        <div class="person-msg">
                            <span>{{item.fullName}}</span>
                            <span style="margin-left:5%;">{{item.sex}}</span>
                            <span>{{item.age}}</span>
                        </div>
                        <div class="person-content">{{item.body?item.body:''}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {getDiagnosisConsultation ,getReservationList} from '@/api/ReservationsProcess'
import BScroll from 'better-scroll'
import {mapState} from 'vuex';
export default {
    name:'Doctor',
    mounted(){
        this.getList(this.featureId,1,this.customerId)
        this.resizeHeight()
    },
    data(){
        return {
            tipMsg:'当前没有记录',
            isLoading:true,
            availHeight:window.screen.availHeight,
            picture:require('@/assets/image/name1.jpg'),
            navType:[
                {name:'咨询',isActive:true},{name:'预约',isActive:false},{name:'复诊',isActive:false},{name:'全部',isActive:false}
            ],
            personList:[],
        }
    },
    computed:{
        ...mapState({
            customerId:function(state){
                if(state.userInfo.customerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.customerId
            },
            featureId:function(state){
                if(state.userInfo.featureId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.featureId
            }
        }),
    },
    methods:{
        resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
                self.availHeight = window.screen.availHeight
            }, false);
        },
        goToDoctorInquisition(index){
            sessionStorage.setItem('consultationId',this.personList[index].consultationId)
            sessionStorage.setItem('receiveCustomerId',this.personList[index].customerId)
            this.$router.push({path:'/doctorInquisition'}) 
        },
        navTab(item){
            switch (item.name){
            case '咨询':
            this.getList(this.featureId,1,this.customerId)
                break;
            case '预约':
            this.getReservationList('111',3)
                break;
            case '复诊':
            this.getList(this.featureId,2,this.customerId)
                break;
            case '全部':
            this.getList(this.featureId,0,this.customerId)
                break;
            }
            this.navType.forEach(function (value,index) {
                value.isActive = false
            });
            item.isActive = true
        },
        getList(featureId,consultationState,customerId){
            getDiagnosisConsultation(featureId,consultationState,customerId).then( res=>{
                this.isLoading = false
                if(res.data.returnCode === 1){
                    const personList = res.data.returnDataList.data
                    this.personList = personList === ""?[]:personList
                    this.docscroll = new BScroll(
                    this.$refs.docwrapper,{
                            click:true,
                    }
                    );
                }else{
                    this.tipMsg = '请求失败,刷新页面在试'
                    this.tips().warning(res.data.returnMsg)
                }
            })
        },
        getReservationList(featureId,consultationState,customerId){
            getReservationList(featureId,consultationState,customerId).then( res=>{
                if(res.data.returnCode === 1){
                    const personList = res.data.returnDataList.data
                    this.personList = personList
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #app{
        .container{
        position: relative;
        background: #eee;
        .wrapper{
            position: relative;
            top: 10px;
            width: 100%;
            overflow: hidden;
        }
    }
        .navActive{
            background:#444;
            color:#fff;
        }
    
        img{
            width: 40px;
        }
    }
    
</style>

