<template>
    <div class="container">
        <div class="center"> 
             <div class="time">{{timestampToTime}}</div>
            <div class="chatList" v-for="(item,index) in chatContents" :key="index">
                <div v-if="item.type === 'admin'"    class="admin-type">
                    <img width="40" :src="picture"/>
                    <div class="word-board"><i class="el-icon-caret-left"></i>{{item.content}}</div>
                </div>
                <div v-if="item.type === 'patient'" class="patient-type">
                    <img width="40"  :src="picture"/>
                    <div class="word-board"><i class="el-icon-caret-right"></i>{{item.content}}</div>
                </div>
            </div> 
            <div class="bottom"> 
                <textarea 
                    placeholder="    问题描述需至少10个字，请详细描述后提交" 
                    v-model="textareaContent" @keyup="sendMessage"
                    name="content" 
                >
                </textarea> 
            </div> 
        </div> 
    </div>
</template>
<script>
import {insertFirstConsultation ,getConsultationCache} from "@/api/ReservationsProcess"
import {timestampToTime} from "@/utils/publicMethods"
import {mapState} from 'vuex';
export default {
    name:"Recommend",
    data(){
        return {
            timestampToTime:timestampToTime(),
            consultationData:{},
            picture:require('@/assets/image/name1.jpg'),
            count:0,
            name:'孟非',
            doctornum:'20',
            textareaContent:'',
            picture:require('@/assets/image/name1.jpg'),
            chatContents:[
                {
                    name:'张三',
                    content:'您好，我是您的导诊医生，我将根据您的描述为您安排合适的医生。请问您需要咨询什么问题？',
                    time:timestampToTime(),
                    type:'admin'
                },
            ],
        }
    },
    computed:{
        ...mapState({
            customerId:function(state){
                if(state.userInfo.customerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.customerId
            }
        }),
    },
    mounted(){
        this.getConsultation()
    },
    methods:{
        getConsultation(){
            getConsultationCache(this.customerId).then( res=>{
                    if(res.data.returnCode === 1){
                        sessionStorage.setItem('consultationId',res.data.returnDataList.consultationId)
                        sessionStorage.setItem('consultationSubId',res.data.returnDataList.consultationSubId)
                        this.consultationData = res.data.returnDataList
                        this.textareaContent = res.data.returnDataList.body
                    }else{
                        this.tips().warning(res.data.returnMsg)
                    }
            })
        },
        sendMessage(event){
            var self = this
            if(this.textareaContent.replace(/\s+/g,"").length>500){
                 this.textareaContent = this.textareaContent.replace(/\s+/g,"").substr(0,500)
            }
            if(event.keyCode === 13){
                //通过调用randomName()函数来得到一个随机的名字 
                //判断输入内容是否为空 
                if (this.textareaContent.replace(/\s+/g,"") === "") { 
                    //this.$message('输入内容不能为空')
                    this.tips().warning('输入内容不能为空',3000)
                    return; 
                }else if(this.textareaContent.replace(/\s+/g,"").length<10){
                    this.tips().warning('病情描述不能小于十个字',3000)
                    return;
                    
                }
                //通过正则表达式来获取要替换的字符串 
                const regExp = /敏感词1|敏感词2|敏感词3|敏感词4/g; 
                const regExp1 = /开心/g; 
                const regExp2 = /尴尬/g; 
                //var imgReplace = this.textareaContent.replace(regExp,"高兴"); 
                //获取开心图片路径 
                //var path1 = '<img src="img/chui.png"/>'; 
                //获取尴尬图片的路径 
                //var path2 = '<img src="img/mouse.png"/>'; 
                //敏感字替换； 
                var content = this.textareaContent.replace(regExp,"***"); 
                //将开心替换成开心图片的字符串； 
                //   txtReplace(content); 
                //var imgReplace = content.replace(regExp1,path1); 
                //   alert(imgReplace); 
                //将尴尬替换成尴尬图片的字符串； 
                //var imgReplace = imgReplace.replace(regExp2,path2); 
                //   alert(imgReplace); 
                const data = {
                    name: this.name,
                    content: content,
                    time: timestampToTime(),
                    type: 'patient'

                }
                insertFirstConsultation(this.customerId,4 ,1 ,content).then( res =>{
                    if(res.data.returnCode === 1){
                        sessionStorage.setItem('consultationId',res.data.returnDataList.consultationId)
                        sessionStorage.setItem('consultationSubId',res.data.returnDataList.consultationSubId)
                        this.chatContents.push(data)
                        setTimeout( ()=>{
                            self.$router.push({path:'/recommend'})
                        },2000)
                    }else{
                        this.tips().warning(res.data.returnMsg)
                        return;
                    }
                })
                
                this.textareaContent = ""; 
                this.count++; 
               
            }
        }
    }

}
</script>
<style lang="scss" scope>
    .person-List{
        min-height: 100px;
        border-bottom:2px solid rgb(196, 196, 196);
    }
    .tip-msg{
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: rgb(73, 73, 73);
        color: #fff;
    }
    .person-msg{
        width: 100%;
        span:first-child{
            margin-left: 20px;
        }
    }
    .person-content{
        width:87%;
    }
    .tips-item{
        display: inline-block;
        min-width:50px;
        border:1px solid #666;
        border-radius:4px;
        margin-left: 10px;
    }
    .bottom{
        position: fixed;
        bottom: 73px;
        width: 100%;
        textarea{
            display: block;
            width: 100%;
            min-height: 136px;
            border: 0px;
            padding: 10px;
        }
    }
    .center{
        height: 500px;
        overflow: auto;
    }
    .chatList{
        position: relative;
        min-height: 100px;
        top: 40px;
        .patient-type{
            clear: both;
            img,.word-board{
                float: right;
            }
            .word-board{
                top: 0px;
                left: -11px;
            }
        }
        .word-board{
                position: relative;
                left: 50px;
                top: -40px;
                padding: 20px;
                width: 60%;
                min-height: 70px; 
                background: #fff;
                font-size: 12px;
                border-radius: 2px;
                i.el-icon-caret-left{
                    position: absolute;
                    color: #fff;
                    left: -8px;
                    top: 10px;
                }
                i.el-icon-caret-right{
                    position: absolute;
                    color: #fff;
                    right: -8px;
                    top: 10px;
                }
            }
    }
  
</style>