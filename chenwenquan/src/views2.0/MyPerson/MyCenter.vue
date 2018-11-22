<template>
<div class="app">
    <div class="header">
        <div class="personal"><p>个人中心</p></div>
        <div class="icon">
            <div class="headsculpture">
                <img src="" alt="">
            </div>
            <div class="name">
                <p>孙国过</p><br/>
                <p>18852245655</p>
            </div>
            <div class="shezhi">
                <i class="iconfont icon-shezhi1"></i>
            </div>
        </div>
        <div class="appointment">
          
        </div>

        <div class="container">
            <ul class="list">
        <li class="fristchild">
          <i class="iconfont icon-lianxiren"></i>
          <span>诊疗历史</span>
          <i class="iconfont icon-iconfonti"></i>
        </li>
        <li>
          <i class="iconfont icon-lianxiren"></i>
          <span>诊疗历史</span>
        </li>
        <li>
          <i class="iconfont icon-lianxiren"></i>
          <span>诊疗历史</span>
        </li>
        <li>
          <i class="iconfont icon-lianxiren"></i>
          <span>诊疗历史</span>
        </li>
      </ul>

        </div>
    </div>

</div>
</template>

<script>

</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.app{
    width: 100%;
    height: 736px;
    position: relative;
    .header{
        width: 100%;
        height: 118px;
        background: #19d88a;
        position: absolute;
        top: 0;
        left: 0;
        .personal{
            width: 100%;
            height: 25%;
            color: white;
            font-size: 0.5rem;
            text-align: center;
            line-height: 25%;
            p{
                font-size:2rem;
                color: white;
                text-align: center;
                margin-top: 25px;
            }
        }
        .icon{
            width: 100%;
            height: 50%;
            //background: red;
            margin-top: -5px;
           
          //  background: red;
            .headsculpture{
                width: 3.9rem;
                height: 3.97767rem;
                border-radius:27px;
                background: green; 
                margin-left: 10px;
                float: left;
            }
            .name{
                line-height: 150%;
                p{
                    margin-left: 33px;
                    font-size: 0.5rem;
                    display: inline;
                    vertical-align: middle;
                    color: #d3fce6;
                }
            }
            .shezhi{
                .icon-shezhi1{
                    float:right;
                    font-size: 20px;
                    margin-right: 24px;
                    margin-top: -33px;
                    color: white;
                }
            }
        }  
 
    }
    .appointment{
        width: 94%;
        height: 57px;
        background: white;
        position: absolute;
        top: 106px;
        left: 12px;
        border-radius:5px; 
    }
    .container{
        width: 100%;
        height: 516px;
        // background: yellow;
        margin-top: 63px;
        .list{
             li{
                height:42px;
                line-height: 15px;
                background: #ffffff;
                padding: 12px 10px;
                border-bottom: 1px solid #e8e8e8;
                color: #929292;
                .icon-iconfonti{
                float: right;
                margin-right: 15px;
                font-size:18px;
                }
            }
            .fristchild{
                 margin-bottom: 10px;
            }
        }
    }
}

</style>

