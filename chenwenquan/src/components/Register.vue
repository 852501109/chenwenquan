<template>
  <div style="">
    <div class="register contaner">

      <div class="divContent">




            <div class="country-section" style="top:26px;left:20px;">+86</div>
            <input placeholder="请输入新手机号" type="tel" @keyup = "lastVoid"   v-model.number="cellPhone"  class="inpIphone " :maxlength=11 />
            <div class="tipmsg" style="top: 65px;margin-left: 10px;">{{tipmsg}}</div>


        <!-- <el-input
          placeholder="请输入手机号"
          v-model="cellPhone"
          class="inpIphone"
          autofocus
          clearable=true>
        </el-input> -->
        <!-- <input ref="inpFocus" type="number" class="inpIphone" v-model="cellPhone"> -->

      </div>
      <span class="spaNext"  :class="{isVoidActive:!isVoidActive}" style="background:#10cb7e;"  @click="spaNexts()">下一步</span>
      <div class="divFooter">
        <input type="checkbox" v-model="isChecked" />
        阅读并同意"
        <span style="text-decoration:none;">
            <router-link to="/useClause"><span style="color:#10cb7e;text-decoration:none;">使用条款</span></router-link>和
            <router-link to="/privacyPolicy"><span style="color:#10cb7e;text-decoration:none;">隐私政策</span></router-link>
        </span>
      </div>


      <div class="divAlerts" v-show="divSearch">
        <p>验证手机号后就可以成功注册了哦~</p>
        <p>
          <span style="color:#6ad6af;" @click="divSearch=false">继续注册</span>
          <span @click="history1">返回</span>
        </p>
      </div>
    </div>
    <public-js ref="publicjs"></public-js>
  </div>
</template>

<script>
import publicJs from "@/components/PublicJs";
import { setFlagsFromString } from "v8";
export default {
    name: "Register",
    components: {
        publicJs
    },
    data() {
        var validateCellphone = (rule, value, callback) => {
         
            // if (value === "") {
            //     this.tips().warning("请输入手机号");
            //     return;
            // } else if (value != "") {
            //     var val = String(value);
            //     if (!Number.isInteger(value)) {
            //         this.tips().warning("手机号格式错误");
            //         return;
            //     } else if (val.length != 11) {
            //         this.tips().warning("手机号格式错误");
            //         return;
            //     } else {
            //         // this.$refs.ruleForm2.validateField('cellPhone');
            //         callback();
            //     }
            // }
        };

        return {
            tipmsg:'',
            isChecked:true,
            isVoidActive:false,
            divSearch: false,
            cellPhone: ""
        };
    },
    mounted() {},
    methods: {
        history1() {
            this.$router.push({ path: "/" });
        },
        voidAll(){
            this.idenfyCellphone(this.cellPhone,this)
        },
        lastVoid(){
            let myreg = /^[0-9]{11}$/;
            if ((this.cellPhone + "").length === 11) {
                if( myreg.test(this.cellPhone)){
                    this.isVoidActive = true
                    this.tipmsg = ""
                }else{
                    this.tipmsg = "当前手机号不正确，请重试"
                }
            }else{
                this.isVoidActive = false
                this.tipmsg = ""
            }
        },
        spaNexts() {
            const _slf = this
            if(!this.isVoidActive){
                return
            }
            if(!this.isChecked){
                this.tips().warning("请阅读相关条款");
                return;
            }
            var url = this.$refs.publicjs.server_customer_url + "/customerUnite/existCustomerUnite";
            var params = {
                cellPhone: this.cellPhone
            };
            this.$refs.publicjs.get(url, params, function(data) {
                if (data.returnStatus == 1) {
                    _slf.$router.push({
                        path: "/message",
                        query: params
                    });
                } else {
                    this.tips().warning(data.returnMsg);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.middle {
    text-align: center;
}
.register {
    position: relative;
    height: 100vh;
    overflow: hidden;
    padding-left: 1rem;
}
.spaClose {
    font-size: 2rem;
    color: #ffffff;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.divContent {
    height: 75%;
}
.divContent > p:first-child {
    margin: 1rem 0;
    font-size: 1rem;
    color: #fff;
    font-weight: lighter;
    padding-left: 1rem;
}
.inpIphone {
    border: none;
    outline: none;
    height: 38px;
    width: 95%;
    margin-top: 20px;
    font-size: 0.8rem;
    border-radius: 9px;
    padding-left: 43px;
}
.spa_ip {
    display: inline-block;
    border: 0.08rem solid #ffffff;
    padding: 0.2rem;
    color: #ffffff;
    border-radius: 0.3rem;
}
.divFooter {
    position: absolute;
    top: 165px;
    left: 13%;
    width: 90%;
    height: 10%;
}
.pXiah {
    margin-top: 3rem;
    border-bottom: 2px solid #ffffff;
    padding-bottom: 0.2rem;
}
.divAlerts {
    position: absolute;
    top: 35%;
    max-width: 30%;
    min-width: 250px;
    height: 6rem;
    background: #ffffff;
    border-radius: 0.4rem;
    margin-left: 14%;
}
.divAlerts > p {
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 0.8rem;
}
.divAlerts > p:first-child {
    border-bottom: 0.07rem solid #cccccc;
}
.divAlerts > p:first-child + p > span {
    display: inline-block;
    width: 50%;
}
.divAlerts > p:first-child + p > span:first-child {
    border-right: 0.07rem solid #cccccc;
    width: 49%;
}
.spaNext {
    position: absolute;
    top: 95px;
    display: inline-block;
    margin-top: -4px;
    background: #ababab;
    text-align: center;
    width: 88%;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    border-radius: 6px;
    float: right;
}
.el-form-item__label {
    width: 50px;
    position: absolute;
    z-index: 2;
    top: 19px;
    left: 23px;
}
.el-input__inner {
    padding-left: 40px;
}
</style>
