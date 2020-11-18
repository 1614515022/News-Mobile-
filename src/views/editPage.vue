<template>
  <div class="editPage">
      <div class="uploadfile">
          <van-uploader class="uploadimg"  result-type="file" preview-size="100vw" :after-read="afterRead"></van-uploader>
        <edit-banner left="头像">
            <img slot="right" v-if="userDataList.img" :src="userDataList.img">
            <img slot="right" v-else src="../assets/1.jpg">
        </edit-banner>
      </div>

      <edit-banner left="昵称" @bannerClick="textshow = true">
        <a href="javascript:;" slot="right">{{userDataList.nickname}}</a>
        </edit-banner>
      <edit-banner left="账号">
        <a href="javascript:;" slot="right">{{userDataList.username}}</a>
        </edit-banner>
      <edit-banner left="性别" @bannerClick="gendershow = true">
          <a href="javascript:;" slot="right">{{userDataList.sex==0?"男":"女"}}</a>
      </edit-banner>
      <edit-banner left="年龄" @bannerClick="textareashow = true">
          <a href="javascript:;" slot="right">{{userDataList.age}}</a>
      </edit-banner>

        <div class="back" @click="$router.push('/personalCenter')">
            返回个人中心
        </div>

      <van-dialog v-model="textshow"
        title="昵称"
        show-cancel-button
        @confirm="textconfirm"
        @cancel='text = ""' >
            <van-field v-model="text" autofocus />
      </van-dialog>

      <van-dialog v-model="textareashow"
        title="年龄"
        show-cancel-button
        @confirm="textareaconfirm"
        @cancel='text = ""' >
            <van-field v-model="text" autofocus />
      </van-dialog>

      <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="genderactions" @select="onSelect" />
        
  </div>
</template>

<script>
import editBanner from "../components/editBanner.vue"
import axios from "axios"
export default {
 data() {
    return {
        userDataList:[],
        model:{
            menberId:''
        },
        text:"",
        textshow:false,
        textareashow:false,
        gendershow:false,
        genderactions:[
            {name:"男",val:0},
            {name:"女",val:1}
        ]
    }
},
components:{
    editBanner
},
methods:{
    
    async afterRead(file){
        console.log(file)
        const fromdata = new FormData()
        fromdata.append("file",file.file)
        console.log(fromdata)
        console.log(axios)
        const res = await axios.post("http://112.74.99.5:3000/web/api/upload",fromdata)
        console.log(res)
        this.userDataList.img  = res.data.url
        this.userUpdate()
    },
    async userUpdate(){
        const res = await this.$http.post("/users/userUpdate",this.userDataList)
        console.log(res)
        if(res.data.code == 200){
            this.$msg.fail("修改成功")
        }
    },
    textconfirm(){
        this.userDataList.nickname = this.text
        this.userUpdate()
        this.text=""
    },
    textareaconfirm(){
        this.userDataList.age = this.text
        this.userUpdate()
        this.text=""
    },
    onSelect(data){
        //console.log(data)
        this.userDataList.sex = data.val
        this.gendershow = false
    },

},
async created() {
    this.model.menberId = localStorage.getItem("id");
    let res = await this.$http.post('/users/getUserMeg',this.model)
    this.userDataList = res.data.data[0]
    console.log(userDataList)
    this.UserinfoData()
    //console.log(res)
    //console.log(this.model.menberId);
}
}

</script>
<style lang='less' scoped>
    .editPage a{    
        color:#333
    }
    .editPage img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    }
    .uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        position: absolute;
        opacity: 0;
        
}
}
.back{
    margin:1.25rem 0;
    padding:1.25rem 0;
    background-color:white;
    color:#999;
    text-align: center;
    font-size: 2rem;
}
</style>