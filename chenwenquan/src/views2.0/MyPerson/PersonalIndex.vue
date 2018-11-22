<template>
<div class="wraper">
    <div class="header">
        <div class="personal"><p>个人中心</p></div>
        <div class="login-wraper">
            <div class="login">登录</div>
            <i class="iconfont icon-shezhi1"></i>
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
.wraper{
    width: 100%;
    height: 736px;
    //background: red;
    position: relative;
    .header{
        width: 100%;
        height: 118px;
        background: #19d88a;
        position: absolute;
        top: 0;
        left: 0;
        .login-wraper{
            width: 100%;
            height: 40%;
            margin-top: 9px;
            .login{
                width: 20%;
                height: 49%;
                border: 1px solid white;
                border-radius:4px; 
                margin-left: 40%;
                text-align: center;
                color: white;
                line-height: 119%;
            }
            .iconfont{
                font-size: 20px;
                float:right;
                margin-right: 29px;
                margin-top: -23px;
                color: white;

            }
        }
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
    }
    .container{
        width: 100%;
        height: 618px;
       // background: yellow;
        margin-top: 16px;
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

