<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu v-for="(item,index) in navList[0]" :key="index" :index="index+''"   v-if="item.childMap">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.oneTree.systemName}}</span>
                </template>
                <el-submenu  v-for="(itemchild,indexchild) in item.childMap" :key="indexchild" :index="index +'-'+ indexchild" v-if="itemchild.childMap">
                    <span slot="title">{{itemchild.twoTree.menuName}}</span>
                    <el-menu-item @click="routerHref(itemLast)" :index="index +'-'+ indexchild + '-' + indexLast" v-for="(itemLast,indexLast) in itemchild.childMap" :key="indexLast">{{itemLast.threeTree.menuName}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-for="(itemchild,indexchild) in item.childMap" :key="indexchild" :index="index +'-'+ indexchild" v-if="!itemchild.childMap">
                   <i class="el-icon-menu"></i>
                  <span slot="title">{{itemchild.twoTree.menuName}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item  v-for="(item,index) in navList.data" @click="routerHref(item)" :key="index" :index="index+''"  v-if="!item.childMap">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.oneTree.systemName}}</span>
            </el-menu-item>
            <!-- <el-menu-item @click="routerHref('shenhe')" :key="index" :index="6">
                <i class="el-icon-menu"></i>
                <span slot="title">机构审核</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
export default {
    name:'getNav',
    data(){
        return {
            navList: [],
            isCollapse: true
        }
    },
    created() {
       this.getNavBar()
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        },
        routerHref(item){
            console.log(item)
            this.$router.push({path:item.threeTree.moduleUrl})
        },
        getNavBar(){
        this.$jsonp(`http://192.168.199.109:18080/services/tb/web/sys/resource/system/v2/getMapList?roleId=1`,
        {
        　　callbackQuery: 'callbackParam', // jsonp key //请求传递参数 1
        　　callbackName: 'jsonpCallback', // jsonp key //请求传递参数 2
        　　type: 6 //请求传递参数 4
        } 
        
        ).then(json => {
            this.navList.push(json.responseData.data)
        }).catch(err => {
        　　console.log(err)
        })
      },
    }
}
</script>
<style lang="scss" scoped>

</style>

