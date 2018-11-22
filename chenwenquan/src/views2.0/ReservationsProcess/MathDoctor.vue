<template>
    <div>
        <div class="container">
            <div class="tip-msg" v-if="personList.length!==0">根据您的病情描述，为您精准匹配{{doctornum}}位医生</div>
            <div class="tips-before-data" style="background:#eee;color:#333;" v-else>当前无对应医生</div>
            <div class="wrapper" ref="wrapper" v-bind:style="{ height: (availHeight - 150) + 'px' }">
                <ul class="person-wrap" v-bind:style="{ height: (availHeight - 150) + 'px' }">
                    <li class="person-List" v-for="(item,index) in personList" @click="getDetail(index)" :key="index">
                        <div class="most">

                        </div>
                        <img class="person-picture" width="40" :src="picture">
                        <div class="person-title">{{item.medicalTitle + "&nbsp;&nbsp;&nbsp;北京"}}<br />从医
                            <span style="color:rgb(61, 144, 110);">5</span>年&nbsp;&nbsp;&nbsp;诊疗案例
                            <span style="color:rgb(61, 144, 110);">1886</span>例</div>
                        <div class="beGoodAt">擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病....</div>
                        <div class="tipStyle">
                            <span>夜间哮喘</span>
                            <span>只哮不喘</span>
                            <span>夜间哮喘</span>
                        </div>
                        <div class="appointment-wrap">
                            <div class="appointment-price">
                                <span style="color:#10cb7e;">￥{{item.registrationFee}}</span>&nbsp;&nbsp;
                                <del>￥300</del>
                            </div>
                            <div class="appointment"  @click="toAppointTime(index)">预约</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <doctorDetail v-if="isShow" :activeDoctor="activeDoctor"  @child-show="reciveMsg"></doctorDetail>
        <div class="abandon" @click="giveUpResult">查看更多其他医生</div>
    </div>
