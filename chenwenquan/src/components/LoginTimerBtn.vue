<template>
    <button class="sendSmsBtn" :class="disabled?'dissendSmsBtn':''" type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>


<script>

export default{
    props: {
        second: {
            type: Number,
            default: 60
        },
        cellPhone: {
            type: null,
            default: ''
        },
        smsType: {
            type: null,
            default: ''
        }
    },
    data() {
     return {
        time: 0,
        disabled:false
     }
    },
    methods: {
        run: function () {
         this.$emit('run');
        },
        start: function(){
         this.getCode()
        },
        setDisabled: function(val){
         this.disabled = val;
        },
        getCode(){
            this.time = this.second;
            this.timer();
        },
        timer: function () {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            }else{
                this.disabled = false;
            }
        }
        
    },
    computed: {
        text: function () {
            return this.time > 0 ? this.time + 's 后重获取' : '发送验证码';
        }
    }
}
</script>

<style lang="scss" scoped>
    .sendSmsBtn{
        position: absolute;
        top: 10px;
        right: 7px;
        height: 34px;
        line-height: 34px;
        border-radius: 3px;
        border: none;
        padding: 0 6px;
        color: #444;
        display: inline-block;
        width: 98px;
        background: #fff;
    }
   
</style>

