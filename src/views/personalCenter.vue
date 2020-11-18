<template>
    <div class="edit">
        <div>
          <van-nav-bar
            title="个人中心"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
         </div>
         <div class="myBackground" >
             <span @click="$router.push('/editPage')">
                 <img :src="userDataList.img">
             </span>
             <span>
                 <h2>{{userDataList.nickname}}</h2>
             </span>
         </div>
         <div class="mymain">
            <span @click="$router.push('/collectionList')">
                <van-icon name="like-o" />
                <p>收藏</p>
            </span>     
            <span>
                <van-icon name="star-o" />
                <p>关注</p>
            </span>
            <span @click="$router.push('/readList')">
                <van-icon name="underway-o" />
                <p>观看历史</p>
            </span>
            <span>
                <van-icon name="setting-o" />
                <p>待开发</p>
            </span>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from "../components/tabbar.vue"
import editBanner from "../components/editBanner.vue"
import axios from "axios"
export default {
    data() {
        return {
            userDataList:[],
            model:{
                menberId:''
            },
            
        }
    },
    components:{
        tabbar
    },
    methods:{
        onClickLeft(){
            this.$router.push('/')
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
.myBackground{
    display:flex;
    height: 200px;
    background-color: #999;
    span:nth-child(1){
        cursor: pointer;    
        img{
            margin-left: 50px;
            margin-top: 155px;
            width:70px;
            border-radius:70px;
        }
    }
    span:nth-child(2){
        h2{
            margin-left: 20px;
            margin-top: 170px;  
        }
    }
    
}
.mymain{
    display:flex;
    margin-top:50px;
    color:#aaa;
    
    p{
        margin:0;
    }
    i{
        margin:0 7px;
    }
    span:nth-child(1){
        cursor: pointer;
        padding:0 6% 0 10%;
        border-right: 1px solid #111;
    }
    span:nth-child(2){
        cursor: pointer;
        padding:0 6%;
        border-right: 1px solid #111;
    }
    span:nth-child(3) {
        cursor: pointer;
        padding:0 6%;
        border-right: 1px solid #111;
        i{
            transform: translate(15px)
        }
    }
    span:nth-child(4){
        cursor: pointer;
        padding:0 6%;
        
        i{
            transform: translate(9px)
        }
    }
}
</style>