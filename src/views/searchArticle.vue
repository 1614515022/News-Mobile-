<template>
  <div>
    <van-search
        v-model="model.keyWords.secName"
        show-action
        placeholder="请输入搜索关键词"
        >
        <template #action>
            <div v-if="model.keyWords.secName!=0"  @click="onSearch()">搜索</div>
        </template>
    </van-search>
    <div class="mainArticle">
        <div v-for="(item,index) in model.newsList" :key='index' class="oneArticle" @click="$router.push('/detailArticle/'+item.docid)">
            
            <span>
            <h4 class="van-multi-ellipsis--l2">{{item.content}}</h4>
            <div class="message">
                <p>
                <van-icon  name="comment-o" style="transform: translate(0,0.125rem)" />{{item.comments}}
                </p>
                <p>{{item.nets}}</p>
            </div>
            
            </span>
            <span>
            <img v-if="$store.state.isPicture==true" :src="item.photo">
            <img v-else src="../assets/2.jpg" />
            </span>
            
            
        </div> 
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/tabbar"
export default {
    data(){
        return{
            model:{
                keyWords:{
                    secName:''
                },
                newsList:[]
            }
        }
    },
    components:{
        tabbar
    },
    methods:{
        async onSearch(){
            let res = await this.$http.post('/newsFind',this.model.keyWords)
            this.model.newsList = res.data.data
            //console.log(res.data)  
            if(res.data.code == 400){
              this.$msg.fail(res.data.msg)
            }else{
              this.$msg.fail('一共有'+this.model.newsList.length+'条结果')
            }
        }
    },
    created(){
       

        //console.log(getData)
    }
    
}

</script>
<style lang='less' scoped>
.mainArticle:hover{
    cursor: pointer;
  }
  .mainArticle{ 
    margin-bottom:3.125rem;
    .oneArticle{
      border-bottom: 0.0625rem solid #aaa;
      display:flex;
      justify-content: space-between;
      span:nth-child(1){
        .message{
          transform: translate(0.625rem,-0.3125rem);
          display:flex;
          p{
            color:#aaa;
            margin:0.0625rem;
          }
        }
        h4{
          margin:0.625rem;
        }
        
      }
      span:nth-child(2){
        img{
          width:6.25rem;
          height:4.375rem;
          transform:translate(-0.625rem,0.625rem)
        }
      }
    }
    
  
  }
</style>