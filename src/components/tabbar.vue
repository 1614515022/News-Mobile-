<template>
  <div id="tabbar">
    <van-tabbar v-model="navActive">
      <van-tabbar-item icon="home-o" to='/'>主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/searchArticle">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/personalCenter">个人中心</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mainSet">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
        return {
            navActive:0
        }
    },
    created(){
      //console.log(this.$route.path);
      if(this.$route.path=='/searchArticle'){
        this.navActive = 1;
      }else if(this.$route.path=='/personalCenter'){
        this.navActive = 2;
      }else if(this.$route.path=='/mainSet'){
        this.navActive = 3
      }else{
        this.navActive = 0
      }
    }
};
</script>
<style lang='less' scoped>
#tabbar{
  margin-left: auto;
  margin-right: auto;

  .van-tabbar{
    max-width: 535px;
    position: fixed;
    left:initial;
  }
}
</style>