</template>
<script>
import {
    getPatientDiagnosisConsultation,
    insertFirstConsultationByDoctor,
    getDoctorById
} from "@/api/ReservationsProcess";
import BScroll from "better-scroll";
import { constants } from "os";
import { mapState } from "vuex";
import doctorDetail from '@/components/DoctorDetail';
export default {
    name: "Recommend",
    components:{
        doctorDetail
    },
    computed: {
        ...mapState({
            customerId: function(state) {
                if (state.userInfo.customerId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.customerId;
            },
            consultationId: function(state) {
                if (state.userInfo.consultationId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.consultationId;
            },
            consultationSubId: function(state) {
                if (state.userInfo.consultationSubId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.consultationSubId;
            }
        })
    },
    data() {
        return {
            isShow:false,
            activeDoctor:"",
            availHeight: window.screen.availHeight,
            doctornum: 0,
            picture: require("@/assets/image/name1.jpg"),
            detailDoctor: {
                typeName: "哮喘主治医师",
                location: "北京",
                doctorTime: "5",
                dialogNum: "1886",
                type: ["夜间哮喘", "夜间哮喘", "夜间哮喘", "夜间哮喘"],
                beGoodAt:
                    "擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病"
            },
            personList: [
                {
                    most: "最对症",
                    name: "哮喘主治医师",
                    city: "北京",
                    year: "5",
                    case: "1886",
                    beGoodAt:
                        "擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病",
                    type: ["夜间哮喘", "只哮不喘", "夜间哮喘", "只哮不喘"]
                },
                {
                    most: "距离最近",
                    name: "哮喘主治医师",
                    city: "北京",
                    year: "5",
                    case: "1886",
                    beGoodAt:
                        "擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病",
                    type: ["夜间哮喘", "只哮不喘", "夜间哮喘", "只哮不喘"]
                }
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']},
                // {name:'孟非',address:'北京辅仁医药馆',type:'主治医师',years:'从业五年',profile:'擅长：擅长呼吸系统疾病的治疗擅长呼吸系统疾病的治疗擅长呼吸系统疾病的',tips:['耐心负责','热门专家']}
            ],
            subInfo: {
                recommendPosition: 1,
                recommendType: 1
            },
            getDetail(index){          
                this.activeDoctor = this.personList[index].customerId
                this.isShow = true
                sessionStorage.setItem(
                    "institutionId",
                    this.personList[index].institutionId
                );
            },
            toConsultation: {
                consultationSubId: 1,
                institutionId: sessionStorage.getItem("insertFirstId"),
                institutionName: 1,
                doctorId: 111,
                consultationId: 1
            }
        };
    },
    mounted() {
        this.getDoctorList();
        this.resizeHeight();
    },
    methods: {
        giveUpResult(){
            this.$router.push({path:'/ownSelectDoctor'})
        },
        reciveMsg(msg){
            this.isShow = msg
        },
        getDoctorList() {
            getPatientDiagnosisConsultation(this.customerId, 2, 1).then(res => {
                const data = res.data.returnDataList;
                if (res.data.returnCode === 1) {
                    this.personList = data.data;
                    this.doctornum = data.count;
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click: true
                    });
                } else {
                    this.tips().warning(res.data.returnMsg);
                }
            });
        },
        toAppointTime(index) {
            event.stopPropagation()
                sessionStorage.setItem(
                    "institutionId",
                    this.personList[index].institutionId
                );
                sessionStorage.setItem(
                    "doctorCustomId",
                    this.personList[index].customerId
                );
            this.$router.push({ path: "/appointmentTime" });
        },
        seeDoctorData(index) {
            // sessionStorage.setItem('doctorCustomId',this.personList[index].customerId)
            // this.$router.push({path:'/doctorData'})
        },
        resizeHeight() {
            var self = this;
            this.addHandler(
                window,
                "orientationchange",
                function() {
                    self.availHeight = window.screen.availHeight;
                },
                false
            );
        },
        toPatientInquistion(index) {
            this.$router.push({ path: "/appointmentTime" });

            // event.stopPropagation()
            // const data = this.personList[index]
            // insertFirstConsultationByDoctor(this.consultationSubId,data.institutionId,data.institutionName,data.customerId,this.consultationId).then( res =>{
            //     if(res.data.returnCode === 1){
            //          sessionStorage.setItem('receiveCustomerId',data.customerId)
            //          this.$router.push({path:'/patientInquisition'})
            //      }else{
            //         this.tips().warning(res.data.returnMsg)
            //     }
            // })
        }
    }
};
</script>
<style lang="scss" scope>
.wrapper {
    position: relative;
    padding-top: 20px;
    top: 10px;
    overflow: hidden;
    .person-title {
        float: left;
        font-size: 0.8rem !important;
        font-weight: 500;
        color: #222;
        margin: 24px;
    }
}
.appointment-wrap {
    position: relative;
    width: 100%;
    height: 30px;
    .appointment-price {
        position: absolute;
        font-size: 1rem;
        left: 10px;
        bottom: 2px;
    }
    .appointment {
        position: absolute;
        right: 10px;
        bottom: 2px;
        text-align: center;
        width: 70px;
        height: 25px;
        line-height: 25px;
        color: #fff;
        border-radius: 13px;
        background: #10cb7e;
    }
}
.doctor-detail {
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 999;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .detail-box {
        text-align: center;
        .detail-most {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 2px solid #f3f3f3;
            background: #10cb7e;
            color: #fff;
        }
        img {
            display: block;
            margin: 0px auto;
        }
        position: relative;
        background: #fff;
        width: 90%;
        min-height: 600px;
        margin: 50px auto;
    }
    .delete {
        position: absolute;
        font-size: 1.8rem;
        bottom: 5px;
        left: 48%;
        bottom: 13px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50px;
    }
}
.person-List {
    position: relative;
    top: 10px;

    width: 100%;
    min-height: 240px;
    background: #fff;
    .most {
        position: relative;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid #eaeaea;
        background: #fff;
    }
}
.beGoodAt {
    width: 80%;
    text-align: left;
    margin: 0px auto;
    clear: both;
    margin-bottom: 20px;
    font-size: 13px;
}
.tip-msg {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: rgb(61, 144, 110);
    color: #fff;
}
.person-msg {
    width: 100%;
    span:first-child {
        margin-left: 20px;
    }
}
.person-content {
    width: 79%;
}
.person-diagnosis {
    position: absolute;
    width: 100%;
    bottom: 36px;
    border-top: 1px solid #bbbaba;
}
.person-diagnosis span {
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
.abandon {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #948f8f;
    color: #fff;
    bottom: 0px;
    text-align: center;
}
.tipStyle{
    margin: 7px;
    margin-top: 32px;
}
</style>


