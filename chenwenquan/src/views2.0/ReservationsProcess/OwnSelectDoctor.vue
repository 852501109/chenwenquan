<template>
    <div class="container">
        <div>
            <type-selector></type-selector>
            <div class="wrapper"
                    ref="docwrapper"
                    v-bind:style="{ height: (availHeight - 50) + 'px' }"
                >
                <ul class="person-wrap" style="width:100%;">
                    <li class="person-List" style="width:100%;" 
                        v-for="(item,index) in doctorList" 
                        :key="index"
                         @click="getDetail(index)"
                        >
                        <img width="30" class="person-picture" :src="picture">
                        <h3>{{item.medicalTitle +"&nbsp;&nbsp;&nbsp;" +item.address}}</h3>
                        <div>{{item.descript+"&nbsp;&nbsp;&nbsp;诊疗案例" + item.num}}</div>
                        <div class="tipStyle">
                            <span>夜间哮喘</span>
                            <span>只哮不喘</span>
                            <span>夜间哮喘</span>
                        </div>
                        <div>{{item.beGoodAt}}</div>
                        <div class="price">{{item.price+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.delPrice}}
                            <span class="pay" @click="toAppointTime(index)">预约</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import typeSelector from '@/components/TypeSelector'
import {getPatientDiagnosisConsultation,getDoctorById} from '@/api/ReservationsProcess' 
import {mapState} from 'vuex';
import BScroll from 'better-scroll'
export default {
    name:'OwnSelectDoctor',
    components:{
        typeSelector
    },
    data(){
        return{
            availHeight:window.screen.availHeight,
            picture:require('@/assets/image/name1.jpg'),
            doctorList:[
                    {name:'哮喘专家',address:'北京',cureNum:1180,price:'218',delPrice:'400',descript:'从医五年',num:'118',beGoodAt:'擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病'},
                    {name:'哮喘专家',address:'北京',cureNum:1180,price:'218',delPrice:'400',descript:'从医五年',num:'118',beGoodAt:'擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病'},
                    {name:'哮喘专家',address:'北京',cureNum:1180,price:'218',delPrice:'400',descript:'从医五年',num:'118',beGoodAt:'擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病'},
            ],
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
    mounted(){
        this.resizeHeight()
        this.getDoctorList()
        this.docscroll = new BScroll(
            this.$refs.docwrapper,{
                    click:true,
            }
        )
    },
    methods:{
        resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
                self.availHeight = window.screen.availHeight
            }, false);
        },
        getDetail(index) {
            this.isShowDetail = true;
            sessionStorage.setItem(
                    "institutionId",
                    this.personList[index].institutionId
                );
                sessionStorage.setItem(
                    "doctorCustomId",
                    this.doctorList[index].customerId
                );
            
            getDoctorById(this.doctorList[index].customerId).then(res => {
                if (res.data.returnCode === 1) {
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            });
        },
        toAppointTime(index) {
            event.stopPropagation()
            if(index){
                sessionStorage.setItem(
                    "institutionId",
                    this.doctorList[index].institutionId
                );
                sessionStorage.setItem(
                    "doctorCustomId",
                    this.doctorList[index].customerId
                );
            }
            this.$router.push({ path: "/appointmentTime" });
        },
        getDoctorList(){
            getPatientDiagnosisConsultation(this.customerId,2,1).then( res =>{
                const data = res.data.returnDataList
                if(res.data.returnCode === 1){
                    this.doctorList =data.data
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
    }
}
</script>
<style lang="scss" scoped>
    .title{
        position: relative;
        width: 100%;
    }
    .pay{
        display: inline-block;
        background: #4444d8;
        height: 24px;
        line-height: 24px;
        width: 50px;
        border-radius: 3px;
        text-align: center;
        color: #fff;
        float: right;
    }
    .person-wrap{
        padding: 20px;
        h3{
            margin:10px;
        }
        .price{
            width: 100%;
            height: 25px;
            line-height: 25px;
            background: #fff;
        }
    }
</style>


