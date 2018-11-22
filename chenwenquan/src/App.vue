<template>
  <div id="app" v-bind:style="{ height:availHeight+'px'}">
      <mt-header 
        :title="$store.state.title.msg" 
        v-if="$store.state.title.show">
        <div @click="goBack" slot="left"
            v-if="$store.state.title.back"
        >
            <mt-button icon="back"></mt-button>
        </div>
        <mt-button v-if="$store.state.title.close" @click="goBack"  slot="right">关闭</mt-button>
        </mt-header>
    <router-view/>
    <foot></foot>
  </div>
</template>
<script>
// 测试下看可不可以同步
//import 'babel-polyfill'
import {assemblyControl,backCallBack} from '@/utils/publicMethods'
import foot from "@/components/Footer";
export default {
  name: 'App',
  components:{
      foot
  },
  data(){
      return {
          availHeight:window.screen.availHeight,
          footChange:false
      }
  },
  created(){
      this.resizeHeight()
  },
  mounted(){
         assemblyControl(this)
  },
  watch:{
      '$route':'watchRoute'
  },
  methods:{
      watchRoute(){
          assemblyControl(this)
      },
      resizeHeight(){
            var self = this
            this.addHandler(window,"orientationchange", function(){
               self.availHeight = window.screen.availHeight
            }, false);
      },
      goBack(){
          backCallBack(this)
      }
  }
}
</script>

<style lang="scss" scope>
body{
   overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    background: #ececec;
}
*{
  margin:0;
  padding: 0;
}
.back{
    position: absolute;
    left:5px;
    top:15px;
}
.goback{
    position: absolute;
    right: 9px;
    top: 0px;
    a{
        color: #fff;
    }
}
.active{
        color:#10cb7e !important;
    }
    header{
        background: #10cb7e !important;
        .mint-header-title{
            font-size: 0.95rem;
        }
    }
    a{
        text-decoration: none;
        color: #504f4f;
    }
</style>
