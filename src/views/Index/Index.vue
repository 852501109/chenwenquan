<template>
    <div>
        <div class="authstate" @click="authhref()">{{authenticationMsg}}</div>
        <el-row class="tac">
            <el-col :span="5">
                <nav-bar></nav-bar>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { getInstitutionAuthById } from "@/api/authentication";
import { filterAuthMsg } from "@/utils/publicMethods";
import navBar from "@/components/getRoleNav";
export default {
    name: "Index",
    components: {
        navBar
    },
    created() {
        this.getNavBar();
        //this.checkLogin();
    },
    // watch: {
    //     $route: "checkLogin"
    // },
    mounted() {
        this.getAuthMsg();
    },
    data() {
        return {
            isCollapse: false,
            authenticationMsg: "未认证",
            navList: []
        };
    },
    methods: {
        checkLogin() {
            if (!sessionStorage.getItem("institutionId")) {
                this.$router.push("/");
            }
        },
        getNavBar() {
            this.$jsonp(`http://192.168.199.109:18080/services/tb/web/sys/resource/system/v2/getMapList`,{roleId:1}).then(json => {
                    this.navList.push(json);
                }).catch(err => {
                    console.log(err);
                });
        },
        getAuthMsg() {
            getInstitutionAuthById(sessionStorage.getItem("institutionId")).then(res => {
                    if (res.data.returnCode === 1) {
                        filterAuthMsg(res.data.returnDataList.state,this)
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        authhref() {
            if (this.authenticationMsg === "未认证") {
                this.$router.push({ path: "/agreement" });
            }
        },
        institutionalReview() {
            this.$router.push({ path: "/institutionalReview" });
        }
    }
};
</script>
<style lang="scss" scoped>
.authstate {
    position: absolute;
    top: 24px;
    right: 25px;
    cursor: pointer;
    float: right;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
