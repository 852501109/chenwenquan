<template>
    <div class="sucessMsg">
        <h2>您已成功注册弘道智慧公众平台</h2>
        <div @click="hrefindex">返回首页</div>
    </div>
</template>
<script>
export default {
    name: "Registersucess",
    data() {
        return {};
    },
    mounted: function() {},
    methods: {
        hrefindex() {
            this.$router.push({ path: "/main" });
        }
    }
};
</script>
<style lang="scss" scoped>
.sucessMsg {
    color: green;
    div {
        width: 100px;
        height: 34px;
        border: 1px solid green;
        margin: 0px auto;
        cursor: pointer;
    }
}
</style>

