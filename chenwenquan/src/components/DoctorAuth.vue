<template>

    <el-container class="contaner content">
        <el-header class="title1">

            <i class="icon iconfont fanhui" @click="history1">&#xe624;</i>
            医生的信息
        </el-header>
        <el-main>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="姓名" prop="fullName">
                    <el-input v-model="ruleForm.fullName" type="" placeholder="请输入姓名" class="">
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sexId">
                    <el-radio-group v-model="ruleForm.sexId">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择出生日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="职称" prop="medicalTitle">
                    <el-input v-model="ruleForm.medicalTitle" type="" placeholder="请输入职称" class="">
                    </el-input>
                </el-form-item>

                <el-form-item label="工作单位" prop="institutionName">
                    <el-input v-model="ruleForm.institutionName" type="" placeholder="请输入姓名" class="">
                    </el-input>
                </el-form-item>

                <el-form-item label="擅长主治" prop="areasExpertise">
                    <el-input v-model="ruleForm.areasExpertise" type="textarea" :rows="2" placeholder="请输入擅长主治" class="">
                    </el-input>
                </el-form-item>

                <el-form-item label="简介" prop="summary">
                    <el-input v-model="ruleForm.summary" type="textarea" placeholder="请输入简介" :rows="2" class="">
                    </el-input>
                </el-form-item>
                <el-form-item label="身份证" prop="">
                    <el-upload :data="upload.idCard" action="http://192.168.199.118:8080/Image/uploadOriginal" list-type="picture-card" ref="uploadIdCard" :file-list="idCardFileList" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :http-request="httpRequest">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <!-- <el-form-item label="执业证" prop="">
                    <el-upload :action="uploadUrl" list-type="picture-card" ref="uploadlicense" :file-list="licenseList" :on-preview="handlePreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                </el-form-item>

                <el-form-item label="职称证" prop="">
                    <el-upload :action="uploadUrl" list-type="picture-card" ref="uploadtitleCertificate" :file-list="titleCertificateList" :on-preview="handlePreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                </el-form-item> -->
                <el-button type="danger" style="margin: 0 auto" @click="saveAuth('ruleForm')">确定</el-button>
            </el-form>
        </el-main>
        <public-js></public-js>
    </el-container>
</template>
<script>
// import '@/assets/Mdate.css'
import publicJs from "@/components/PublicJs";
import {uploadOriginal} from '@/api/Upload'
export default {
    name: "doctorAuth",
    components: {
        publicJs
    },
    data() {
        return {
            uploadUrl: "",
            idCardFileList: [],
            licenseList: [],
            titleCertificateList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            upload: {
                idCard: {}
            },
            ruleForm: {
                customerId: "",
                fullName: "",
                sexId: "0",
                birthday: "",
                medicalTitle: "",
                institutionName: "",
                areasExpertise: "",
                summary: "",
                idCardImgUrl: [],
                licenseImgUrl: [],
                titleCertificateImgUrl: []
            },
            rules: {
                fullName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                sexId: [
                    { required: true, message: "请选择性别", trigger: "blur" }
                ],
                birthday: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择出生年月日",
                        trigger: "change"
                    }
                ],
                medicalTitle: [
                    { required: true, message: "请输入职称", trigger: "blur" }
                ],
                institutionName: [
                    {
                        required: true,
                        message: "请输入工作单位",
                        trigger: "blur"
                    }
                ],
                areasExpertise: [
                    {
                        required: true,
                        message: "请输入擅长主治信息",
                        trigger: "blur"
                    }
                ],
                summary: [
                    { required: true, message: "请输入简介", trigger: "blur" }
                ]
            }
        };
    },
    mounted() {
        this.ruleForm.customerId = this.$route.query.customerId;
        // this.uploadUrl=this.$refs.publicjs.server_customer_url+"/customerAuthAttachment/uploadFile";
        // this.$refs.uploadIdCard.action = this.$refs.publicjs.server_customer_url + "/customerAuthAttachment/uploadFile";
        // this.$refs.uploadlicense.action = this.$refs.publicjs.server_customer_url + "/customerAuthAttachment/uploadFile";
        // this.$refs.uploadtitleCertificate.action = this.$refs.publicjs.server_customer_url + "/customerAuthAttachment/uploadFile";
        new Mdate("birthdayInputId", {
            //"dateShowBtn"为你点击触发Mdate的id，必填项
            beginYear: "1900",
            //此项为Mdate的初始年份，不填写默认为2000
            beginMonth: "10",
            //此项为Mdate的初始月份，不填写默认为1
            beginDay: "24",
            //此项为Mdate的初始日期，不填写默认为1
            endYear: "2050",
            //此项为Mdate的结束年份，不填写默认为当年
            endMonth: "1",
            //此项为Mdate的结束月份，不填写默认为当月
            endDay: "1",
            //此项为Mdate的结束日期，不填写默认为当天
            format: "-"
            //此项为Mdate需要显示的格式，可填写"/"或"-"或".",不填写默认为年月日
        });
        // document.getElementById("birthdayInputId").click();
    },
    methods: {
        history1() {
            this.$router.push({
                path: "/status",
                query: {
                    customerId: this.ruleForm.customerId
                }
            });
        },
        httpRequest(options) {
            let file = options.file;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            this.upload.idCard = {extName:file.name,fileContent:fileReader.result}
            
            console.log(fileReader.result)
            console.log(fileReader.readyState,fileReader.result.split(',')[1])
            uploadOriginal(file.name,fileReader.result.split(',')[1]).then(res =>{
                console.log(res)
            })
        },
        handleChange(file, fileList) {
            console.log(file);
        },
        checkUpload() {
            let isVoid = false;

            return isVoid;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            console.log(file);
        },
        saveAuth(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    var url =
                        this.$refs.publicjs.server_customer_url +
                        "/customerAuth/insertCustomerAuthAndBaseInfo";
                    var slf = this;
                    var params = this.ruleForm;

                    this.$refs.publicjs.post(url, params, function(data) {
                        if (data.returnStatus == 1) {
                            this.tips().success("保存成功");
                            slf.$router.push({
                                path: "/doctorPage",
                                query: {
                                    customerId: slf.ruleForm.customerId
                                }
                            });
                        } else {
                            this.tips().warning(data.returnMsg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pMessage {
    color: #6ad6af;
    font-size: 2rem;
    margin-bottom: 1rem;
}
.pHeade > span {
    font-size: 2rem;
    color: #ccc;
}
.inpConte {
    width: 80vw;
    height: 2rem;
    border: 0.07rem solid #6ad6af;
    border-radius: 1rem;
    padding-left: 0.8rem;
}
.pHeade {
    margin-bottom: 1rem;
}
.divFooter {
    width: 80vw;
    height: 2.3rem;
    margin: 3rem auto;
    border-radius: 1rem;
    background: #6ad6af;
    color: #fff;
    text-align: center;
    line-height: 2.3rem;
}
</style>
