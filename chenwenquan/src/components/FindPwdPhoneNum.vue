<template>

  <el-container class="contaner content">
    <el-main>
      <div class="maindiv">
        <el-row :gutter="20" class="pXiah">
          <el-col :span="20">
            <div class="grid-content bg-purple"><input ref="inpFocus" placeholder="请输入手机号" class="inpIphone" maxlength="11" @keyup="voidKeyUp" @blur="voidAll" v-model.number="cellPhone" /></div>
          </el-col>
          <div class="country-section">+86</div>
          <div class="tipmsg" style="top:50px;">{{tipmsg}}</div>
        </el-row>

        <el-row :gutter="20" class="btnr" style="">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-button type="danger" :class="{isVoidActive:!isVoidActive}" @click="getCodePage" style="border:0px;background:#10cb7e;width:92%;text-align:center">下一步</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

    </el-main>
    <public-js ref="publicjs"></public-js>
  </el-container>

</template>

<script>
import publicJs from "@/components/PublicJs";
export default {
    name: "findPwdPhoneNum",
    components: {
        publicJs
    },
    data() {
        return {
            tipmsg: "",
            cellPhone: "",
            isVoidActive:false
        };
    },
    mounted() {
        this.cellPhone = this.$route.query.cellPhone;
    },
    methods: {
        history1() {
            this.$router.push({ path: "/loginByPwd" });
        },
        voidAll(){
            this.idenfyCellphone(this.cellPhone,this)
        },
        voidKeyUp(){
            let myreg = /^[0-9]{11}$/;
            if(myreg.test(this.cellPhone)){
               this.isVoidActive = true
            }
        },
        getCodePage() {
            if (!this.$refs.publicjs.validCellphone(this.cellPhone)) {
                return;
            }
            let myreg = /^[0-9]{11}$/;
            if (!myreg.test(this.cellPhone)) {
                this.tips().warning("请输入正确的手机号");
                return;
            }
            var _slf = this;
            var url =
                this.$refs.publicjs.server_customer_url +
                "/customerUnite/notExistCustomerUnite";
            var params = {
                cellPhone: this.cellPhone
            };

            this.$refs.publicjs.get(url, params, function(data) {
                if (data.returnStatus == 1) {
                    _slf.$router.push({
                        path: "/changePwdPage",
                        query: params
                    });
                } else {
                    _slf.tips().warning("手机号未注册");
                }
            });
        },
        spaStatus() {
            var url =
                this.$refs.publicjs.server_customer_url +
                "/customerUnite/loginByCode";
            var params = {};
            if (this.loginType == 1) {
                url =
                    this.$refs.publicjs.server_customer_url +
                    "/customerUnite/loginByCode";
                params = {
                    cellPhone: this.cellPhone,
                    sendMterrcode: this.sendMterrcode,
                    mtmsgid: this.mtmsgid
                };
            }

            if (this.loginType == 2) {
                url =
                    this.$refs.publicjs.server_customer_url +
                    "/customerUnite/loginByPwd";
                params = {
                    cellPhone: this.cellPhone,
                    passwd: this.passwd
                };
            }

            var slf = this;

            this.$refs.publicjs.get(url, params, function(data) {
                if (data.returnStatus == 1) {
                    slf.$router.push({ path: "/status" });
                } else {
                    this.tips().warning(data.returnMsg);
                }
            });
        }
    }
};
</script>

<style scoped>
.fanhui {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 1.5rem;
    border: 1px solid #ffffff;
    color: #ffffff;
    font-size: 2rem;
    float: left;
}

.title1 {
    font-size: 2rem;
    text-align: center;
    color: #ffffff;
    margin-top: 3rem;
}
.maindiv {
    margin: 0 auto;
    min-width: 300px;
    max-width: 480px;
}
.pXiah {
    margin-top: 20px;
    border-bottom: 2px solid #ffffff;
    padding-bottom: 20px;
    background: #ffffff;
    border-radius: 5px;
    height: 40px;
    padding-top: 10px;
}
.inpIphone {
    background: #ffffff;
    border: none;
    outline: none;
    padding-left: 37px;
    line-height: 23px;
}
.btn {
    height: 1.6rem;
    text-align: center;
    width: 100%;
    background-color: #11cc49;
    border-radius: 0.3rem;
}
.btnr {
    margin-top: 1.5rem;
    padding-bottom: 0.2rem;
    height: 3rem;
    padding-top: 10px;
}
</style>
