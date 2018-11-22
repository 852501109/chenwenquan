<template>
    <div>
        <div class="container">
            <div class="tips-before-data  "  v-show="personList && personList.length === 0">
                    <i v-if="isLoading" class="el-icon-loading"></i>
                    <span v-else>当前没有记录</span>
                </div>
            </div>
                <div class="wrapper"
                    ref="wrapper"
                    v-bind:style="{ height: (availHeight - 50) + 'px' }"
                >
                    <ul class="person-wrap" 
                        v-show="personList.length !== 0"
                    >
                        <li class="person-List"  
                            v-for="(item,index) in personList" 
                            :key="index" 
                            @click="changeIndex(index)"
                            v-bind:class="{ selectActive: index === activeIndex }"
                        >
                            <img class="person-picture" :src="picture">
                            <div class="person-msg">
                                <span>{{item.fullName}}</span>
                                <span style="margin-left: 5%;">{{item.type}}</span>
                                <div  style="margin-left: 62px;margin-top: 5px;">{{item.address}}</div>
                            </div>
                            <div class="person-time">{{getDate(item.consultationTime)}}</div>
                            <div class="person-content">{{getBody(item.body)}}</div>
                        </li>
                    </ul>
                </div>
            <div @click="goToConsultation" class="to-consultation"><div class=""></div>去咨询</div>
        </div>
    </div>
</template>
<script>
import {getDiagnosisConsultation} from '@/api/ReservationsProcess'
import {yearNtilMonth} from '@/utils/publicMethods'
import BScroll from 'better-scroll'
import {mapState} from 'vuex';

export default {
    name:'Doctor',
    mounted(){
        this.getList()
        this.resizeHeight()
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
    data(){
        return {
            isLoading:true,
            availHeight:window.screen.availHeight,
            picture:require('@/assets/image/name1.jpg'),
            activeIndex:-1,
            navType:[
                {name:'咨询',isActive:false},{name:'预约',isActive:false},{name:'复诊',isActive:false},{name:'全部',isActive:false}
            ],
             personList:Array()
        }
    },
    methods:{
        resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
                self.availHeight = window.screen.availHeight
            }, false);
        },
        getDate(time){
           return yearNtilMonth(Date.parse(time))
        },
        changeIndex(index){
            this.activeIndex === index? this.activeIndex = -1 : this.activeIndex = index 
        },
        getBody(msg){
            return msg.length>10?msg.substr(0,10)+'...':msg  
        },
        goToConsultation(){
            if(this.activeIndex === -1){
                this.$router.push({path:'/firstConsultation'})
            }else{
                console.log(this.personList[this.activeIndex].consultationId)
                sessionStorage.setItem('consultationId',this.personList[this.activeIndex].consultationId)
                this.$router.push({path:'/patientInquisition'})                
            }
        },
        getList(){
            getDiagnosisConsultation(this.featureId,0,this.customerId).then( res=>{
                if(res.data.returnCode === 1){
                    this.isLoading = false
                    const personList = res.data.returnDataList.data
                    this.personList = personList
                    this.scrolls = new BScroll(
                        this.$refs.wrapper,{
                            click:true,
                        }
                    );
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        .wrapper{
            position: relative;
            top: 10px;
            overflow: hidden;
        }
        position: relative;
    }
    .to-consultation{
            position: fixed;
            cursor: pointer;
            bottom: 139px;
            right: 35px;
            width: 68px;
            height: 68px;
            line-height: 68px;
            background: #10cb7e;
            border-radius: 10px;
            font-size: 15px;
            color: #fff !important;
            text-align: center;
        }
    .navActive{
        background:#444;
        color:#fff;
    }
    img{
        width: 40px;
    }
    .person-msg span:first-child{
        margin-left: 20px;
        color: #0f0f0f;
    }
    .selectActive{
        border: 2px solid #cdf1b5;
    }
</style>

