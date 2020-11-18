<template>
  <div id="login">
      <h1>登录页</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="model.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="model.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="jumpPage">
        <a href="http://localhost:8080/register">没有账号？立即注册</a>
      </div>
      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model:{
        username:'',
        password:'',
        menberData:'',
        menberToken:''
      }
    };
  },
  methods: {
    async onSubmit() {
      let res = await this.$http.post("/login",this.model)
      
      if(res.data.code == 200){
       this.$msg.fail(res.data.msg)
       setTimeout(()=>{
          this.$router.push('/')
        },1000)
      }else{
        this.$msg.fail(res.data.msg)
      }
      //console.log(res)
      this.model.menberData = res.data.data.result[0]
      this.model.menberToken = res.data.data.token
      //console.log(this.model.menberData)
      //console.log(this.model.menberToken)
      localStorage.setItem("id",this.model.menberData.id);
      localStorage.setItem("token",this.model.menberToken);
    },
  },
}

</script>
<style lang='less' scoped>
#login{
    .jumpPage{
       text-align: center; 
    }
    
}
</style>