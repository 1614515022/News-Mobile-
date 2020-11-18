<template>
  <div>
    <h1>注册页</h1>
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
      <van-field
        v-model="model.repassword"
        type="password"
        name="密码"
        label="确认密码"
        placeholder="再次输入密码"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />
      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model:{}
    };
  },
  methods: {
    async onSubmit() {
      let res = await this.$http.post("/register",this.model)
      
     if(res.data.code == 200){
       this.$msg.fail(res.data.msg)
       setTimeout(()=>{
          this.$router.push('/login')
        },1000)
      }else if(res.data.code == 400){
        this.$msg.fail(res.data.msg)
      }else{
        this.$msg.fail(res.data.msg)
      }
      //console.log(res)
      this.model.menberData = res.data.data.resId[0]
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
</style>