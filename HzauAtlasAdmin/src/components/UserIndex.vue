<template>
  <AdminHeader />
  <div class="title">User Manage</div>
  <div v-if="!dataState">
    <img src="../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="user_content">
      <div class="user_list">
        <div v-for="(i, index) in user.data" :key="index" class="user_one">
          <img :src="i.profile_photo" class="user_pic" />
          <div class="user_name">
            {{ i.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <a-back-top />
  <strong style="color: rgba(64, 64, 64, 0.6)"></strong>
</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import { ref, reactive } from "vue";
import api from "../network/api";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default {
  setup() {
    let dataState = ref(false);
    let router = useRouter();
    let res = api.getAllUsers();
    let user = reactive({});
    res.then((response) => {
      dataState.value = true;
      if (response.data.message == "token 已过期") {
        localStorage.clear("token");
        message.error('Login expired, please login again');
        router.push("/");
      } else {
        user.data = response.data.data;
      }
    });
    return {
      dataState,
      user,
    };
  },
  components: {
    AdminHeader,
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
.user_content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.user_list {
  width: 70vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3vw 0 5vw 0;
}
.user_one {
  width: 15vw;
  height: 5vw;
  border-radius: 50px;
  background: rgba(159, 154, 154, 0.1);
  margin: 1vw;
  transition: 0.3s;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.user_one:hover {
  background: rgba(159, 154, 154, 0.3);
  transition: 0.3s;
}
.user_pic {
  width: 3.99vw;
  height: 3.99vw;
  border-radius: 50%;
  background: #fff;
  margin: 0.5vw;
}
.user_name {
  width: 9vw;
  height: 3vw;
  color: grey;
  font-size: 1vw;
  top: 1vw;
  left: 5.6vw;
  position: absolute;
}
</style>
