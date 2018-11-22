<template>
    <div style="background:#eee;">
        <el-row>
            <el-col :span="4">
                <h2>
                    找回账号
                </h2>
            </el-col>
        </el-row>
        <el-row class="container" v-if="stepStart">
            <el-form label-width="80px">
                <el-col :span="24">
                    <span>帐号类型：</span>
                    <el-radio v-model="radio" label="1">公众号</el-radio>
                    <el-radio v-model="radio" label="2">小程序</el-radio>
                </el-col>
                <el-col :span="24">
                    <div class="wrap">
                        <el-form-item label="公众号">
                            <el-input v-model="name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-button type="primary" @click="submitForm()">下一步</el-button>
            </el-form>

        </el-row>
        <el-row class="container" v-if="!stepStart">
            <img src="@/assets/image/ewm.gif" />
            <p>请使用找回帐号需要身份验证，请用绑定了注册主体个人银行卡的微信扫描二维码。本次验证方式不扣除任何费用。微信扫描二维码进行验证</p>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "Register",
    data() {
        return {
            stepStart: true,
            radio: "1",
            name: "",
            type: [
                {
                    code: "1",
                    title: "服务号",
                    msg: "适合企业或者组织注册"
                }
            ]
        };
    },
    methods: {
        submitForm() {
            this.stepStart = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 85%;
    margin: 0px auto;
    min-height: 700px;
    background: #fff;
    padding: 20px;
}
.wrap {
    width: 40%;
    margin: 0px auto;
}
</style>

