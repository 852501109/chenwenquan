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
                <h1>注册</h1>
            </el-col>
            <el-col :span="24">
                <div class="container">
                    <h5>请选择注册的账号类型</h5>
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
                    code: "1",
                    title: "平台类型",
                    msg: ""
                },
                {
                    code: "2",
                    title: "医疗机构",
                    msg: ""
                }
            ]
        };
    },
    methods: {
        typeSelect(code) {
            this.$router.push({
                path: "/baseStep",
                query: { rigisterType: code }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 95%;
    margin: 0px auto;
    min-height: 700px;
    background: #fff;
    padding: 20px;
}
.type_box {
    width: 50%;
    min-height: 300px;
    margin: 0px auto;
    div {
        cursor: pointer;
        float: left;
        width: 46%;
        border: 1px solid rgb(138, 137, 137);
        min-height: 200px;
    }
    div:hover {
        background: #eee;
    }
    p {
        color: #555;
    }
}
</style>