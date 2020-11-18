<template>
  <div class="mainArticle">
      <div v-for="(item1,index1) in mainContent[index] " :key='index1' class="oneArticle" @click="toDetailArticle(item1)">
        
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
          <img v-if="$root._data.isPicture==true" :src="item1.photo">
          <img v-else src="../assets/2.jpg" />
        </span>
        
        
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      mainContent:[]
    }
  },
  props:["index"],
  async created(){
    let res = await this.$http.get('/mainContent')
    this.mainContent = res.data.data
    this.mainContent = this.spliceArr(this.mainContent)

  },
  methods:{
    spliceArr(data){
            let pageSize = 20
            let result = []
            for(let i = 0; i < data.length / pageSize; i++){
                result.push(data.slice(i * pageSize, (i+1) * pageSize))
                } for(let j = 0; j < (pageSize - data.length % pageSize); j++) {
                result[result.length - 1].push({})
            }
            return result
        },
        async toDetailArticle(item1){
          if(localStorage.getItem("token")){
                //console.log(this.$root._data.collectionList)

                //console.log(this.$root._data.collectionList);
                if(this.$root._data.readList.length==0){
                    await this.$root._data.readList.push(localStorage.getItem("readList"))
                }
                //console.log(localStorage.getItem("readList").indexOf(item1.docid))
                if(localStorage.getItem("readList")==null&&this.$root._data.readList.indexOf(item1.docid)==-1){
                  await this.$root._data.readList.push(item1.docid)
                }
                else if(this.$root._data.readList.indexOf(item1.docid)==-1&&localStorage.getItem("readList").indexOf(item1.docid)==-1){
                    await this.$root._data.readList.push(item1.docid)
                 }
                 //console.log(this.$root._data.collectionList)
                 
                 await localStorage.setItem("readList",this.$root._data.readList)
                 
                    //console.log(this.detailArticle[0].publishid)
                   // console.log(localStorage.getItem("collectionList"))
                 
            }
          await this.$router.push('/detailArticle/'+item1.docid)
        }
        

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