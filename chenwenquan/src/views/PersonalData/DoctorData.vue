<template>
    <div class="container">
        <div class="gray">
            <img class="picture" width="80" :src="picture" />
        </div>
        <section class="content">
            <h2>{{doctorData.name}}</h2>
            <div class="title">
                <span>{{doctorData.medicalTitle}}</span>
                <span>从医{{doctorData.clinicalYear}}年</span>
                <span>接诊{{doctorData.patientNum}}人</span>
                <div>{{doctorData.institutionName}}</div>
                <div class="person-tips">
                    <span class="tips-item" v-for="(item,index) in doctorData.tips" :key="index">{{item}}</span>
                </div>
            </div>
            <div class="be-goodat">
                <div>
                    <span>擅长：</span>
                    <span>{{doctorData.areasExpertise}}</span>
                </div>
                <div>
                    <span>简介：</span>
                    <span>{{doctorData.medicalTitle}}</span>
                </div>
            </div>
            <div class="person-diagnosis">
                <span @click="toPatientInquistion">去问诊</span>
            </div>
        </section>
    </div>
</template>
<script>
import {
    insertFirstConsultationByDoctor,
    getDoctorById
} from "@/api/ReservationsProcess";
import { mapState } from "vuex";
export default {
    name: "doctorData",
    data() {
        return {
            picture: require("@/assets/image/name1.jpg"),
            doctorData: {}
        };
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
            },
            doctorCustomId: function(state) {
                if (state.userInfo.doctorCustomId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.doctorCustomId;
            }
        })
    },
    mounted() {
        this.getDoctorData();
    },
    methods: {
        getDoctorData() {
            getDoctorById(this.doctorCustomId).then(res => {
                if (res.data.returnCode === 1) {
                    this.doctorData = res.data.returnDataList;
                } else {
                    this.tips().warning(res.data.returnMsg);
                }
            });
        },
        toPatientInquistion() {
            insertFirstConsultationByDoctor(
                this.consultationSubId,
                this.doctorData.institutionId,
                this.doctorData.institutionName,
                this.customerId,
                this.consultationId
            )
                .then(res => {
                    if (res.data.returnCode === 1) {
                        this.$router.push({ path: "/patientInquisition" });
                    } else {
                        console.log(res.data.returnMsg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    text-align: left;
    height: 600px;
    overflow: hidden;
    .person-diagnosis {
        top: 230px;
    }
    .person-diagnosis span {
        display: block;
        position: relative;
        width: 90px;
        height: 30px;
        line-height: 30px;
        background: #10cb7e;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        right: none;
        top: 5px;
        margin: 0px auto;
    }
    .gray {
        width: 100%;
        height: 70px;
        background: #e9e7e8;
    }
    .content {
        position: relative;
        width: 100%;
        top: 70px;
        min-height: 500px;
        background: #fff;
        h2 {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
        }
        .title {
            text-align: left;
            margin-left: 5%;
            span {
                display: inline-block;
                width: 30%;
                color: #848484;
                margin-top: 20px;
            }
            div {
                margin-top: 10px;
            }
        }
        .be-goodat {
            width: 100%;
            padding: 5px;
            margin-top: 10px;
            font-size: 13px;
            div {
                margin-top: 10px;
            }
            span:nth-child(2) {
                color: #848484;
            }
        }
        .person-tips {
            .tips-item {
                width: auto;
                color: #fff;
                font-size: 13px;
            }
            .tips-item:first-child {
                margin: 0px;
            }
        }
    }
    .picture {
        position: relative;
        top: 20px;
        border-radius: 40px;
        margin: 0px auto;
        z-index: 2;
    }
}
</style>


