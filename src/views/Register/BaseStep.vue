 <template>
  <div>
    类型{{this.$route.query.rigisterType}}
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item  prop="phone">
        <el-input v-model="ruleForm2.phone" placeHolder="手机号"></el-input>
        <timer-btn @run="sendCode" :cellPhone="ruleForm2.phone" :smsType="ruleForm2.smsType" ref="timer"></timer-btn>
      </el-form-item>
      <el-form-item label="输入短信验证码" prop="phoneCode">
        <el-input v-model="ruleForm2.phoneCode"></el-input>
      </el-form-item>
      <el-form-item label="输入图片验证码" prop="imgCode">
        <el-input v-model="ruleForm2.imgCode"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
          <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
        </div>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
    
<script>
import timerBtn from "@/components/timerBtn";
import SIdentify from "@/components/Identify";
import { regInstitutionUnite } from "@/api/register";
import { existInstitutionUnitet } from "@/api/public";
import { filterPhone } from "@/utils/publicMethods";
export default {
    name: "BaseStep",
    data() {
        const phone = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!myreg.test(filterPhone(value))) {
                callback(new Error("请输入正确的手机号"));
            } else {
                existInstitutionUnitet(filterPhone(value)).then(res => {
                        if (res.data.returnCode === 1) {
                            callback(new Error("手机号已注册"));
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            }
        };
        const phoneCode = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            let verificationReg = /^[0-9]{4}$/;
            if (!myreg.test(filterPhone(this.ruleForm2.phone))) {
                return callback(new Error("请输入正确的手机号并获取验证码"));
            } else if (value.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "") === "") {
                callback(new Error("短信验证码不能为空"));
            } else if (!verificationReg.test(value)) {
                return callback(new Error("请输入四位数字的验证码"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            const numsReg = /^.{6,15}$/;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!numsReg.test(value)) {
                callback(new Error("请输入6-15位长度的密码"));
            } else {
                if (this.ruleForm2.checkPass !== "") {
                    this.$refs.ruleForm2.validateField("checkPass");
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        const imgCode = (rule, value, callback) => {
            const numsReg = /^.{6,15}$/;
            if (value === "") {
                callback(new Error("验证码不能为空"));
            } else if (value !== this.identifyCode) {
                callback(new Error("验证码不一致"));
            } else {
                callback();
            }
        };
        return {
            verifycode: "",
            identifyCodes: "12345780",
            identifyCode: "",
            ruleForm2: {
                pass: "",
                phoneCode: "",
                checkPass: "",
                phone: "",
                age: "",
                imgCode: "",
                smsType: 1
            },
            rules2: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                phone: [{ validator: phone, trigger: "blur" }],
                phoneCode: [{ validator: phoneCode, trigger: "blur" }],
                imgCode: [{ validator: imgCode, trigger: "blur" }]
            }
        };
    },
    components: {
        timerBtn,
        SIdentify
    },
    mounted() {
        // 验证码初始化
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    regInstitutionUnite(
                        filterPhone(this.ruleForm2.phone),
                        this.ruleForm2.phoneCode,
                        this.ruleForm2.pass,
                        this.ruleForm2.smsType,
                        this.$route.query.rigisterType
                    ).then(res => {
                            if (res.data.returnCode !== 1) {
                                //this.$refs.ruleForm2.fields[1].error=res.data.returnMsg
                                this.$message({
                                    message: res.data.returnMsg,
                                    type: "warning"
                                });
                                return false;
                            }
                            sessionStorage.setItem(
                                "institutionId",
                                res.data.returnDataList
                            );
                            sessionStorage.setItem(
                                "registerSuccessPhone",
                                this.ruleForm2.phone
                            );
                            this.$router.push({ path: "/registersucess" });
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        sendCode(data) {
            this.$refs.ruleForm2.validateField("phone");
            let myreg = /^[0-9]{11}$/;
            if (!this.ruleForm2.phone) {
                console.log("2");
            } else if (!myreg.test(filterPhone(this.ruleForm2.phone))) {
                console.log("2");
            } else {
                this.$refs.timer.start();
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 生成随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 切换验证码
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        // 生成四位随机验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log(this.identifyCode);
        }
    }
};
</script>
<style lang="scss" scope>
.phoneBefore {
    position: absolute;
    width: 30px;
    left: 0px;
}
.identifybox {
    width: 100px;
    margin: 0px auto;
}
</style>
