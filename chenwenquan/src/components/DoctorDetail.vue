<template>
    <div class="doctor-detail">
        <div class="detail-box">
            <div class="detail-most">最对症医生</div>
            <img width="40" :src="picture">
            <div style="clear:both;">{{detailDoctor.areasExpertise+"&nbsp;&nbsp;&nbsp;"+'北京'}}</div>
            <div>从医<span style="color:#10cb7e;">5</span>年&nbsp;&nbsp;&nbsp;诊疗案例<span style="color:#10cb7e;">100</span>例</div>
            <div class="tipStyle">
                <span v-for="(item,index) in detailDoctor.type" :key="index">
                    {{item}}
                </span>
            </div>
            <div class="beGoodAt">擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病</div>
            <div class="appointment-wrap">
                <div class="appointment-price" style="position:static;">
                    <span style="color:#10cb7e;">￥{{detailDoctor.registrationFee}}</span>&nbsp;&nbsp;
                    <del>￥300</del>
                </div>
                <div class="appointment" style="position:static;margin:0px auto;" @click="toAppointTime()">预约</div>
            </div>
        </div>
        <i @click="deleteThis" class="icon iconfont delete">&#xe6ac;</i>
    </div>
</template>
<script>
import {getDoctorById} from "@/api/ReservationsProcess"
export default {
    name:'DoctorDetail',
    props:{
        activeDoctor:{
            type:null,
            default:0
        }
    },
    data(){
        return{
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
        }
    },
    mounted(){
        getDoctorById(this.activeDoctor).then(res =>{
            this.detailDoctor = res.data.returnDataList
        })
    },
    methods:{
        toAppointTime() {
            event.stopPropagation()
            sessionStorage.setItem(
                "doctorCustomId",
                    this.activeDoctor
            );
            this.$router.push({ path: "/appointmentTime" });
        },
        deleteThis(){
            this.$emit('child-show',false);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

