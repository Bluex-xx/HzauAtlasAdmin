<template>
  <div class="admin_content">
    <AdminHeader />
  </div>

    <img v-if="!dataState" class="loading" src="../assets/loading.gif">

  <div v-if="dataState">
  <div class="admin_content">
    <div class="admin_statistics">
      <router-link to="/cats">
      <div class="sum_one">
        <img src="../assets/icon/cat.png" class="icon" />
        <div class="number">猫咪:{{ statistics.sum.cat_num }}</div>
      </div>
      </router-link>
      <router-link to="/flowers">
      <div class="sum_one">
        <img src="../assets/icon/flower.png" class="icon" />
        <div class="number">花朵:{{ statistics.sum.flower_num }}</div>
      </div>
      </router-link>
      <router-link to="/users">
      <div class="sum_one">
        <img src="../assets/icon/user.png" class="icon" />
        <div class="number">用户:{{ statistics.sum.user_num }}</div>
      </div>
      </router-link>
      <router-link to="/photos">
      <div class="sum_one">
        <img src="../assets/icon/photo.png" class="icon" />
        <div class="number">图片:{{ statistics.sum.photo_num }}</div>
      </div>
      </router-link>
      <router-link to="/comments">
      <div class="sum_one">
        <img src="../assets/icon/comment.png" class="icon" />
        <div class="number">评论:{{ statistics.sum.comment_num }}</div>
      </div>
      </router-link>
      <router-link to="/about">
      <div class="sum_one">
        <img src="../assets/icon/about.png" class="icon" />
        <div class="number">About</div>
      </div>
      </router-link>
    </div>
  </div>
  </div>
  <AdminFooter/>
</template>

<script>
import AdminHeader from "@/page/AdminHeader.vue";
import AdminFooter from "@/page/AdminFooter.vue";
import api from "@/network/api";
import { onMounted, reactive,ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let dataState = ref(false)
    let statistics = reactive({ sum: 123 });
    let router = useRouter();
    onMounted(async () => {
      let token = localStorage.getItem('token');
      if(!token)
      {
        alert('请先登录')
        router.push('/') 
      }
      let res = await api.statistics();
      if(res.data.message=='token 已过期')
      {
        localStorage.clear('token')
        alert('登录过期，请重新登录')
        router.push('/')
      }
      statistics.sum = res.data;
      if(statistics.sum)
      {
        dataState.value = true
      }
    });
    return {
      statistics,
      dataState
    };
  },
  components: { AdminHeader, AdminFooter },
};
</script>

<style scoped>
.admin_content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
.admin_statistics {
  margin: 60px 0;
  width: 60vw;
  border-left: 1px solid #d2cbcb7d;
  border-right: 1px solid #d2cbcb7d;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.sum_one {
  width: 10vw;
  height: 14vw;
  border-radius: 10px;
  margin: 2vw;
  background: #a7b1a92d;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.icon {
  width: 7vw;
  height: 7vw;
  margin: 2vw 1.5vw;
}
.number {
  font-size: 1vw;
  color: grey;
  margin: 0 3.05vw;
  font-weight: 400;
}
.loading
{
    width: 10vw;
    height: 10vw;
    position: absolute;
    left: 45vw;
    top: 20vw;
}
</style>
