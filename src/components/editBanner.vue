<template>
<div @click="bannerClick">
    <div class="editBanner" >
        <span>{{left}}</span>
        <span>
            <slot name="right"></slot>
        </span>
    </div>
</div>
  
</template>
<script>
export default {
    props:["left"],
    methods:{
        bannerClick(){
            this.$emit("bannerClick")
        }
    }
}

</script>
<style lang='less'>
.editBanner{
    background: white;
    padding:1.875rem;
    border-bottom: 0.0625rem solid #eee;
    color:#333;
    font-size:1.25rem;
    display:flex;
    justify-content:space-between; 
    align-items: center;
    
}
</style>