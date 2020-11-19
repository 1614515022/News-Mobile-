<template>
  <div class="collectionList" >
    <van-nav-bar
      title="收藏列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-for="(item,index) in this.allList" :key="index">
      <div v-for="(item1,index1) in  item" :key='index1' class="oneArticle" @click="$router.push('/detailArticle/'+item1.docid)">
        
        <span>
          <h4 class="van-multi-ellipsis--l2">{{item1.content}}</h4>
          <div class="message">
            <p>
              <van-icon  name="comment-o" style="transform: translate(0,0.125rem)" />{{item1.comments}}
            </p>
            <p>{{item1.nets}}</p>
          </div>
          
        </span>
        <span>
          <img v-if="$store.state.isPicture==true" :src="item1.photo">
          <img v-else src="../assets/2.jpg" />
        </span>
        
        
      </div>
    </div>
      
  </div>
</template>

<script>
export default {

    data(){
        return{
            collectionData:'',
            allList:'',
            model:{
                collectionList:''
            }
        }
    },
    methods:{
      onClickLeft(){
        this.$router.push('/personalCenter')
      }
    },
    async created() {
        this.collectionData = localStorage.getItem('collectionList')
        //console.log(localStorage.getItem('collectionList'))
        //console.log(this.collectionData)
        let regex = /izn[a-z]{4}\d{7}/igs
        this.model.collectionList = this.collectionData.match(regex)

        //console.log(this.model.collectionList)
        let res = await this.$http.post('/getCollection',this.model)
        //console.log(res)
        this.allList = res.data.data
        //console.log(this.allList)
        
    }
}

</script>
<style lang='less' scoped>
.collectionList:hover{
    cursor: pointer;
  }
  .collectionList{ 
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