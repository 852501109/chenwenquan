<template>

  <el-container class="contaner content" >  
     <el-main>
       <div class="maindiv">
         <el-row :gutter="20" class="pXiah" >
          <el-col :span="24"><div class="grid-content bg-purple" style="font-size:1rem;color:#222">您的身份是？</div></el-col>
        </el-row>
         <el-row :gutter="20" class="" style="margin-top: 30px;">
          <el-col :span="12"><div class="grid-content bg-purple"><span @click="goDoctorAuth" class="bspan">医生</span></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple"><span @click="goPatientPage" class="bspan">患者</span></div></el-col>
        </el-row>
       </div>
     </el-main>
     <public-js  ref="publicjs"></public-js>
   </el-container>
</template>

<script>
import publicJs from '@/components/PublicJs'
export default {
  components:{
      publicJs
  },
  name: 'status',
  data () {
    return {
        customerId:""
    }
  },
  mounted() {
    this.customerId=this.$route.query.customerId;
  },
  methods:{
    history1(){
      //  this.$router.go(-1)
    },
    goDoctorAuth(){
      //医生界面待定
       this.tips().ordinary('医生界面待定，请选择患者')
       return
       sessionStorage.setItem('featureId',3)
        this.$router.push({path:"/doctorAuth",query:{
          customerId:this.customerId
        }});
    },
    goPatientPage(){
      sessionStorage.setItem('featureId',4)
      //逻辑变化  暂定直接跳转
      this.$router.push({path:"/patientIndex"})
      return
      var url=this.$refs.publicjs.server_customer_url+"/customerFeature/insertCustomerFeaturePatient";
      var params ={
        customerId:sessionStorage.getItem('customerId'),
        isValid:1,
        featureId:4
      }
      var slf = this;
      this.$refs.publicjs.post(url,params,function(data){
        if(data.returnStatus==1){
          slf.$router.push({path:"/patientIndex",query:{
          customerId:slf.customerId
        }});
        }else{
          alert(data.returnMsg);
        }
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.status{
  background-image: linear-gradient(to bottom, #6ad6af,#dedddd);
  height: 100vh;
  overflow: hidden;
  padding-left: 1rem;
}
.fanhui{
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 1.5rem;
  border:1px solid #ffffff;
  color: #ffffff;
  font-size:2rem;
  float: left;
}
.title1{
  font-size: 2rem;
  text-align: center;
  color: #ffffff;
  margin-top: 3rem;
}
.maindiv{
  margin:0 auto;
  min-width:300px;
  max-width: 480px; 
}
.divContent>p:first-child{
  margin:1rem 0;
  font-size: 1.5rem;
  color:#fff;
  font-weight: lighter;
}
.bspan{
    display: inline-block;
    border: 1px solid #ffffff;
    width: 91px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #26614b;
    border-radius: 12px;
    background: #fff;
}
</style>
