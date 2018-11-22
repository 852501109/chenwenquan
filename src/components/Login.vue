<template>
  <div class="box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="手机登陆" name="first"></el-tab-pane>
      <el-tab-pane label="账号登陆" name="second"></el-tab-pane>
    </el-tabs>
    <el-form :model="ruleForm2" status-icon :rules="rules2" v-if="activeName !== 'first'" ref="ruleForm2">
      <el-row>
        <el-form-item prop="accont">
          <el-input v-model="ruleForm2.accont" placeHolder="手机号" autocomplete="off" prefix-icon="icon iconfont icon-yonghu"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input class="pwd" type="password" name="pwd" autocomplete="off" placeHolder="密码" v-model="ruleForm2.pass" prefix-icon="icon iconfont icon-mima"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-form :model="ruleForm2" status-icon :rules="rules2" v-if="activeName === 'first'" ref="ruleForm2">
      <el-row>
        <el-form-item prop="phone">
          <el-input v-model="ruleForm2.phone" placeHolder="手机号"></el-input>
          <timer-btn @run="sendCode" :smsType="ruleForm2.smsType" :cellPhone="ruleForm2.phone" ref="timer"></timer-btn>
        </el-form-item>
        <el-form-item prop="phoneCode">
          <el-input v-model="ruleForm2.phoneCode" placeHolder="输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormByPhone('ruleForm2')">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <div class="findaccontorpassword" @click="findPwdOrAccount()">找回账号或密码</div>
  </div>
</template>
 <style lang="scss" scoped>
.box {
    width: 300px;
    min-height: 200px;
    background: white;
    margin-top: 30px;
    padding: 10px;
    text-align: left;
    .findaccontorpassword {
        display: inline-block;
        text-align: right;
        color: #576b95;
        cursor: pointer;
        margin-left: 100px;
    }
}
.title {
    font-size: 20px;
    margin-bottom: 15px;
}
</style>
<script>
import crypto from "crypto";
import { loginByUsername, loginByCode, loginByPwd } from "@/api/login.js";
import { existInstitutionUnitet } from "@/api/public";
import { filterPhone,tap } from "@/utils/publicMethods";
import { getToken, setToken, removeToken } from "@/utils/auth";
import timerBtn from "@/components/timerBtn";
export default {
    name: "login",
    components: {
        timerBtn
    },
    data() {
        const checkAccount = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!myreg.test(filterPhone(value))) {
                return callback(new Error("请输入正确的手机号"));
            } else {
                existInstitutionUnitet(filterPhone(value))
                    .then(res => {
                        if (res.data.returnCode !== 1) {
                            this.isExitPhone = false;
                            callback(new Error(res.data.returnMsg));
                        } else {
                            this.isExitPhone = true;
                            callback();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        };
        const validatePass = (rule, value, callback) => {
            const numsReg = /^.{6,15}$/;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!numsReg.test(value)) {
                callback(new Error("请输入6-15位长度的密码"));
            } else {
                callback();
            }
        };
        const phone = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!myreg.test(filterPhone(value))) {
                callback(new Error("请输入正确的手机号"));
            } else {
                existInstitutionUnitet(filterPhone(value)).then(res => {
                        if (res.data.returnCode !== 1) {
                            this.isExitPhone = false;
                            callback(new Error(res.data.returnMsg));
                        } else {
                            this.isExitPhone = true;
                            callback();
                        }
                    }).catch(() => {
                        callback(new Error(res.data.returnMsg));
                    });
            }
        };
        const phoneCode = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            let verificationReg = /^[0-9]{4}$/;
            if (!myreg.test(filterPhone(this.ruleForm2.phone))) {
                return callback(new Error("请输入正确的手机号并获取验证码"));
            } else if (value === "") {
                callback(new Error("短信验证码不能为空"));
            } else if (!verificationReg.test(value)) {
                return callback(new Error("请输入四位数字的验证码"));
            } else {
                callback();
            }
        };
        return {
            activeName: "first",
            isExitPhone: false,
            checked: false,
            ruleForm2: {
                pass: "",
                accont: "",
                phone: "",
                phoneCode: "",
                smsType: 2
            },
            rules2: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                accont: [{ validator: checkAccount, trigger: "blur" }],
                phone: [{ validator: phone, trigger: "blur" }],
                phoneCode: [{ validator: phoneCode, trigger: "blur" }]
            }
        };
    },
    mounted() {
        const ele = document.querySelector('body')
        tap(ele,function(){
            console.log('封装成功')
        })
        this.checkLogin();
        if (sessionStorage.getItem("registerSuccessPhone")) {
            this.ruleForm2.phone = sessionStorage.getItem(
                "registerSuccessPhone"
            );
            this.ruleForm2.accont = sessionStorage.getItem(
                "registerSuccessPhone"
            );
            this.isExitPhone = false;
            this.activeName = "second";
            this.$refs.ruleForm2.validateField("phone");
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    loginByPwd(filterPhone(this.ruleForm2.accont), this.ruleForm2.pass)
                        .then(res => {
                            //setToken('session','11asdasd')
                            if (res.data.returnCode !== 1) {
                                this.$refs.ruleForm2.fields[1].error =
                                    res.data.returnMsg;
                                return false;
                            } else {
                                sessionStorage.setItem(
                                    "institutionId",
                                    res.data.returnDataList
                                );
                                this.$router.push({ path: "/main" });
                            }
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                    if (this.ruleForm2.pass == "admin" && this.ruleForm2.accont == "admin"
                    ) {
                        this.$router.push({ path: "/main" });
                    } else {
                        console.log("error submit!!");
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        checkLogin() {
            if (!sessionStorage.getItem("institutionId")) {
                this.$router.push("/");
            } else {
                this.$router.push("/main");
            }
        },
        submitFormByPhone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    loginByCode(filterPhone(this.ruleForm2.phone), this.ruleForm2.phoneCode)
                        .then(res => {
                            if (res.data.returnCode !== 1) {
                                this.$message({
                                    message: res.data.returnMsg,
                                    type: "warning"
                                });
                                return false;
                            } else {
                                sessionStorage.setItem(
                                    "institutionId",
                                    res.data.returnDataList
                                );
                                this.$router.push({ path: "/main" });
                            }
                        })
                        .catch(err => {});
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        sendCode(data) {
            //vuex，将来使用
            // console.log(this.$store.state.verificationCode.second)
            // this.$store.dispatch('computed_second')
            // console.log(this.$store.state.verificationCode.second)
            if (!this.isExitPhone) {
                return false;
            }
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
        handleClick(tab, event) {
            this.$refs["ruleForm2"].resetFields();
        },
        findPwdOrAccount() {
            this.$router.push({ path: "/findPwdOrAccount" });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>