<template>
  <div>
    <el-row>
      <el-col>
        <el-steps :active="active" finish-status="success">
          <el-step title="1 同意协议"></el-step>
          <el-step title="2 填写资料"></el-step>
          <el-step title="3 上传证书"></el-step>
          <el-step title="4 完成"></el-step>
          <!-- <el-step title="5 填写发票"></el-step>
                <el-step title="6 支付费用"></el-step> -->
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <section style="text-align:left;width:40%;margin:200px auto;">
          1 、本条所述平台内容是指用户使用本服务过程中所制作、复制、发布、传播的任何内容。<br /> 2、不得利用微信公众帐号或微信公众平台服务制作、复制、发布、传播如下法律、法规和政策禁止的内容。

          <br /> 3、微信公众帐号的所有权归腾讯公司所有，用户完成申请注册手续后，获得微信公众帐号的使用权，该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。

          <br /> 4、用户应遵守本协议的各项条款，正确、适当地使用本服务，如用户违反本协议中的任何条款，腾讯公司有权依据本协议终止对违约用户微信公众帐号提供服务等等

          <br />
        </section>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submitForm()">下一步</el-button>

  </div>
</template>
<script>
import { getInstitutionAuthById } from "@/api/authentication";
export default {
    name:'Agreement',
    data() {
        return {
            active: 0,
            id:sessionStorage.getItem("institutionId"),
            organization: {
                name: "",
                email: "",
                type: "",
                description: "",
                legalperson: "",
                position: ""
            },
            rules: {}
        };
    },
    created(){
        this.getAuth()
    },
    methods: {
        submitForm() {
            this.$router.push({ path: "/authentication" });
        },
        getAuth(){
              getInstitutionAuthById(this.id).then( res =>{
                const data = res.data.returnDataList
              if(data == "" || data.isValid === 0){
                console.log('允许认证')
              }else{
                this.$router.push({path:'/authEnd'})
              }
          }).catch(err =>{
               this.$message({
                  message: err,
                  type: "warning"
               });
          })
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
