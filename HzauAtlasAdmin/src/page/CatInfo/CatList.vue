<template>
  <div v-if="!dataState">
    <img src="../../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="cat_contentx">
      <a-button type="primary" @click="showAdd" style="margin-right: 2vw"
        >Add Cat</a-button
      >
      <a-button loading="true" type="primary" style="margin-right:2vw;">Information</a-button>
      <a-button type="dashed">FrontEnd</a-button>
    </div>
    <div class="cat_content">
      <div class="cat_list">
        <div class="cat_one" v-for="(i, index) in cat.data" :key="index">
          <img :src="i.photo" class="cat_pic" />
          <div class="detail_button" @click="showDrawer(i)">
            {{ i.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 编辑猫咪的抽屉层 -->
  <a-drawer
    v-model:visible="visible"
    width="36vw"
    title="Edit Cat Information"
    placement="left"
  >
    <a-alert message="Informational Notes" type="info" show-icon />
    <br />
    名字
    <a-input v-model:value="edit_cat.name" show-count :maxlength="20" />
    <br />
    <br />
    颜色
    <a-input v-model:value="edit_cat.color" show-count :maxlength="20" />
    <br />
    <br />
    性格
    <a-input v-model:value="edit_cat.character1" show-count :maxlength="20" />
    <br />
    <br />
    出没地点
    <a-textarea v-model:value="edit_cat.place" show-count :maxlength="50" />

    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="http://api.codexx.cc:9000/upload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
    <br />
    <a-button type="primary" @click="updateCat">Updata</a-button>
    <a-button type="primary" @click="deleteCat" style="margin-left: 21vw"
      >Delete</a-button
    >
  </a-drawer>

  <!-- 添加猫咪的抽屉层 -->
  <a-drawer
    v-model:visible="visible2"
    width="36vw"
    title="Add Cat Information"
    placement="right"
  >
    <a-alert message="Informational Notes" type="info" show-icon />
    <br />
    名字
    <a-input v-model:value="edit_cat.name" show-count :maxlength="20" />
    <br />
    <br />
    颜色
    <a-input v-model:value="edit_cat.color" show-count :maxlength="20" />
    <br />
    <br />
    性格
    <a-input v-model:value="edit_cat.character1" show-count :maxlength="20" />
    <br />
    <br />
    出没地点
    <a-textarea v-model:value="edit_cat.place" show-count :maxlength="50" />

    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="http://api.codexx.cc:9000/upload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
    <br />
    <a-alert message="请填写所有信息后，添加数据" type="warning" show-icon />
    <br />
    <a-button type="primary" @click="addCat">Add Cat</a-button>
  </a-drawer>
  <a-back-top />
  <strong style="color: rgba(64, 64, 64, 0.6)"></strong>
</template>
<script>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import api from "@/network/api";
export default {
  setup() {
    let edit_cat = reactive({
      cid: "",
      character1: "",
      name: "",
      color: "",
      place: "",
    });
    const visible = ref(false);
    const visible2 = ref(false);
    const showDrawer = async (cat) => {
      edit_cat.name = cat.name;
      edit_cat.character1 = cat.character1;
      edit_cat.color = cat.color;
      edit_cat.place = cat.place;
      edit_cat.cid = cat.cid;
      visible.value = true;
    };
    let showAdd = () => {
      init();
      visible2.value = true;
      edit_cat.name = "";
      edit_cat.character1 = "";
      edit_cat.color = "";
      edit_cat.place = "";
    };
    let updateCat = () => {
      let res = api.updateCat(edit_cat);
      res.then((response) => {
        if (response.data.data == "cat update success") {
          visible.value = false;
          alert("信息更新成功");
          init();
        }
      });
    };
    //添加猫咪
    let addCat = () => {
      if (
        edit_cat.name == "" ||
        edit_cat.character1 == "" ||
        edit_cat.color == "" ||
        edit_cat.place == ""
      ) {
        alert("请填写所有信息");
      } else {
        let res = api.addCat(edit_cat);
        res.then((response) => {
          if (response.data.msg == "cat insert success") {
            visible2.value = false;
            alert("添加猫咪成功");
            init();
          }
        });
      }
    };
    //删除猫咪
    let deleteCat = () => {
      let res = api.deleteCat(edit_cat.cid);
      res.then((response) => {
        if (response.data.msg == "cat delete success") {
          visible.value = false;
          alert("删除成功");
          init();
        }
      });
    };
    //图片上传相关
    const handleChange = (info) => {
      if (info.file.status !== "uploading") {
        if (edit_cat.name != "") {
          api.addCatPhoto({
            cid: edit_cat.cid,
            store: info.file.response.url,
            name: edit_cat.name,
          });
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    const fileList = ref([]);
    //初始化猫咪数据
    let dataState = ref(false);
    const router = useRouter();
    //获取所有猫咪数据
    let cat = reactive({});
    let init = () => {
      let res = api.getAllCat();
      res.then((response) => {
        if (response.data.message == "token 已过期") {
          alert("登录已过期，请重新登录");
          router.push("/");
        } else {
          dataState.value = true;
          cat.data = response.data.data;
          let Cat_length = cat.data.length;
          edit_cat.cid = cat.data[Cat_length - 1].cid + 1;
          for (let i = 0; i < Cat_length; i++) {
            cat.data[i].photo = cat.data[i].photo[0].store;
          }
        }
      });
    };
    init();
    return {
      visible,
      visible2,
      showDrawer,
      edit_cat,
      updateCat,
      addCat,
      deleteCat,
      fileList,
      headers: {
        authorization: localStorage.getItem("token"),
      },
      handleChange,
      dataState,
      cat,
      showAdd,
    };
  },
};
</script>
<style scoped>
.cat_content {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2vw;
}
.cat_contentx {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2vw;
}
.cat_list {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 5vw;
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
  font-size: 1vw;
  color: grey;
}
.detail_button:hover {
  color: #b6b6b6;
}

.loading {
  width: 10vw;
  height: 10vw;
  position: absolute;
  left: 45vw;
  top: 20vw;
}
</style>
