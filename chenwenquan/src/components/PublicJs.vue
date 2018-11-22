<template>
  <div></div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
    name: "publicJs",
    data() {
        return {
            server_customer_url: "http://192.168.199.112:8080"
            // server_customer_url:"http://localhost:8080"
        };
    },
    methods: {
        post(url, params, func) {
            params = qs.stringify(params, { indices: false });
            axios
                .post(url, params)
                .then(resp => {
                    if (func && typeof func == "function") {
                        func(resp.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        get(url, params, func) {
            axios
                .get(url, {
                    params: params
                })
                .then(resp => {
                    if (func && typeof func == "function") {
                        func(resp.data);
                    }
                })
        },
        msgW(msg) {
            this.$notify({
                title: "信息",
                message: msg
            });
        },
        validCellphone(cellPhone) {
            var value = Number(cellPhone);
            if (value === "") {
                this.tips().warning('手机号不能为空')
                return false;
            } else if (value != "") {
                var val = String(value);
                if (!Number.isInteger(value)) {
                this.tips().warning('手机号必须为11位')
                    return false;
                } else if (val.length != 11) {
                this.tips().warning('手机号必须为11位')
                    return false;
                } else {
                }
            }
            return true;
        },
        validCoce(sendMterrcode) {
            var value = Number(sendMterrcode);
            if (value === "") {
                this.msgW("验证码不能为空");
                return false;
            } else if (value != "") {
                var val = String(value);
                if (!Number.isInteger(value)) {
                    this.msgW("验证码为4为数字");

                    return false;
                } else if (val.length != 4) {
                    this.msgW("验证码为4为数字");
                    return false;
                } else {
                }
            }
            return true;
        },
        validPwd(pwd) {
            var value = pwd;
            if (value === "") {
                this.msgW("密码不能为空");
                return false;
            } else if (value.length > 20) {
                this.msgW("密码由20位以内的字母、数字、字符组成");
                return false;
            }
            return true;
        }
    }
};
</script>

