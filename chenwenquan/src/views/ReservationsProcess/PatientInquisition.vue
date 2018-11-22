
<template>
    <div class="container">
        <div class="center"> 
            <div class="time">{{timestampToTime}}</div>
            <div class="chatList" v-for="(item,index) in chatContents" :key="index">
                <div v-if="item.type === 'admin'"    class="admin-type">
                    <img width="40" :src="picture"/>
                    <div class="word-board"><i class="el-icon-caret-left"></i>{{item.content}}</div>
                </div>
                <div v-else class="patient-type">
                    <img width="40"  :src="picture"/>
                    <div class="word-board"><i class="el-icon-caret-right"></i>{{item.body}}</div>
                </div>
            </div> 
            <div class="bottom"> 
                <input placeholder="" v-model="textareaContent" @keyup="sendMessage" name="content" />
            </div> 
        </div> 
    </div>
</template>
<script>
import {insertCustomerConsultationSub ,getConsultationWhereHasChat} from "@/api/ReservationsProcess"
import {timestampToTime} from "@/utils/publicMethods"
import {mapState} from 'vuex';
export default {
    name:"Recommend",
    computed:{
        ...mapState({
            customerId:function(state){
                if(state.userInfo.customerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.customerId
            },
            consultationId:function(state){
                if(state.userInfo.consultationId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.consultationId
            },
            receiveCustomerId:function(state){
                if(state.userInfo.receiveCustomerId === ''){
                    this.$store.dispatch('refresh_all')
                }
                return state.userInfo.receiveCustomerId
            },
        }),
    },
    data(){
        return {
            timestampToTime:timestampToTime(),
            picture:require('@/assets/image/name1.jpg'),
            count:0,
            name:'孟非',
            doctornum:'20',
            textareaContent:'',
            picture:require('@/assets/image/name1.jpg'),
            chatContents:[
                {name:'张三医生',content:'中医咨询','time':timestampToTime(),type:'admin'},
            ],
        }
    },
    mounted(){
        this.getChatList()
        console.log(this.consultationId)
        this.$store.state.title.msg = this.chatContents[0].name
    },
    methods:{
        getChatList(){
            getConsultationWhereHasChat(this.consultationId).then( res=>{
                const data = res.data.returnDataList.data
                if(res.data.returnCode === 1){
                    data.forEach(element => {
                        this.chatContents.push(element)
                    });
                }else{
                    this.tips().warning(res.data.returnMsg)
                }
            })
        },
        sendMessage(event){
            var self = this
            if(event.keyCode === 13){
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
                insertCustomerConsultationSub(3,this.customerId,this.receiveCustomerId,4,1,content,this.consultationId,1).then( res =>{
                    if(res.data.returnCode === 1){
                       this.chatContents.push({name:'',body:content,'time':timestampToTime(),type:'patient'})
                    }else{
                        this.tips().warning(res.data.returnMsg)
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
    }
    .bottom{
        bottom: 80px !important;
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
    .container{
        height: 700px;
        overflow: hidden;
    }
    .bottom{
        position: fixed;
        bottom: 7px;
        width: 100%;
        input{
            display: block;
            width: 93%;
            margin: 0px auto;
            height: 38px;
            border: 0px;
            padding: 16px;
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