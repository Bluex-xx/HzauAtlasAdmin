<template>
  <AdminHeader />
  <div class="title">Flower Manage</div>
  <FlowerList />
</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import FlowerList from "@/page/flowerInfo/flowerList";
export default {
  components: {
    AdminHeader,
    FlowerList,
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
