<template>
    <div id="app" style="font-size: 14px;color: #292929;font-family: '微软雅黑'">
        <div class="mycity" @click="selectLocation()">
            <span id="qyxs" style="color:#000">
               <div id="allmap"></div> <i class="icon iconfont">&#xe61e;</i>{{location.substr(0,location.length-1)}}
            </span><i class="el-icon-arrow-down" style="position: absolute;top: 10px;"></i>
        </div>
        <div v-show="isShowCitys" class="city">
            <div style="text-align: center;position: fixed;top: 0;height: 32px;width:100%;line-height: 32px;z-index: 300;background-color: #FFF;box-shadow: 0 0 2px rgba(0,0,0,.2)
              ">
                <span id="qyxs" style="color:#81b169">{{location}}</span>
            </div>
            <div class="city-wrapper city-wrapper-hook">
                <div class="scroller-hook">
                    <div class="cities cities-hook">
                        <div v-for="(i,index) in cityData" :key="index">
                            <div class="title">{{i.name}}</div>
                            <ul>
                                <li v-for="(item,nums) in i.cities" :key="nums" class="item city-click" :data-name="item.name" :data-id="item.code">
                                    <span class="border-1px name" @touchend="touchUp(item)" @touchstart="chooseCity()">{{item.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="shortcut shortcut-hook" style="right: 50px;top:100px !important;" @touchstart="touchIndex">
                    <ul style="width: 100px;text-align: left;padding: 20px 0">
                        <li v-for="(i,index) in cityData" :key="index" :data-anchor="i.name" class="item">{{i.name.substr(0, 1)}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="toast" v-show="toastShow">
            {{toastText}}
        </div>
    </div>
</template>
<script>
import { cityData } from "@/assets/js/city";
import BScroll from "better-scroll";
export default {
    mounted: function() {
        this.cityData = cityData();
        this.initBaiduMap();
        this.initCities();
    },
    data() {
        return {
            origin: "http://192.168.99.205:800",
            captchaBoxShow: false,
            test: "测试",
            countTime: 0,
            countTimer: null,
            time: 60,
            location: "定位中",
            submit: {
                sms_captcha: "",
                captcha: "",
                area_code: "",
                _token: ""
            },
            cityWrapper: document.querySelector(".city-wrapper-hook"),
            cityScroller: document.querySelector(".scroller-hook"),
            cities: document.querySelector(".cities-hook"),
            shortcut: document.querySelector(".shortcut-hook"),
            shortcutList: [],
            cityData: cityData, // 数据源
            scroll: null,
            touch: {},
            anchorMap: {},
            toastShow: false,
            isShowCitys: false,
            toastText: ""
        };
    },
    methods: {
        toast(str) {
            let v = this;
            v.toastText = str;
            v.toastShow = true;
            setTimeout(function() {
                v.toastShow = false;
            }, 1500);
        },
        initBaiduMap() {
            let map = new BMap.Map("allmap");
            let point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            let myCity = new BMap.LocalCity();
            myCity.get(this.myFun);
        },
        myFun(result) {
            let cityName = result.name;
            this.location = cityName
        },
        chooseCity(city) {
            let v = this;
            v.countTime = 0;
            v.countTimer = setInterval(function(e) {
                v.countTime++;
            }, 1);
        },
        touchUp(item) {
            let v = this;
            clearInterval(v.countTimer);
            if (v.countTime < 30) {
                this.isShowCitys = false;
                this.location = item.name;
                this.submit.area_code = item.code;
            }
        },
        selectLocation() {
            let v = this;
            this.isShowCitys = true;
        },
        initCities: function() {
            let v = this;
            let y = 0;
            var titleHeight = 28;
            var itemHeight = 44;
            v.cityData.forEach(function(e) {
                let name = e.name.substr(0, 1);
                let len = e.cities.length;
                v.anchorMap[name] = y;
                y -= titleHeight + len * itemHeight;
            });
            v.shortcut = document.querySelector(".shortcut-hook");
            v.cityWrapper = document.querySelector(".city-wrapper-hook");
            v.shortcut.style.top =
                (v.cityWrapper.clientHeight - v.shortcut.clientHeight) / 2 +
                "px";
            v.scroll = new BScroll(v.cityWrapper, {
                probeType: 3
            });
            // console.log(v.scroll, 'v.scroll')
            // v.scroll.hasVerticalScroll = true
            // v.scroll.wrapperHeight = $('body').height()
            v.scroll.scrollTo(0, 0);
        },
        touchIndex: function(e) {
            // console.log(e, 'e')
            let v = this;
            let anchor = e.target.getAttribute("data-anchor");
            // console.log(anchor ,'anchor')
            let firstTouch = e.touches[0];
            v.touch.y1 = firstTouch.pageY;
            v.touch.anchor = anchor;
            v.scrollTo(anchor);
        },
        scrollTo: function(anchor) {
            let v = this;
            v.cityScroller = document.querySelector(".scroller-hook");
            var maxScrollY =
                v.cityWrapper.clientHeight - v.cityScroller.clientHeight;
            var y = Math.min(0, Math.max(maxScrollY, v.anchorMap[anchor]));
            if (typeof y !== "undefined") {
                v.scroll.scrollTo(0, y);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/city.css";
</style>

