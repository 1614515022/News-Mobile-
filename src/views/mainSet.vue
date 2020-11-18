<template>
  <div>
      <div class="setHeader">
          <van-nav-bar
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
      </div>
     
      <van-cell is-link title="账号管理" style="padding:20px" @click="show = true" />
      <van-action-sheet v-model="show" title="标题">
        <div class="content">内容</div>
        </van-action-sheet>
        <van-cell is-link title="通用" style="padding:20px" @click="show = true" />
      <van-action-sheet v-model="show" title="标题">
        <div class="content">内容</div>
        </van-action-sheet>
        <van-cell is-link title="关于应用" style="padding:20px" @click="show = true" />
      <van-action-sheet v-model="show" title="标题">
        <div class="content">内容</div>
        </van-action-sheet>
        <div class="quit" @click="$router.push('/login')">
            <h2>退出登陆</h2>
        </div>
        <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/tabbar"
export default {
    data(){
        return{
            show:false,
            model:{
                menberId:''
            }
        }
    },
    components:{
        tabbar
    },
    methods:{
        onClickLeft(){
            this.$router.push('/')
        }
    },
    async created() {
        this.model.menberId = localStorage.getItem("id");
        //console.log(this.model.menberId);
    }
}

</script>
<style lang='less' scoped>
.setHeader{
    margin-bottom:20px
}

.content {
    padding: 1rem 1rem 10rem;
}
.quit{
    margin-top:50px;
    text-align: center;
    cursor: pointer;
}
</style>