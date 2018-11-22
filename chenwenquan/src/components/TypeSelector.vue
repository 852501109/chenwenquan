<template>
    <div>
        <div style="padding-left: 20px;" class="ts-title" >
            <span 
                @click="changeType(index)" 
                :key="index"
                v-for="(item,index) in title"
                :class="[{right:index === 3}]"
            >
                {{item.name}}
                <i :class="item.icon"></i>
            </span>

        </div>
        <div class="ts-content" v-if="type === 0">
            <div  
                @click="typeSelect(index)"
                :key="index"
                v-for="(item,index) in caseType"
                :class="[{caseType:active === index}]"
            >
                <span>{{item.name}}</span>
                <i :class="item.icon"></i>
            </div>
        </div>
        <div class="ts-content" v-if="type === 2">
            <div  
                @click="typeSelect(index)"
                :key="index"
                v-for="(item,index) in sort"
                :class="[{caseType:active === index}]"
            >
                <span>{{item.name}}</span>
                <i :class="item.icon"></i>
            </div>
        </div>
        <transition name="fade">
            <div class="ts-content" v-if="type === 3" >
                <div 
                    v-for="(item,index) in doctorFileter"
                    :key="index"
                    class="label" 
                >
                    <h3>{{item.name}}</h3>
                    <span 
                        v-for="(items,i) in item.label" 
                        :class="[{selected:item.active === i}]"
                        :key="i"
                        @click="labelSelect(index,i)"
                    >
                        {{items}}
                    </span>
                </div>
                <div class="btngroup"><span>重置</span><span>确定</span></div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:'TypeSelector',
    data(){
        return{
            active:'',
            type:-1,
            title:[
                {name:'哮喘',icon:'el-icon-arrow-down'},
                {name:'全国',icon:'el-icon-arrow-down'},
                {name:'推荐排序',icon:'el-icon-arrow-down'},
                {name:'筛选',icon:'el-icon-news'},
            ],
            caseType:[
                {name:'全部病种',icon:'el-icon-check',cssStyle:'caseType'},
                {name:'哮喘',icon:'el-icon-check',cssStyle:'caseType'},
                {name:'外感',icon:'el-icon-check',cssStyle:'caseType'},
            ],
            sort:[
                {name:'推荐排序',icon:'el-icon-check',cssStyle:'caseType',},
                {name:'按距离排序',icon:'el-icon-check',cssStyle:'caseType'},
                {name:'按价格高到低',icon:'el-icon-check',cssStyle:'caseType'},
                {name:'按价格低到高',icon:'el-icon-check',cssStyle:'caseType'},
            ],
            doctorFileter:[
                {
                    name:'从医时间',
                    active:-1,
                    label:['1-5年','5-10年','10年以上']
                },
                {
                    name:'医生职级',
                    active:-1,
                    label:['主任医师','副主任医师','专家']
                },
                {
                    name:'医院等级',
                    active:-1,
                    label:['三甲']
                },
                {
                    name:'价格区间',
                    active:-1,
                    label:['0-100','100-200','300-400','400以上']
                },
                {
                    name:'诊疗案例数',
                    active:-1,
                    label:['1-100例','100-200例','200-300例','更多']
                },

            ]
        }
    },
    mounted(){

    },
    methods:{
        changeType(index){
            this.type = this.type === index?this.type = -1: index
        },
        typeSelect(index){
            this.active = index 
        },
        labelSelect(index,i){
            this.doctorFileter[index].active = i
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
    .selected{
        background:#eee;
    }
    .btngroup{
        width: 100%;
        height: 30px;
        line-height: 30px;
        span{
            display: inline-block;
            width: 50%;
            text-align: center;
        }
    }
    padding: 0px;
    .ts-title{
        position: relative;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #fff;
        border-bottom:2px solid #eee;
        span{
            display: inline-block;
            width: 24%;
        }
        .right{
            text-align: right;
        }
    }
    .ts-content{
        position: absolute;
        z-index: 1;
        width: 100%;
        background: #fff;
        .label span{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
            min-width: 50px;
            font-size: 0.8rem;
            border:1px solid #555;
            border-radius:5px;
            margin:3px;
        }
        div{
            width: 100%;
            min-height: 30px;
            line-height: 30px;
            border:1px solid #eee;
            i{
                float: right;
                margin: 5px 18px;
                display: none;
            }
        }
        div.caseType{
            color: #10cb7e;
            i{
                display:inline-block;
            }
        }
    }
}
</style>


