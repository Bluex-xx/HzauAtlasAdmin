<template>
<AdminHeader/>
<div class="title">Photo Manage</div>
<div class="photo_content">
   <div class="photo_list">
      <div v-for="i in 19" :key="i" class="photo_one">
         
      </div>
   </div>
</div>
<AdminFooter/>
</template>
<script>
import AdminHeader from '@/page/AdminHeader.vue'
import AdminFooter from '@/page/AdminFooter.vue'
export default{
    setup(){
        
    },
    components:{
        AdminHeader,
        AdminFooter
    }
}
</script>
<style scoped>
.photo_content
{
    width: 100%;
    display: flex;
    justify-content: center;
}
.photo_list
{
    width: 70vw;
    border-radius: 10px;
    margin: 3vw 0 5vw 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.photo_one
{
    width:10vw ;
    height: 10vw;
    margin: 1vw;
    background: #f6f6f6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
  width: 100%;
  height: 10vw;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: grey;
  font-weight: 300;
}
</style>