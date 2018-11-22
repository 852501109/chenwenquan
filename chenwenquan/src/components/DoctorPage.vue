<template>
<div>
  <div class="hello contaner">
    <p class="h3Title">医生首页</p>
    
  </div>
</div>
</template>

<script>
export default {
  name: 'dockerPate',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h3Title{
  color:#ffffff;
  margin-bottom:100px;
  font-size: 1.4rem;
  padding-top:3rem;
  font-weight: inherit;
  letter-spacing: 0.1rem;
  padding-bottom: 3rem;
  text-align:center;
}
.hello{
  background-image: linear-gradient(to bottom, #6ad6af,#fff);
  height: 100vh;
  width: 100%;
}

</style>
