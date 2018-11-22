<template>
  <div id="app">
    <header>
      <el-row>
        <el-col :span="5">
          <div class="logo" @click="titleHref"><img src="@/assets/image/logo.png">中医药公众平台</div>
        </el-col>
        <div v-if="isLoging" class="user-state" @click="logout"><img width="30" src="@/assets/image/a.png">{{userName}}</div>
      </el-row>
    </header>
    <router-view/>
    <footer v-if="false">底部信息</footer>
  </div>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
            isLoging:false,
            userName:''
        };
    },
    mounted() {
        this.checkUser()
    },
    watch: {
        '$route':'checkUser'
    },
    methods: {
        titleHref() {
            sessionStorage.removeItem("registerSuccessPhone");
            this.$router.push({ path: "/" });
        },
        checkUser() {
            if (sessionStorage.getItem("institutionId")) {
                this.userName = sessionStorage.getItem("institutionId")
                this.isLoging = true
            }else{
                this.isLoging = false
            }
        },
        logout() {
            if (!sessionStorage.getItem("institutionId")) {
                return alert(
                    "请先登陆"
                );
            }
            if (confirm("是否退出？")) {
                sessionStorage.removeItem("institutionId");
                sessionStorage.removeItem("registerSuccessPhone");
                this.$router.push({ path: "/" });
            }
        }
    }
};
</script>

<style lang="scss" scope>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    header {
        background: #9bb1c7;
        height: 54px;
        line-height: 54px;
        .logo {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            img {
                width: 25px;
                vertical-align: middle;
            }
        }
        .user-state {
            float: right;
            margin-right: 100px;
            color: #fff;
            cursor: pointer;
            img {
                vertical-align: middle;
            }
        }
    }
    footer {
        position: relative;
        background: #9bb1c7;
        width: 100%;
        height: 54px;
        line-height: 54px;
        text-align: center;
    }
}
</style>
