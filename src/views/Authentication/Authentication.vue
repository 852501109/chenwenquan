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
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="机构名称" prop="name" autocomplete="off">
        <el-input v-model="ruleForm2.name"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="legalPerson" autocomplete="off">
        <el-input v-model="ruleForm2.legalPerson"></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="address" autocomplete="off">
        <el-input v-model="ruleForm2.address"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm2.phone"></el-input>
            </el-form-item> -->
      <!-- <timer-btn  @run="sendCode" ref="timer"></timer-btn> -->
      <el-form-item label="机构描述" prop="description">
        <el-input type="textarea" v-model="ruleForm2.description"></el-input>
      </el-form-item>
      <!-- <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm2.email"></el-input>
            </el-form-item> -->
      <el-form-item>
        <el-button @click="prev()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import timerBtn from '@/components/timerBtn'
import { insertInstitutionBaseinfo,getInstitutionAuthById } from "@/api/authentication";
import { chksafe ,filterPhone} from "@/utils/publicMethods"
export default {
    name:'AuthThentication',
    // components: {
    //     timerBtn
    // },
    data() {
        const checkName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("机构名称不能为空"));
            } else if (!chksafe(value)) {
                callback(new Error("不可输入非法字符"));
            } else if (value.length > 30) {
                callback(new Error("字数不得超过30"));
            } else {
                callback();
            }
        };
        const legalPerson = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("法人不能为空"));
            } else if (!chksafe(value)) {
                callback(new Error("不可输入非法字符"));
            } else if (value.length > 30) {
                callback(new Error("字数不得超过30"));
            } else {
                callback();
            }
        };
        const address = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("企业地址不能为空"));
            } else if (!chksafe(value)) {
                callback(new Error("不可输入非法字符"));
            } else if (value.length > 200) {
                callback(new Error("字数不得超过200"));
            } else {
                callback();
            }
        };
        // const phone = (rule, value, callback) => {
        //   let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
        //   if (!value) {
        //     return callback(new Error('手机号不能为空'));
        //   }else if(!myreg.test(filterPhone(value))) {
        //       callback(new Error('请输入正确的手机号'));
        //   }else{
        //       callback();
        //   }
        // }
        const description = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("描述必填"));
            } else if (!chksafe(value)) {
                callback(new Error("不可输入非法字符"));
            } else if (value.length > 200) {
                callback(new Error("字数不得超过200"));
            } else {
                callback();
            }
        };
        // const email = (rule, value, callback) => {
        //   let myreg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        //   if (!value) {
        //     return callback(new Error('邮箱不能为空'));
        //   }else if(!myreg.test(value)) {
        //       callback(new Error('请输入正确的邮箱号'));
        //   }else{
        //     callback();
        //   }
        // }
        return {
            active: 1,
            id: sessionStorage.getItem("institutionId"),
            ruleForm2: {
                name: "",
                legalPerson: "",
                address: "",
                // phone: '',
                description: ""
            },
            rules2: {
                name: [{ validator: checkName, trigger: "blur" }],
                legalPerson: [{ validator: legalPerson, trigger: "blur" }],
                address: [{ validator: address, trigger: "blur" }],
                // phone: [
                //   { validator: phone, trigger: 'blur' }
                // ],
                description: [{ validator: description, trigger: "blur" }]
                // email: [
                //   { validator: email, trigger: 'blur' }
                // ],
            }
        };
    },
    created(){
        this.getAuth()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const subData = this.ruleForm2;
                    insertInstitutionBaseinfo(
                        subData.name,
                        subData.legalPerson,
                        subData.address,
                        subData.description,
                        sessionStorage.getItem("institutionId")
                    ).then(res => {
                            if (res.data.returnCode !== 1) {
                                this.$message({
                                    message: res.data.returnMsg,
                                    type: "warning"
                                });
                                return false;
                            }
                            this.$router.push({ path: "/uploadcertificate" });
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
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
        prev() {
            this.$router.push({ path: "/agreement" });
        },
        sendCode(data) {
            let myreg = /^[0-9]{11}$/;
            if (this.ruleForm2.phone) {
                console.log("2");
            } else if (!myreg.test(filterPhone(this.ruleForm2.phone))) {
                console.log("2");
            } else {
                this.$refs.timer.start();
            }
        }
    }
};
</script>