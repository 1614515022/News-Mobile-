<template>
  <div id="header">
      <div class="pageHeader">
          <span>
              <img src="@/assets/sina.jpg">
          </span>
          <span>
              <p>军事</p>
              <van-icon name="arrow" class="point" />
              <p>中国军事</p>
          </span>
          <span>
              <van-switch v-model ="checked"   class="switch" active-color="red" />
          </span>
      </div>
  </div>
</template>

<script>
export default {

}

</script>
<style lang='less' scoped>
#header {
    .pageHeader{
        position: relative;
        height: 40px;
        background-color: red;
        display:flex;
        span:nth-child(1){
            img{
                width:60px;
                height: 40px;
                
            }
        }
        span:nth-child(2){
            display:flex;
            align-items:center;
            .point{
                color:white;
            }
            p{
                padding: 0 10px;
                color : white;
                
            }
        }
        span:nth-child(3){
            position: absolute;
            right:10px;
            top:5px;
            .switch{
                transform: scale(0.7)
            }
        }
    }
}
</style>