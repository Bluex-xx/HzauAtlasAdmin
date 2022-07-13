<template>
  <AdminHeader />
  <div class="title">Photo Manage</div>
  <div v-if="!dataState">
    <img src="../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="photo_content">
      <div class="photo_list">
        <div v-for="(i, index) in photo.data.data" :key="index" class="photos">
          <div class="photo_one">
            <a-image :src="i.store" width="10vw" height="10vw" style="object-fit:cover ;"/>
          </div>

          <div class="delete" @click="deletePhoto(i.pid, index)">
            <img src="../assets/icon/delete.png" class="delete_icon" />
          </div>
        </div>
      </div>
    </div>
     <AdminFooter />
  </div>

</template>
<script>
import AdminHeader from "@/page/AdminHeader.vue";
import AdminFooter from "@/page/AdminFooter.vue";
import api from "../network/api";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let dataState = ref(false);
    let res = api.getAllPhotos();
    let photo = reactive({});
    const router = useRouter();
    //获取所有图片，数据初始化
    res.then((response) => {
      if (response.data.message == "token 已过期") {
        alert("登录过期，请重新登录");
        router.push("/");
      }
      dataState.value = true;
      photo.data = response.data;
    });
    //图片删除操作
    let deletePhoto = async (pid, index) => {
      if (window.confirm("确认删除这张照片吗")) {
        let res = await api.deleteCatPhoto(pid);
        if (res.data.msg == "delete cat photo success") {
          alert("删除成功");
          for (let i of photo.data.data) {
            if (i.pid == pid) {
              photo.data.data = photo.data.data.filter(
                (ele, key) => key != index
              );
            }
          }
        } else if (res.data.message == "token 已过期") {
          localStorage.clear("token");
          alert("登陆过期，请重新登录");
          router.push("/");
        } else {
          alert("删除失败");
        }
      }
    };
    return {
      photo,
      deletePhoto,
      dataState,
    };
  },
  components: {
    AdminHeader,
    AdminFooter,
  },
};
</script>
<style scoped>
.photo_content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.photo_list {
  width: 70vw;
  border-radius: 10px;
  margin: 3vw 0 5vw 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.photo_one {
  width: 10vw;
  height: 10vw;
  margin: 1vw;
  background: #f6f6f6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
.photos {
  position: relative;
}
.delete {
  width: 1.5vw;
  height: 1.5vw;
  background: white;
  position: absolute;
  right: 1vw;
  top: 1vw;
  z-index: 999;
  opacity: 0.5;
  transition: 0.3s;
}
.delete:hover {
  opacity: 0.8;
  transition: 0.3s;
}
.delete_icon {
  width: 1.1vw;
  height: 1.1vw;
  margin: 0.2vw;
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
