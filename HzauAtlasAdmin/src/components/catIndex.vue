<template>
  <AdminHeader />
  <div class="title">Cat Manage</div>
  <CatList />
</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import CatList from "@/page/CatInfo/CatList.vue";
export default {
  components: {
    AdminHeader,
    CatList,
  },
};
</script>
<style scoped>
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
