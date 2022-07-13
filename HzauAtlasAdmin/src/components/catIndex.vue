<template>
  <AdminHeader />
  <div class="title">User Manage</div>
  <div v-if="!dataState">
    <img src="../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <CatList :list="cat.data"/>
     <AdminFooter />
  </div>
 
</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import AdminFooter from "@/page/AdminFooter.vue";
import CatList from "@/page/CatInfo/CatList.vue";
import { ref, reactive } from "vue";
import api from "@/network/api";
import { useRouter } from "vue-router";
export default {
  setup() {
    let dataState = ref(false);
    const router = useRouter();
    //获取所有猫咪数据
    let cat = reactive({});
    let res = api.getAllCat();
    res.then((response) => {
      if (response.data.message == "token 已过期") {
        alert("登录已过期，请重新登录");
        router.push("/");
      } else {
        dataState.value = true;
        cat.data = response.data.data;
        for (let i = 0; i < cat.data.length; i++) {
          cat.data[i].photo = cat.data[i].photo[0].store;
        }
      }
    });
    return {
      dataState,
      cat
    };
  },
  components: {
    AdminHeader,
    AdminFooter,
    CatList
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

.loading {
  width: 10vw;
  height: 10vw;
  position: absolute;
  left: 45vw;
  top: 20vw;
}
</style>
