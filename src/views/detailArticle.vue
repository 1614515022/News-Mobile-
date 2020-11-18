<template>
  <div id="detailArticle">
      <div class="detailHeader">
          <homeHeader></homeHeader>
      </div>
      <h2>{{detailArticle[0].title}}</h2>
      <div class="detailMessage">
          <span>
              <img :src="detailArticle[0].image">
          </span>
          <span>
              <p>{{detailArticle[0].author}}</p>
              <p class="detailTime">{{detailArticle[0].time}}</p>
          </span>
          
            <span @click="collection()"  >
                <van-icon name="like"  size="30px" :class="{activecolor:collectionColor}" />
            </span>
          
      </div>
      <div class="detailContent">
          <img :src="detailArticle[0].image">
          <p>{{detailArticle[0].content}}</p>
      </div>
  </div>
</template>

<script>
import homeHeader from "@/components/homeHeader"
import axios from "axios"
export default {
    data(){
        return{
            model:{
               id:this.$route.params.id,
            },
            model1:{
                menberId:''
            },
            detailArticle:'',
            usermessage:'',
            collectionColor:false,
            collectionList:[]
        }
    },
    components:{
        homeHeader
    },
    methods:{
        //收藏
        async collection(){
            
            if(localStorage.getItem("token")){
                //console.log(this.$root._data.collectionList)

                //console.log(this.$root._data.collectionList);
                //console.log(this.$root._data.collectionList);
                if(this.$root._data.collectionList.length==0){
                    await this.$root._data.collectionList.push(localStorage.getItem("collectionList"))
                    
                }
                console.log(this.$root._data.collectionList);
                if(this.$root._data.collectionList.indexOf(this.detailArticle[0].publishid)==-1&&localStorage.getItem("collectionList")==null){
                    await this.$root._data.collectionList.push(this.detailArticle[0].publishid)
                 }
                else if(this.$root._data.collectionList.indexOf(this.detailArticle[0].publishid)==-1&&localStorage.getItem("collectionList").indexOf(this.detailArticle[0].publishid)==-1){
                    await this.$root._data.collectionList.push(this.detailArticle[0].publishid)
                 }else{
                    await this.$root._data.collectionList.splice(this.$root._data.collectionList.indexOf(this.detailArticle[0].publishid),1)
                 }
                 //console.log(this.$root._data.collectionList)
                 console.log(this.$root._data.collectionList)
                 await localStorage.setItem("collectionList",this.$root._data.collectionList)
                 
                    //console.log(this.detailArticle[0].publishid)
                   // console.log(localStorage.getItem("collectionList"))
                 if(await localStorage.getItem("collectionList").indexOf(this.detailArticle[0].publishid)!=-1){
                     this.collectionColor = true
                     //console.log(11)
                 }else{
                     this.collectionColor = false
                 }
            }
            // if(localStorage.getItem("token")){
            //     console.log(1)
            //     console.log(this.usermessage.nickname)
            //     if(this.collectionList.indexOf(this.detailArticle[0].publishid)==-1){
            //         this.collectionList.push(this.detailArticle[0].publishid)
            //     }
            //     console.log(this.collectionList)
            //     this.usermessage.collection = this.collectionList
            //     console.log(this.usermessage.collection)
            //     const res = await this.$http.post("/collection/"+localStorage.getItem("id"),
            //     {collection:this.usermessage.collection})
            //     console.log(res)
            //     if(res.data.data.msg == "收藏成功"){
            //     this.collectionColor = true
            //     }else{
            //     this.collectionColor = false
            //     }
            //     this.$msg.fail(res.data.data.msg)
            // } 
        },
        //打开页面，判断是否收藏
        // async collectioncode(){
        //     if(localStorage.getItem("token")){
        //         const res = await this.$http.get("/collection/"+localStorage.getItem("id"),{
        //             params:{
        //                 article_id:this.$route.params.id
        //             }
        //         })
        //         this.colletionColor = res.data.success
        //     }
            
        // },
    },
    
    async created(){
        this.model1.menberId = localStorage.getItem("id"); 
        let res = await this.$http.post("/detailContent",this.model)
        //console.log(res)
         let result = await this.$http.post('/users/getUserMeg',this.model1)
         //onsole.log(result)
         this.usermessage = result.data.data[0]
         //console.log(this.usermessage)
        this.detailArticle = res.data.data
        
        if(await localStorage.getItem("collectionList").indexOf(this.detailArticle[0].publishid)!=-1){
            this.collectionColor = true
            //console.log(11)
        }else{
            this.collectionColor = false
        }
        //console.log(this.detailArticle)
        //console.log(res)
    }
}

</script>
<style lang='less' scoped>
#detailArticle {
    h2{
        margin: 0.625rem
    }
    .detailMessage{
        margin: 0.625rem;
        display: flex;
        
        span:nth-child(1){
            justify-content: center;
            img{
                width:1.875rem ;
                height: 2.1875rem; 
            }
        }
        span:nth-child(2){
            margin-left: 0.625rem;
            p:nth-child(1){
                margin: 0;
                font-size: 0.875rem
            }
            p:nth-child(2){
                margin: 0;
                font-size: 0.875rem;
                color:#999;
            }
        }
        span:nth-child(3){
            .activecolor{
                color:red
            }
            
        
        }
    }
    .detailContent{
        padding:0.625rem;
        background-color:#eee;
        img{
            width:100%;
            height: 21.875rem;
            text-align: center;
        }
        p{
            font-size:1.25rem;
            
        }
    }
}
</style>