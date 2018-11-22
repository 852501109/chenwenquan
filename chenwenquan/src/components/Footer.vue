<template>
    <footer v-if=" isShow ">
        <el-row>
            <el-col :span="8"  >
                <router-link to="/patientIndex">
                    <div  @click="changeStatus(0)" :class="{active:active === 0 }">
                        <i class="icon iconfont">&#xe630;</i>
                        <div class="name">医疗首页</div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                    <div  @click="changeStatus(1)" :class="{active:active === 1 }">
                        <img width="40" style="margin: 3px auto;" :src="require('@/assets/image/中医社区.png')" />
                        <!-- <i class="icon iconfont">&#xe6bd;</i> -->
                        <div class="name">中医社区</div>
                    </div>
            </el-col>
            <!-- <el-col :span="4" class="add" style="bottom: 8px;">
                <i class="icon iconfont">&#xe6c4;</i>
            </el-col>
            <el-col :span="5"  >
                    <div @click="selectDiagnosisIndex" :class="{active:active === 2 }">
                        <i class="icon iconfont">&#xe616;</i>
                        <div class="name">诊疗</div>
                    </div>
            </el-col> -->
            <el-col :span="8">
                    <div @click="changeStatus(2)" :class="{active:active === 2 }">
                        <i class="icon iconfont">&#xe60c;</i>
                        <div class="name">{{personState}}</div>
                    </div>
            </el-col>
        </el-row>
    </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"foot",
    watch:{
      '$route':'checkState'
    },
    methods:{
        changeStatus(index){
            this.active = index
            if(this.personState === '未登录'){
                this.$router.push({path:'/'})
            }
        },
        checkState(){
            if(sessionStorage.getItem('customerId')){
                this.personState = '个人中心'
            }else{
                this.personState = '未登录'
            }
        },
        selectDiagnosisIndex(){
            this.active = 2
            console.log(this.featureId)
            if(this.featureId === '3'){
                this.$router.push({path:'/doctorDiagnosisIndex'})
            }else if(this.featureId === '4'){
                this.$router.push({path:'/patientDiagnosisIndex'})
            }else{
                this.tips().warning('没有找到角色信息')
            }
        }
    },
    computed: {
        ...mapState({
            customerId: function(state) {
                if (state.userInfo.customerId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.customerId;
            }
        })
    },
    created(){
        this.$root.eventHub.$on('footShow', (res)=>{
            this.isShow = res
        })
    },
    data(){
        return {
            isShow:false,
            personState:'个人中心',
            active:0,
            featureId:sessionStorage.getItem('featureId')
        }
    },
}
</script>
<style lang="scss" scoped>
    footer{
        .active{
            color: #10cb7e;
        }
        position: fixed;
        width: 100%;
        height: 65px;
        bottom: 0px;
        background: #fff;
        text-align: center;
        cursor: pointer;
        color: #504f4f;
        font-size: 14px;
        border-top: 3px solid #eee;
        div.el-col{
            position: relative;
            bottom: 2px;
            vertical-align: bottom;
        }
        div.el-row{
            position: relative;
            height: 70%;
            top: 13px;
        }
        i{
            font-size:30px !important; 
        }
        .add{
            i{
                background: green;
                border-radius: 30px;
                color:#fff;
                font-size: 46px !important;
            } 
            div{
                margin-bottom:30px;
            }
        }
    }
</style>


