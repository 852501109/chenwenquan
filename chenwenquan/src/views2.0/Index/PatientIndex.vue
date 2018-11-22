<template>
    <div class="container">
        <div style="height: 43px;background:#18d98a;">
            <ul class="my-navList">
                <li v-bind:class="{ navActive:index === active }"
                    @click="tabDisease(item.type,index)"
                    v-for="(item,index) in diseaseType" 
                    :key="index"
                >
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="advise-img"
             v-bind:style="{ height: imgHeihgt+ 'px' }"
        >
            <mt-swipe :show-indicators="false">
                <mt-swipe-item>
                    <img  :src="swiper" width="100%" />
                </mt-swipe-item>
               <mt-swipe-item>
                    <img :src="swiper" width="100%" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="find-doctor" @click="toMatch">
           精准匹配&nbsp;&nbsp;&nbsp;哮喘名医
        </div>
        <div class="wrapper"
              ref="wrappers"
              style="height:100px;"
              v-if="false"
        >
            <ul style="min-height:400px;">
                <li class="my-appointment"
                    v-for="(item,index) in content.myAppoint" 
                    :key="index"
                >
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.doctorName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.patientName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{getNewTime(item.reservationDate)}}&nbsp;&nbsp;</span>
                </li>
            </ul>
        </div>
        <div class="famous-doctor">
            <div class="line">
                <h3>{{content.contentTitle}}</h3>
            </div>
            <div class="more" v-if="false"><router-link to="/ownSelectDoctor">查看更多</router-link></div>
            <div 
                class="wrapper"
                ref="wrapper"
                v-if="content.data.length>0"
                style="height: 266px;overflow:hidden;"
            >
                <ul>
                    <li class="content-box" 
                        v-for="(item,index) in content.data" 
                        :key="index"
                    >
                        <img :src="picture" width="40" />
                        <div>{{item.name}}</div>
                        <div>诊疗案例数<span >{{item.cureNum}}</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>   
</template>
<script>
import {getReservationList} from '@/api/ReservationsProcess'
import BScroll from 'better-scroll'
import {mapState} from 'vuex';
export default {
    name:'PatientIndex',
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
            active:0,
            imgHeihgt:window.screen.availWidth>600?360:180,
            picture:require('@/assets/image/name1.jpg'),
            swiper:require('@/assets/image/ylsy.jpg'),
            diseaseType:[
                {name:'哮喘',type:'1'},
                {name:'外感',type:'2'}
            ],
            content:{
                contentTitle:'金牌名医',
                data:[
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180},
                    {name:'哮喘专家',cureNum:1180}
                ],
                myAppoint:[],
                personList:[]
            }
        }
    },
    mounted(){
        if(this.customerId){
            //this.getScrollList(1,this.customerId,this.featureId)
            //this.scrolls = new BScroll(this.$refs.wrappers, {click: true})
        }
        if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {click: true})
        } else {
            this.scroll.refresh()
        }
        const self = this
        this.addHandler(window,"orientationchange", function(){
            self.imgHeihgt = window.screen.availWidth>400?360:180
        }, false);
    },
    methods:{
        toMatch(){
            if(sessionStorage.getItem('customerId')){
                this.$router.push({path:'/descriptionDisease'})
            }else{
                this.$router.push({path:'/'})
            }
        },
        getNewTime(time){
            var timer = time.split(' ')[1]>12?"下午":"上午"
            return  time.split(' ')[0] + timer 
        },
        tabDisease(type,index){
            this.active = index
        },
        getScrollList(processFlag,searchId,featureId){
            getReservationList(processFlag,searchId,featureId).then( res=>{
                if(res.data.returnCode === 1){
                    const personList = res.data.returnDataList.data
                    this.content.myAppoint = personList
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        }
       
    }
}
</script>
<style lang="scss" scoped>
    .my-navList{
        li{
            width: 20%;
            height: 43px;
            line-height: 49px;
        }
        .navActive{
            color: #ffffff;
            font-size: 20px;
            line-height: 41px;
            span{
                display: inline-block;
                width: 80%;
                margin: 0px auto;
                border-bottom: 2px solid #fff;
            }
        }
    }
    .advise-img{
        position: relative;
        width: 100%;
    }
    .find-doctor{
        width: 86%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #10cb7e;
        border-radius: 5px;
        color: #fff;
        margin: 0px auto;
        margin-top: 22px;
        div{
            width: 72px;
            height: 30px;
            line-height: 30px;
            margin: 9px auto;
            background: #4747e4;
            border-radius: 9px;
            color: #fff;
        }
        a{
            color: #fff;
        }
    }
    .famous-doctor{
        position: relative;
        top: 10px;
        width: 100%;
        height: 400px; 
        background: #fff;
        padding-top: 20px;
        .content-box{
            display: inline-block;
            width: 32%;
            margin-top: 20px;
            text-align: center;
            font-size: 0.8rem;
            line-height: 19px;
        }
        .line{
            position: relative;
            border-top: 1px solid #eee
        }
        ul{
            height: 300px;
            overflow: auto;
        }
        h3{
            position: absolute;
            top: -10px;
            left: 50%;
            text-align: center;
            font-weight: 500;
            font-size: 15px;
            width: 80px;
            margin-left: -40px;
            background: #fff;
            color: #01bf71;
            }
        img{
            margin: 0px auto;
        }
    }
    .my-appointment{
        position: relative;
        width: 90%;
        margin: 3px auto;
        height: 45px;
        line-height: 34px;
        border-radius: 5px;
        background: #a5a4a4;
        padding: 10px;
        color: #fff;
    }
    .more{
        position: absolute;
        top: 8px;
        right: 8px;
    }
</style>

