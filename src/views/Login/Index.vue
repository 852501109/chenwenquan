<template>
  <div class="logo-wrap">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <div class="registerandlgn">
          <div class="register" @click="register()">
            <i class="icon iconfont">&#xe697;</i>立即注册</div>|
          <div class="lang">
            <i class="icon iconfont">&#xe77a;</i>简体中文</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="login-wrap">
      <el-col :span="24">
        <div class="qr-code"><img src="@/assets/image/ewm.gif" />
          <div>扫描并关注中医药公众平台</div>
        </div>
        <LoginBox class="login-box"></LoginBox>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LoginBox from "@/components/Login";
export default {
    name: "Login",
    components: {
        LoginBox
    },
    watch: {
        $route: "checkLogin"
    },
    methods: {
        register() {
            this.$router.push({ path: "/register" });
        }
    }
};
</script>
<style lang="scss" scoped>
.logo-wrap {
    border-top: 7px solid green;
    .login-box,
    .qr-code {
        float: right;
    }
    .qr-code {
        width: 159px;
        height: 202px;
        background: white;
        margin: 30px 200px 0px 10px;
        padding-top: 10px;
        div {
            font-size: 14px;
            width: 100px;
            text-align: center;
        }
    }
}
.registerandlgn {
    width: 500px;
    margin-top: 27px;
    div {
        display: inline-block;
        min-width: 100px;
        cursor: pointer;
    }
}
.login-wrap {
    position: absolute;
    right: 20px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    min-height: 500px;
    div {
        display: inline-block;
    }
}
</style>