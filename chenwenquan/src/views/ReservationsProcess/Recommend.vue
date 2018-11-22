<template>
    <div>
        <div class="container">
            <div class="tip-msg" v-if="doctornum!==0">为您推荐{{doctornum}}位专家医生</div>
            <div class="tips-before-data" style="background:#eee;color:#333;"  v-else>当前无对应医生</div>
            <div class="wrapper"
                        ref="wrapper"
                        v-bind:style="{ height: (availHeight - 50) + 'px' }"
                    >
                <ul class="person-wrap" >
                    <li class="person-List" 
                        style="min-height:164px;" 
                        v-for="(item,index) in personList" :key="index"
                        @click="seeDoctorData(index)"
                    >
                        <img class="person-picture" width="30" :src="picture">
                        <div class="person-msg">
                            <span style="color:#222;">{{item.createByName}}</span>
                            <span style="margin-left:6%;">{{item.years}}</span>
                            <span>{{item.areasExpertise}}</span>
                        </div>
                        <div class="person-content">{{item.medicalTitle}}</div>
                        <div class="person-tips">
                            <span class="tips-item" v-for="(tips,indexs) in item.tips" :key="indexs">{{tips}}</span>
                        </div>
                        <div class="person-diagnosis">
                            <span @click="toPatientInquistion(index)">去问诊</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {getPatientDiagnosisConsultation,insertFirstConsultationByDoctor } from "@/api/ReservationsProcess"
import BScroll from 'better-scroll'
import { constants } from 'os';
import {mapState} from 'vuex';
export default {
    name:"Recommend",
    computed:{
        ...mapState({
            customerId:function(state){
                if(state.userInfo.customerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.customerId
            },
            consultationId:function(state){
                if(state.userInfo.consultationId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.consultationId
            },
            consultationSubId:function(state){
                if(state.userInfo.consultationSubId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.consultationSubId
            }
        }),
    },
    data(){
        return {
            availHeight:window.screen.availHeight,
            doctornum:0,
            picture:require('@/assets/image/name1.jpg'),
            personList:[
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']}
            ],
            subInfo:{
                recommendPosition:1,
                recommendType:1
            },
             toConsultation:{
                consultationSubId:1,
                institutionId:sessionStorage.getItem('insertFirstId'),
                institutionName:1,
                doctorId:111,
                consultationId:1
            }
        }
    },
    mounted(){
        this.getDoctorList()
    },
    methods:{
        getDoctorList(){
            getPatientDiagnosisConsultation(this.customerId,1,1).then( res =>{
                const data = res.data.returnDataList
                if(res.data.returnCode === 1){
                    this.personList =data.data
                    this.doctornum = data.count
                    this.scroll = new BScroll(
                        this.$refs.wrapper,{
                            click:true,
                        }
                    );
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        },
        seeDoctorData(index){
            sessionStorage.setItem('doctorCustomId',this.personList[index].customerId) 
            this.$router.push({path:'/doctorData'})
        },
        resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
               self.availHeight = window.screen.availHeight
            }, false);
        },
        toPatientInquistion(index){
            event.stopPropagation()
            const data = this.personList[index]
            insertFirstConsultationByDoctor(this.consultationSubId,data.institutionId,data.institutionName,data.customerId,this.consultationId).then( res =>{
                if(res.data.returnCode === 1){
                     sessionStorage.setItem('receiveCustomerId',data.customerId)
                     this.$router.push({path:'/patientInquisition'})
                 }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        }
    }

}
</script>
<style lang="scss" scope>
    .wrapper{
        position: relative;
        top: 10px;
        overflow: hidden;
    }
    .person-List{
        min-height: 100px;
        border-bottom:2px solid rgb(196, 196, 196);
    }
    .tip-msg{
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: rgb(61, 144, 110);
        color: #fff;
    }
    .person-msg{
        width: 100%;
        span:first-child{
            margin-left: 20px;
        }
    }
    .person-content{
        width: 79%;
    }
    .person-diagnosis{
        position: absolute;
        width: 100%;
        bottom: 36px;
        border-top: 1px solid #bbbaba;
    }
    .person-diagnosis span{
        display: block;
        position: absolute;
        right: 5px;
        top: 5px;
        width: 60px;
        text-align: center;
        height: 26px;
        border-radius: 7px;
        line-height: 26px;
        background: #10cb7e;
        color: #fff;
    }

</style>


