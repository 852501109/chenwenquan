<template>
    <div>
        <div >根据您的描述，为您精准匹配{{data.length}}位医生</div>
        <div class="list" >
            <div class="most"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Recommend",
    data() {
        return {
            data: [
                {
                    most:'最对症',
                    name: "哮喘主治医师",
                    city: "北京",
                    year: "5",
                    case: "1886",
                    beGoodAt:"擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病",
                    type:['夜间哮喘','只哮不喘','夜间哮喘','只哮不喘']
                },
                {
                    most:'距离最近',
                    name: "哮喘主治医师",
                    city: "北京",
                    year: "5",
                    case: "1886",
                    beGoodAt:"擅长：擅长呼吸系统疾病擅呼吸系统疾病擅长呼吸系统疾病擅呼吸系统疾病",
                    type:['夜间哮喘','只哮不喘','夜间哮喘','只哮不喘']
                }
            ]
        };
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.list{
    .most{
        position: absolute;
        top: -15px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 8px;
        background: #cf7d7d;
    }
    position: relative;
    width: 100%;
    min-height: 240px;
    background: #fceaea;
}
</style>


