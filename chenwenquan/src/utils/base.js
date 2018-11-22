import {toast} from  'mint-ui';
exports.install = function (Vue, options) {
    Vue.prototype.tips = function (){//全局函数1
        let time = 2000
        return {
            success:function(msg,defaultTime){
                toast({
                    message:msg ,
                    duration:   defaultTime || time,
                    iconClass: 'el-icon-check',
                    className: 'toastWarningColor'
                })
            },
            error:function(msg,defaultTime){
                toast({
                    message:msg,
                    duration:   defaultTime || time,
                    iconClass: 'el-icon-error',
                    className: 'toastWarningColor'
                })
            },
            warning:function(msg,defaultTime){
                toast({
                    message:msg,
                    duration:   defaultTime || time,
                    iconClass: 'el-icon-warning',
                    className: 'toastWarningColor'
                })           
            },
            ordinary:function(msg,defaultTime){
                toast({
                    message:msg,
                    duration:   defaultTime || time,
                    iconClass: '',
                    className: 'toastOrdinary'
                })           
            }
        }
     };
     Vue.prototype.addHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler,  {passive: false});
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }
    Vue.prototype.idenfyCellphone = function(value,self){
        let myreg = /^[0-9]{11}$/;
        if(value === ""){
            self.isVoidActive = false
        }else if (value!=="" && !myreg.test(value)) {
                self.isVoid = false
                self.isVoidActive = false
                self.tipmsg = '当前手机号不正确，请重试'
                return false
            }else if(myreg.test(value)){
                self.isVoid = true
                self.tipmsg = ''
                self.isVoidActive = true
                return true
            }
    }
    Vue.prototype.idenfyCode = function(value,self){
        if(value === ""){
            self.codeTipmsg = '验证码不能为空'
        }else{
            self.codeTipmsg = ''
        }
    }
    Vue.prototype.getDetailPostion = function(){
        var callBackPosition = ""
        //获取地址信息，设置地址label
        function getAddress(point){
            let gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs){
                let addComp = rs.addressComponents;
                let address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
                sessionStorage.setItem('detailPosition',address)
                sessionStorage.setItem('detailPoint',point.lat + "," +point.lng)
            });
           
        }
        //获取当前位置
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                let mk = new BMap.Marker(r.point);
                getAddress(r.point);
            }else {
                tips().warning(('failed'+this.getStatus()))
            }
        });
    },
    Vue.prototype.Arabia_To_SimplifiedChinese = function(Num) {
        if(!Num) return
        for (i = Num.length - 1; i >= 0; i--) {
            Num = Num.replace(",", "")//替换Num中的“,”
            Num = Num.replace(" ", "")//替换Num中的空格
        }    
        if (isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return;
        }
        //字符处理完毕后开始转换，采用前后两部分分别转换
        part = String(Num).split(".");
        newchar = "";
        //小数点前进行转化
        for (i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                //alert("位数过大，无法计算");
                return "";
            }//若数量超过拾亿单位，提示
            tmpnewchar = ""
            perchar = part[0].charAt(i);
            switch (perchar) {
                case "0":  tmpnewchar = "零" + tmpnewchar;break;
                case "1": tmpnewchar = "一" + tmpnewchar; break;
                case "2": tmpnewchar = "二" + tmpnewchar; break;
                case "3": tmpnewchar = "三" + tmpnewchar; break;
                case "4": tmpnewchar = "四" + tmpnewchar; break;
                case "5": tmpnewchar = "五" + tmpnewchar; break;
                case "6": tmpnewchar = "六" + tmpnewchar; break;
                case "7": tmpnewchar = "七" + tmpnewchar; break;
                case "8": tmpnewchar = "八" + tmpnewchar; break;
                case "9": tmpnewchar = "九" + tmpnewchar; break;
            }
            switch (part[0].length - i - 1) {
                case 0: tmpnewchar = tmpnewchar; break;
                case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
                case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
                case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
                case 4: tmpnewchar = tmpnewchar + "万"; break;
                case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
                case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
                case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
                case 8: tmpnewchar = tmpnewchar + "亿"; break;
                case 9: tmpnewchar = tmpnewchar + "十"; break;
            }
            newchar = tmpnewchar + newchar;
        }   
        //替换所有无用汉字，直到没有此类无用的数字为止
        while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
            newchar = newchar.replace("零亿", "亿");
            newchar = newchar.replace("亿万", "亿");
            newchar = newchar.replace("零万", "万");
            newchar = newchar.replace("零零", "零");      
        }
        //替换以“一十”开头的，为“十”
        if (newchar.indexOf("一十") == 0) {
            newchar = newchar.substr(1);
        }
        //替换以“零”结尾的，为“”
        if (newchar.lastIndexOf("零") == newchar.length - 1) {
            newchar = newchar.substr(0, newchar.length - 1);
        }
        return newchar;
    };
    // 年月日替换
    Vue.prototype.steadTime = function(time){
        let  times = time.replace('年','-').replace('月','-').replace('日','-').substr(0,time.length-1)
        let  arr = times.split('-')
        let  arrs = []
        arr.forEach(element => {
            let ele = element<10?"0"+element:element
            arrs.push(ele)
        });
        return arrs.join('-')
    }
    Vue.prototype.tap = function (ele, callback) {
        let tag = 0;
        const isMobile = navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbro	wser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
        if (isMobile) {
            this.addHandler(ele, 'tuochstart', function (event) {
                event.preventDefault();
                tag = 0;
                // 如果移动了，则不算tap，这一点和click处理有一些区别
            });
            this.addHandler(ele, 'touchmove', function (event) {
                event.preventDefault();
                tag = 1;
                // 如果移动了，则不算tap，这一点和click处理有一些区别
            });
            this.addHandler(ele, 'touchend', function (event) {
                if (tag == 0) {
                    callback(event);
                }
                tag = 0
            });
        } else {
            this.addHandler(ele, 'click', function (event) {
                callback(event);
            });
        }
    }
 };

 