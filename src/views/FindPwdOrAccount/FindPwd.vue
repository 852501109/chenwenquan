<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="phone">
                <el-input v-model="ruleForm2.phone" placeholder="手机号 " autocomplete="off"></el-input>
            </el-form-item>
            <timer-btn @run="sendCode" :smsType="ruleForm2.smsType" :cellPhone="ruleForm2.phone" ref="timer"></timer-btn>
            <el-form-item label="输入验证码" prop="verificationCode">
                <el-input v-model="ruleForm2.verificationCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import timerBtn from "@/components/timerBtn";
import { existInstitutionUnitet } from "@/api/public";
import { changePwdByMobile } from "@/api/findPwdorAccount";
import { filterPhone } from "@/utils/publicMethods";
export default {
    name:'FindPwd',
    components: {
        timerBtn
    },
    data() {
        const phone = (rule, value, callback) => {
            let myreg = /^[0-9]{11}$/;
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!myreg.test(filterPhone(value))) {
                //callback(new Error('请输入正确的手机号'));
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
        const verificationCode = (rule, value, callback) => {
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
                callback(new Error("请输入6-15位的密码"));
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
        return {
            isExitPhone: false,
            ruleForm2: {
                phone: "",
                verificationCode: "",
                pass: "",
                checkPass: "",
                smsType: 3
            },
            rules2: {
                phone: [{ validator: phone, trigger: "blur" }],
                verificationCode: [
                    { validator: verificationCode, trigger: "blur" }
                ],
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    changePwdByMobile(
                        filterPhone(this.ruleForm2.phone),
                        this.ruleForm2.verificationCode,
                        this.ruleForm2.pass
                    ).then(res => {
                            if (res.data.returnCode !== 1) {
                                this.$message({
                                    message: res.data.returnMsg,
                                    type: "warning"
                                });
                                return false;
                            } else {
                                sessionStorage.setItem(
                                    "registerSuccessPhone",
                                    this.ruleForm2.phone
                                );
                                sessionStorage.setItem(
                                    "registerSuccessPwd",
                                    this.ruleForm2.pass
                                );
                                alert("密码修改成功");
                                this.$router.push({ path: "/" });
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        sendCode(data) {
            if (!this.isExitPhone) {
                return;
            }
            let myreg = /^[0-9]{11}$/;
            if (!this.ruleForm2.phone) {
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