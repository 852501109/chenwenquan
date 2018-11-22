<template>
    <div class="container">
        <div class="center">
            <div class="chatInit">
                <div class="admin-type">
                    <img width="40" :src="picture" />
                    <div class="word-board">
                        <i class="el-icon-caret-left"></i>
                        <span>
                            您好,我是导诊医生,我将针对您的病情安排最适合您的哮喘医生，
                            <span style="color:#10cb7e;">病情描述越详细，匹配医生越精准</span>，请填写以下内容
                        </span>
                    </div>
                </div>
            </div>
            <div class="collection-baseinfo">
                <div class="location">
                    <router-link to="mapSearch">
                        <i class="icon iconfont">&#xe61e;</i>{{detailPosition}}</router-link>
                    <div class="get-position" @click="getDetailPostion">重新定位</div>
                </div>
                <div v-if="isFirst">
                    <mt-field label="患者姓名" placeholder="请输入" v-model="username"></mt-field>
                    <mt-cell title="出生日期：" is-link>
                        <div>
                            <span class="select-date" @click="selectDate">{{showTime}}</span>
                        </div>
                    </mt-cell>
                    <mt-datetime-picker v-model="pickerVisible" :startDate="startDate" :endDate="endDate" ref="picker" type="date" @confirm="confirmDate">
                    </mt-datetime-picker>
                    <mt-cell title="患者性别" is-link>
                        <div class="radiu">
                            <span :class="{radiuActive:radiuType === '1'}" @click="changeSex('1')"></span>&nbsp;男 &nbsp;&nbsp;&nbsp;&nbsp;
                            <span :class="{radiuActive:radiuType === '2'}" @click="changeSex('2')"></span>&nbsp;女
                        </div>
                    </mt-cell>
                </div>
                <div v-else class="wrapper" ref="docwrapper" style="height: 128px;">
                    <ul class="wrap" style="500px">
                        <li class="history-list" v-for="(item,index) in firstData" :key="index" @click="more(index)">
                            {{item.patientName+"&nbsp;&nbsp;&nbsp;"+item.sex+"&nbsp;&nbsp;&nbsp;"}} {{item.birthDay?item.birthDay:""}}岁
                                <span v-if="userInfo.length >1">
                                    <i v-if=" index===0 && firstData.length === 1" class="icon iconfont">&#xe61f;</i>
                                    <i v-if=" index===0 && firstData.length > 1" class="icon iconfont">&#xe6c8;</i>
                                </span>
                        </li>
                    </ul>
                </div>
                <div class="create-Visitor" v-if="firstData.length !== 0" @click="changeInit">新建就诊人</div>
                <div class="bottom">
                    <textarea placeholder="请输入详细病情描述，如哮喘类型，一天内发作时间，频次，辅助检查结果，发病时长，用药情况等，至少30字" v-model="textareaContent" name="content">
                    </textarea>
                </div>
            </div>
            <div class="submit" @click="toMath">提交</div>
        </div>
    </div>
