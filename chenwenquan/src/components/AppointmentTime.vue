<template>
    <div class="container">
        <div class="wrap"  v-bind:style="{ height: (availHeight - 70) + 'px' }">
            <div class="patient-msg">
                <h3>就诊人信息</h3>
                <mt-field label="患者姓名" disabled   placeholder="" v-model="userName">
                   
                </mt-field>
                <mt-field label="手机号码" placeholder="请输入" type="number" v-model="phoneNumber"></mt-field>
            </div>
            <div class="selectTime">
                <div class="title">选择合适的就诊时间<span>{{time}}</span></div>
                <div class="list" 
                    v-for="(item,index) in data" 
                    :key="index" 
                >
                &nbsp;&nbsp;{{item.date+"&nbsp;&nbsp;周"+Arabia_To_SimplifiedChinese(item.dateWeek)}}
                {{item.reserve_flag===1?"上午":"下午"}}
                {{item.day}}
                <span @click="sureTime(index)" class="sure">{{item.states}}</span></div>
            <div class="week-wrap">
                    <div class="week-pre" @click="getTime(1)"><i class="icon iconfont">&#xe637;</i>上一周</div>
                    <div class="week-next" @click="getTime(2)">下一周<i class="icon iconfont">&#xe6c7;</i></div>
                </div>
            </div>
        </div>
        <div class="submit" @click="submit">确定</div>
    </div>
</template>
<script>
import {getScheduleInfoList,insertReservation} from "@/api/ReservationsProcess"
import {mapState} from 'vuex';
import {todyStampToTime} from "@/utils/publicMethods"
export default {
    name:'AppointmentTime',
    computed:{
        ...mapState({
            customerId:function(state){
                if(state.userInfo.customerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.customerId
            },
            doctorCustomId:function(state){
                if(state.userInfo.doctorCustomId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.doctorCustomId
            },
            institutionId:function(state){
                this.$store.dispatch('refresh_all')
                return state.userInfo.institutionId
            },
            userName:function(state){
                if(state.userInfo.userName === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.userName
            },
            patientId:function(state){
                this.$store.dispatch('refresh_all')
                return state.userInfo.patientId
            },
            reservationId:function(state){
                if(state.userInfo.reservationId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.reservationId
            },
            patientMobile:function(state){
                if(state.userInfo.patientMobile === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.patientMobile
            },
        }),
    },
    mounted(){
       this.getTime(1)
       this.resizeHeight()
    },
    methods:{
        getTime(week){
            getScheduleInfoList(this.institutionId,this.doctorCustomId,week).then(res =>{
                if(res.data.returnCode === 1){
                    const data = res.data.returnDataList.data
                    data.forEach(element => {
                        element.states = '可约'
                    });
                    this.data = data
                }
            })
        },
        sureTime(index){
            this.data.forEach(element => {
                element.states = "可约"
            });
            this.data[index].states = "√"
            this.activeIndex = index
            console.log(this.data)
        },
        submit(){
            if(this.phoneNumber === ""){
                this.tips().warning('请输入手机号码')
            }else if(this.activeIndex === -1){
                this.tips().warning('请选择预约时间')
            }else{
                sessionStorage.setItem('patientMobile',this.phoneNumber)
                this.$store.dispatch('refresh_all')
                insertReservation(this.customerId,"",2,this.userName,"","",this.data[this.activeIndex].date,this.data[this.activeIndex].date,this.patientId,2,this.reservationId,this.doctorCustomId,this.phoneNumber).then(res =>{
                    if(res.data.returnCode === 1){
                        sessionStorage.setItem('patientId',res.data.returnDataList.patientId)
                        this.$router.push({path:'/sureOrder'})
                    }else{
                         this.tips().warning(res.data.returnMsg)
                    }
                })
            }
           
        },
        resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
                self.availHeight = window.screen.availHeight
            }, false);
        },
    },
    data(){
        return {
           name:this.username,
           activeIndex:-1,
           availHeight:window.screen.availHeight,
           time:todyStampToTime(new Date()) + `(周${this.Arabia_To_SimplifiedChinese(new Date().getDay())})`,
           phoneNumber:'',
           data:[]
        }
    }
}
</script>
<style lang="scss" scoped>
    .patient-msg{
        h3,h4{
            text-align: left;
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
            font-size: 0.75rem;
            font-weight: 100;
        }
    }
    .submit{
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #10cb7e;
        text-align: center;
        color: #fff;
    }
    .wrap{
        overflow: auto;
    }
    .selectTime{
        .week-wrap{
            position: relative;
            top: 20px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fff;
            div{
                width: 100px;
                display: inline-block;
                text-align: center;
                color: #fff;
            }
            .week-next{
                float: right;
                height: 100%;
                color: #10cb7e;
            }
            .week-pre{
                float: left;
                height: 100%;
                color: #888;
            }
        }
        .title{
            margin-left:13px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            span{
                float: right;
                margin-right:30px;
            }
        }
        .list{
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #fff;
            border-bottom: 1px solid #eee;
            .sure{
                position: absolute;
                top: 8px;
                right: 8px;
                display: inline-block;
                width: 70px;
                height: 27px;
                line-height: 27px;
                text-align: center;
                background: #ffffff;
                border: 1px solid #10cb7e;
                border-radius: 6px;
                color: #10cb7e;
            }
        }
    }
</style>

