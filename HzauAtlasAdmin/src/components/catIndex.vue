<template>
  <AdminHeader />
  <div class="title">User Manage</div>
  <div v-if="!dataState">
    <img src="../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="cat_content">
      <div class="cat_list">
        <div class="cat_one" v-for="(i, index) in cat.data" :key="index">
          <img :src="i.photo" class="cat_pic" />

        </div>
       
      </div>
    </div>
  </div>
  <AdminFooter />
</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import AdminFooter from "@/page/AdminFooter.vue";
import { ref, reactive } from "vue";
import api from "@/network/api";
import { useRouter } from "vue-router";
export default {
  setup() {
    let dataState = ref(false);
    const router = useRouter();
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
  },
};
</script>
<style scoped>
.cat_content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.cat_list {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3vw 0 5vw 0;
}
.cat_one {
  width: 10vw;
  height: 13vw;
  border-radius: 20px;
  background: rgba(146, 147, 149, 0.158);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 1vw;
}
.cat_pic {
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  margin: 1vw;
  background: #fff;
  object-fit: cover;
}
.detail_button {
  width: 100%;
  display: flex;
  justify-content: center;
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

.loading {
  width: 10vw;
  height: 10vw;
  position: absolute;
  left: 45vw;
  top: 20vw;
}
</style>