</template>
<script>
import { timestampToTime } from "@/utils/publicMethods";
import {
    insertReservation,
    getCustomerPatient
} from "@/api/ReservationsProcess";
import BScroll from "better-scroll";
import { mapState } from "vuex";
export default {
    name: "DescriptionDisease",
    computed: {
        ...mapState({
            customerId: function(state) {
                if (state.userInfo.customerId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.customerId;
            },
            consultationId: function(state) {
                if (state.userInfo.consultationId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.consultationId;
            },
            consultationSubId: function(state) {
                if (state.userInfo.consultationSubId === "") {
                    this.$store.dispatch("refresh_all");
                }
                return state.userInfo.consultationSubId;
            },
            patientId: function(state) {
                this.$store.dispatch("refresh_all");
                return state.userInfo.patientId;
            },
            detailPosition: function(state) {
                if (state.mapInfo.detailPosition === "") {
                    
                    this.$store.dispatch("refresh_position");
                }
                return state.mapInfo.detailPosition;
            }
        })
    },
    data() {
        return {
            showTime: "请选择",
            availHeight: window.screen.availHeight,
            firstData: [],
            userInfo: [],
            startDate: new Date("1900-1-1"),
            endDate: new Date(),
            patientFlag: 1,
            radiuType: "1",
            isFirst: false,
            pickerVisible: new Date("1970-01-01"),
            username: "",
            sexValue: "",
            textareaContent: "",
            picture: require("@/assets/image/name1.jpg"),
            location: "中国技术交易大厦"
        };
    },
    mounted() {
        this.getDetailPostion()
        this.getCustomerPatientList();
        this.resizeHeight();
    },
    methods: {
        resizeHeight() {
            var self = this;
            this.addHandler(
                window,
                "orientationchange",
                function() {
                    self.availHeight = window.screen.availHeight;
                },
                false
            );
        },
        confirmDate() {
            this.showTime = timestampToTime(this.pickerVisible);
        },
        toMath() {
            this.$store.dispatch("refresh_all");
            if (this.isFirst) {
                if (!this.username) {
                    this.tips().warning("患者姓名不能为空");
                    return
                }else if (this.showTime === "请选择") {
                    this.tips().warning("请选择出生日期");
                    return
                }
            } 
            if (this.textareaContent.length < 30) {
                    this.tips().warning("请输入大于30字的描述");
                    return
            }
            if (this.firstData.length === 0) {
                insertReservation(this.customerId,this.textareaContent,this.patientFlag,this.username,this.steadTime(this.showTime),this.radiuType === "1" ? "男" : "女","","","",1,"","","").then(res => {
                    if (res.data.returnCode === 1) {
                        sessionStorage.setItem("reservationId",res.data.returnDataList.reservationId);
                        sessionStorage.setItem("patientId",res.data.returnDataList.patientId);
                        sessionStorage.setItem("userName", this.username);
                        sessionStorage.setItem("sex", this.radiuType === "1"?"男":"女");
                        sessionStorage.setItem("birthDay", this.steadTime(this.showTime));
                        this.$router.push({ path: "/mathDoctor" });
                    }
                });
            } else {
                const data = this.firstData[0];
                insertReservation(this.customerId,this.textareaContent,2,data.createByName,data.createTime,data.sex,"","",data.patientId,1,"","","").then(res => {
                    if (res.data.returnCode === 1) {
                        sessionStorage.setItem("patientId", data.patientId);
                        sessionStorage.setItem("reservationId", res.data.returnDataList.reservationId );
                        this.$router.push({ path: "/mathDoctor" });
                    }
                });
            }
        },
        getCustomerPatientList() {
            getCustomerPatient(this.customerId).then(res => {
                if (res.data.returnCode === 1) {
                    if(res.data.returnDataList.count !== 0){
                        sessionStorage.setItem("userName",res.data.returnDataList.data[0].patientName)
                        sessionStorage.setItem("sex",res.data.returnDataList.data[0].sex)
                        sessionStorage.setItem("birthDay",res.data.returnDataList.data[0].birthDay)
                    }else{
                        this.isFirst = true;
                        return;
                    }
                    this.firstData.push(res.data.returnDataList.data[0]);
                    this.userInfo = res.data.returnDataList.data;
                    this.docscroll = new BScroll(this.$refs.docwrapper, {
                        click: true
                    });
                }
            });
        },
        changeInit() {
            this.isFirst = true;
            this.firstData = [];
        },
        more(i) {
            event.stopPropagation();
            const self = this;
            if (self.firstData.length > 1) {
                [self.userInfo[i], self.userInfo[0]] = [
                    self.userInfo[0],
                    self.userInfo[i]
                ];
                self.firstData.splice(
                    0,
                    self.firstData.length,
                    self.userInfo[0]
                );
            } else {
                self.userInfo.forEach(function(item, index) {
                    if (index != 0) {
                        self.firstData.push(item);
                    }
                });
            }
        },
        changeSex(type) {
            this.radiuType = type;
        },
        selectDate() {
            this.$refs.picker.open();
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    a {
        color: #fff;
    }
    .history-list,
    .create-Visitor {
        width: 90%;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #eee;
        i {
            float: right;
            font-size: 1.5rem;
        }
    }
    .create-Visitor {
        text-align: center;
        color: #10cb7e;
    }
    .select-date {
        position: relative;
        z-index: 1;
    }
    .radiu span {
        position: relative;
        z-index: 1;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #d0dad5;
        background: #bbf0da;
        border-radius: 3px;
        vertical-align: top;
    }
    .radiu span.radiuActive {
        background: #10cb7e;
    }
    .submit {
        position: relative;
        left: 6%;
        bottom: 0px;
        padding: 10px;
        width: 88%;
        font-weight: 520;
        text-align: center;
        min-height: 39px;
        line-height: 20px;
        background: #6f6f6f;
        color: #fff;
        border-radius: 4px;
    }
    color: #fff;
    .location {
        position: relative;
        padding-left: 8px;
        height: 35px;
        line-height: 35px;
        border-bottom: 3px solid #eee;
        color: #333333;
        font-size: 0.8rem;
        a {
            color: #333333;
            i {
                color: #10cb7e;
                margin-right: 10px;
            }
        }
        .get-position {
            position: absolute;
            display: inline-block;
            color: #10cb7e;
            right: 21px;
        }
    }
    .center {
        min-height: 620px;
        overflow: auto;
    }
    .bottom {
        position: relative;
        width: 100%;
        top: 20px;
        textarea {
            display: block;
            width: 100%;
            min-height: 136px;
            border: 0px;
            padding: 10px;
            font-size: 0.7rem;
            letter-spacing: 3px;
        }
    }
    .chatInit {
        position: relative;
        min-height: 100px;
        top: 40px;
        padding: 10px;
        .word-board {
            position: relative;
            left: 50px;
            top: -40px;
            padding: 10px;
            width: 71%;
            font-weight: bold;
            min-height: 70px;
            line-height: 20px;
            background: #fff;
            font-size: 0.8rem;
            border-radius: 2px;
            span {
                letter-spacing: 2px;
                color: #333333;
            }
            i.el-icon-caret-left {
                position: absolute;
                color: #fff;
                left: -8px;
                top: 10px;
            }
            i.el-icon-caret-right {
                position: absolute;
                color: #fff;
                right: -8px;
                top: 10px;
            }
        }
    }
    .collection-baseinfo {
        position: relative;
        width: 88%;
        top: 30px;
        min-height: 360px;
        margin: 0px auto;
        border-radius: 3px;
        background: #fff;
        color: #333333;
        font-size: 0.8rem;
        .collection-content {
            position: relative;
            top: 20px;
            width: 80%;
            margin: 0px auto;
            text-align: left;

            input {
                border: 0px;
            }
        }
    }
}
</style>


