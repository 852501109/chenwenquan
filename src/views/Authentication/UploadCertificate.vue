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
    <el-upload class="upload-demo" ref="upload" action="http://192.168.199.115:8080/institutionAuthAttachment/insertInstitutionAuthAttachment" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">不超过500kb</div>
    </el-upload>
    <el-button type="primary" @click="prev()">上一步</el-button>
    <el-button type="primary" @click="submitForm()">下一步</el-button>
  </div>
</template>
<script>
import {getInstitutionAuthById } from "@/api/authentication";
export default {
    name:'UploadCertificate',
    data() {
        return {
            active: 2,
            fileList: [],
            id: sessionStorage.getItem("institutionId")
        };
    },
    created(){
        this.getAuth()
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleChange(file, fileList) {
            this.fileList.push(file.name);
        },
        prev() {
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
        },
        submitForm() {
            console.log(this.fileList);
            if (this.fileList.length < 1) {
                alert("请上传附件");
                return false;
            }
            this.$router.push({ path: "/authEnd" });
        }
    }
};
</script>

