<template>
    <div v-if="false"><span v-for="(item,index) in type">&nbsp;{{index+1}}&nbsp;{{item.name}}<span v-if="item.name!='公众号信息'"></span>&nbsp;</span></div>
</template>
<script>
export default {
    data(){
        return {
            type:[
                {name:"基本信息",state:1},
                {name:"选择类型",state:0},
                {name:"信息登记",state:0},
                {name:"公众号信息",state:0},
            ]
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


