<template>
    <div>
        <el-row>
            <el-col :span="4">
                <div>
                    <img width="50" src="@/assets/image/logo.png">中医药公众平台
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <h3>找回账号或密码</h3>
            </el-col>
            <el-col :span="24">
                <div class="container">
                    <div class="type_box">
                        <div @click="typeSelect(item.code)" v-for="(item,index) in type" :key="index">{{item.title}}
                            <p>{{item.msg}}</p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "Register",
    data() {
        return {
            type: [
                {
                    code: 1,
                    title: "找回密码",
                    msg: "记得账户手机号,可通过手机验证码找回"
                },
                {
                    code: 2,
                    title: "找回账号",
                    msg: "记得密码手机号,可通过手机验证码找回"
                }
            ]
        };
    },
    methods: {
        typeSelect(code) {
            switch (code) {
                case 1:
                    this.$router.push({ path: "/findpwd" });
                    break;
                case 2:
                    this.$router.push({ path: "/findaccount" });
                    break;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 70%;
    margin: 0px auto;
    min-height: 700px;
    background: #fff;
    padding: 20px;
}
.type_box {
    width: 40%;
    min-height: 300px;
    margin: 0px auto;
    div {
        cursor: pointer;
        width: 43%;
        border: 1px solid rgb(138, 137, 137);
        min-height: 200px;
        display: inline-block;
        margin-left: 20px;
    }
    div:hover {
        background: #eee;
    }
    p {
        color: #555;
    }
}
</style>