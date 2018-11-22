<template>
    <div>
        <city-select></city-select>
        <mt-search v-model="value">
            
        </mt-search>
        <div id="searchResultPanel" ></div>
        <div id="container" style="position:absolute;width:100%;height:400px;top:53px;display:none;"></div> -->
    </div>
</template>
<script>
import citySelect from '@/components/CitySelect'
export default {
    name: "mapSearch",
    data() { 
        return {
            value: ""
        };
    },
    components:{
        citySelect
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const obj = this
            document.querySelector(".mint-searchbar-core").setAttribute("id", "suggestId");
            var map = new BMap.Map("container");
            var point = new BMap.Point(116.3964, 39.9093);
            map.centerAndZoom(point, 13);
            map.enableScrollWheelZoom();
            var ac = new BMap.Autocomplete({
                //建立一个自动完成的对象
                input: "suggestId",
                location: map
            });
            function G(id) {
                return document.getElementById(id);
            }
            ac.addEventListener("onhighlight", function(e) {
                //鼠标放在下拉列表上的事件
                var str = "";
                var _value = e.fromitem.value;
                var value = "";
                if (e.fromitem.index > -1) {
                    value =
                        _value.province +
                        _value.city +
                        _value.district +
                        _value.street +
                        _value.business;
                }
                str =
                    "FromItem<br />index = " +
                    e.fromitem.index +
                    "<br />value = " +
                    value;

                value = "";
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value =
                        _value.province +
                        _value.city +
                        _value.district +
                        _value.street +
                        _value.business;
                }
                str +=
                    "<br />ToItem<br />index = " +
                    e.toitem.index +
                    "<br />value = " +
                    value;
                G("searchResultPanel").innerHTML = str;
            });

            var myValue;
            ac.addEventListener("onconfirm", function(e) {
                //鼠标点击下拉列表后的事件
                var _value = e.item.value;
                myValue =
                    _value.province +
                    _value.city +
                    _value.district +
                    _value.street +
                    _value.business;
                G("searchResultPanel").innerHTML =
                    "onconfirm<br />index = " +
                    e.item.index +
                    "<br />myValue = " +
                    myValue;

                setPlace(obj);
            });
            function setPlace(obj) {
                const self = obj
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder(); // 将地址解析结果显示在地图上,并调整地图视野
                debugger
                sessionStorage.setItem('detailPosition',myValue)
                myGeo.getPoint(
                    myValue,
                    function(point) {
                        if (point) {
                            map.centerAndZoom(point, 16);
                            map.addOverlay(new BMap.Marker(point));
                            self.$router.push({path:'/descriptionDisease'})
                        }
                    },
                    "北京"
                );
            }
        }
    }
};
</script>
<style lang="scss" >
#searchResultPanel {
    position: absolute;
    display: none;
    left: 650px;
    top: 150px;
    border: 1px solid #c0c0c0;
    width: 300px;
    height: 600px;
}
.tangram-suggestion-main{
    top:86px !important;
}
.mint-searchbar {
    width: 78%;
    float: right;
}
</style>

    
