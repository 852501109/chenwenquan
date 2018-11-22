<template>
    <div>
        <el-row>
            <el-col>
                <el-steps :active="active" finish-status="success">
                    <el-step title="1 同意协议"></el-step>
                    <el-step title="2 填写资料"></el-step>
                    <el-step title="3 上传证书"></el-step>
                    <el-step title="4 完成"></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <div>{{resMsg}}</div>
        <el-button type="primary" @click="submitForm()">{{backMsg}}</el-button>
    </div>
</template>
<script>
import { getInstitutionAuthById,insertInstitutionAuth } from "@/api/authentication";
export default {
    name:'AuthEnd',
    data() {
        return {
            resMsg: "注册信息已提交，审核中",
            active: 4,
            name: "某某",
            backMsg: "回到首页",
            path: "/main",
            id: sessionStorage.getItem("institutionId")
        };
    },
    mounted() {
        this.getAuthEnd()
    },
    methods: {
        submitForm() {
            this.$router.push({ path: this.path });
        },
        getAuthEnd(){
            getInstitutionAuthById(this.id).then( res =>{
                const data = res.data.returnDataList
                if(data === "" || data.isValid === 0){
                    this.insertAuth()
                }else{
                    this.$router.push({path:'/authEnd'})
                }
            }).catch(err =>{
                
            })
        },
        insertAuth() {
            insertInstitutionAuth(this.id, 1, 0).then(res => {
                if (res.data.returnCode !== 1) {
                    this.resMsg = res.data.returnMsg;
                    this.active = 3;
                    this.backMsg = "上一步";
                    this.path = "/uploadcertificate";
                    return false;
                }
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>

