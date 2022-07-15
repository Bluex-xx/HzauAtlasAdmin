<template>
  <AdminHeader />
  <div class="title">Comment Manage</div>
  <div v-if="!dataState">
    <img src="../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="comment_content">
      <div class="comment_list">
        <div
          v-for="(i, index) in comment.data.data"
          :key="index"
          class="comment_one"
        >
          <div>
            <img :src="i.user.profile_photo" class="user_pic" />
          </div>
          <div class="name">
            {{ i.user.name }}
          </div>
          <div>
            <img
              @click="deleteComment(i.id, index)"
              class="delete"
              src="../assets/icon/delete.png"
            />
          </div>
          <div class="comment_value">
            {{ i.content }}
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

import { reactive, ref } from "vue";
import api from "../network/api";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default {
  setup() {
    let dataState = ref(false);
    let router = useRouter();
    //获取评论数据
    let comment = reactive({});
    let res = api.getAllComment();
    res.then((res) => {
      comment.data = res.data;
      dataState.value = true;
    });
    //删除评论
    let deleteComment = async (id, index) => {
      if (window.confirm("确认要删除吗？")) {
        let res = await api.deleteComment(id);
        if (res.data.msg == "comment delete success") {
          message.success('Delete successfully');
          for (let i of comment.data.data) {
            if (i.id == id) {
              comment.data.data = comment.data.data.filter(
                (ele, key) => key != index
              );
            }
          }
        } else if (res.data.message == "token 已过期") {
          localStorage.clear("token");
          message.error('Login expired, please login again');
          router.push("/");
        } else {
          message.error('Delete failed');
        }
      }
    };
    return {
      comment,
      deleteComment,
      dataState,
    };
  },
  components: {
    AdminHeader,

  },
};
</script>
<style scoped>
.comment_content {
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
.comment_list {
  width: 70vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px 0 100px 0;
}
.comment_one {
  width: 20vw;
  height: 7vw;
  border-radius: 10px;
  margin: 1vw;
  background: #c3d3cf5b;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.user_pic {
  width: 5vw;
  height: 5vw;
  margin: 1vw;
  border-radius: 10px;
}
.name {
  width: 5vw;
  color: rgba(128, 128, 128, 0.678);
  height: 30px;
  font-size: 18px;
  position: absolute;
  left: 7vw;
  top: 1.2vw;
  overflow: hidden;
}
.comment_value {
  position: absolute;
  width: 10vw;
  height: 4vw;
  left: 7vw;
  top: 3vw;
  overflow: hidden;
  color: grey;
}
.delete {
  width: 1vw;
  height: 1vw;
  position: absolute;
  right: 1vw;
  top: 3vw;
}
.loading {
  width: 10vw;
  height: 10vw;
  position: absolute;
  left: 45vw;
  top: 20vw;
}
</style>
