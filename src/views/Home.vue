<template>
  <div id="Home">
    <div class="homeHeader">
      <homeHeader></homeHeader>  
    </div>
    <div class="classList">
            <van-tabs v-model="classActive" background="red" color="yellow" title-inactive-color="white">
                <van-tab v-for="(item,index) in classList" :key="index" :title="item.title">
                    <main-article :index="index"></main-article>
                </van-tab>
        </van-tabs> 
    </div>
      
    <navbar></navbar>
  </div>
</template>

<script>
import homeHeader from "../components/homeHeader"
import navbar from "../components/tabbar"
import mainArticle from "./mainArticle"
export default {
    data(){
        return{
            checked:false,
            classList:[],
            mainContent:[],
            classActive:0,
            
        }
    },
    
    async created(){
        let res = await this.$http.get('/getClass')
        //console.log(res)
        this.classList = res.data.data
        //let result = await this.$http.get('/mainContent')
        //console.log(result)
        // this.mainContent = result.data.data
        // this.mainContent = this.spliceArr(this.mainContent)
        // console.log(this.mainContent)
        
    },
    components:{
        navbar,mainArticle,homeHeader
    },
    methods:{
        
        change(){//开关切换

        },
        onClickDisabled(){

        },
        changeIndex(name){
            console.log(name)
        },
        
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
        getContentItem(){
            let contentItem = this.mainContent[this.classActive]
            return contentItem
        },
        async selectArticle() {
            const contentItem = this.getContentItem();
            const res = await this.$http.get("/getClass" ,{
                params: {
                    id: getIndex.id
                },
            })
        }
    },
    watch:{
        classActive(){
            
        }
    }
}

</script>
<style lang='less' scoped>
#Home{
    
}
</style>