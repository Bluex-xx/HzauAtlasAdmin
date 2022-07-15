<template>
  <div v-if="!dataState">
    <img src="../../assets/loading.gif" class="loading" />
  </div>
  <div v-if="dataState">
    <div class="cat_contentx">
      <a-button type="primary" @click="showAdd" style="margin-right: 2vw"
        >Add Flower</a-button
      >
      <a-button loading="true" type="primary" style="margin-right: 2vw"
        >Information</a-button
      >
      <a-button type="dashed">FrontEnd</a-button>
    </div>
    <div class="cat_content">
      <div class="cat_list">
        <div class="cat_one" v-for="(i, index) in flower.data" :key="index">
          <img :src="i.photo[0].store" class="cat_pic" />
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
    <a-input v-model:value="edit_flower.name" show-count :maxlength="20" />
    <br />
    <br />
    品种
    <a-input v-model:value="edit_flower.department" show-count :maxlength="20" />
    <br />
    <br />
    花期
    <a-input
      v-model:value="edit_flower.florescence"
      show-count
      :maxlength="20"
    />
    <br />
    <br />
    花语
    <a-textarea v-model:value="edit_flower.allegory" show-count :maxlength="50" />

    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="http://api.codexx.cc:9000/upload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload Photo
      </a-button>
    </a-upload>
    <br />
    <a-button type="primary" @click="updateFlower">Updata</a-button>
    <a-button type="primary" @click="deleteFlower" style="margin-left: 21vw"
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
    <a-input v-model:value="edit_flower.name" show-count :maxlength="20" />
    <br />
    <br />
    品种
    <a-input v-model:value="edit_flower.department" show-count :maxlength="20" />
    <br />
    <br />
    花期
    <a-input
      v-model:value="edit_flower.florescence"
      show-count
      :maxlength="20"
    />
    <br />
    <br />
    花语
    <a-textarea v-model:value="edit_flower.allegory" show-count :maxlength="50" />

    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="http://api.codexx.cc:9000/upload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload Photo
      </a-button>
    </a-upload>
    <br />
    <a-alert message="请填写所有信息后，添加数据" type="warning" show-icon />
    <br />
    <a-button type="primary" @click="addFlower">Add Cat</a-button>
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
    let edit_flower = reactive({
      fid: "",
      department: "",
      florescence: "",
      allegory: "",
      name: "",
    });
    const visible = ref(false);
    const visible2 = ref(false);
    //编辑层相关
    const showDrawer = async (flower) => {
      edit_flower.name = flower.name;
      edit_flower.department = flower.department;
      edit_flower.florescence =flower.florescence;
      edit_flower.allegory = flower.allegory;
      edit_flower.fid = flower.fid;
      visible.value = true;
    };
    //添加层相关
    let showAdd = () => {
      init();
      visible2.value = true;
      edit_flower.name = "";
      edit_flower.department = "";
      edit_flower.florescence = "";
      edit_flower.allegory = "";
    };
    //更新花朵
    let updateFlower = () => {
      let res = api.updateFlower(edit_flower);
      res.then((response) => {
        if (response.data.data == "flower update success") {
          visible.value = false;
          message.success('Update success');
          init();
        }
        else
        {
            message.error('Updata error');
        }
      });
    };
    //添加猫咪
    let addFlower = () => {
      if (
        edit_flower.name == "" ||
        edit_flower.department == "" ||
        edit_flower.florescence == "" ||
        edit_flower.allegory == ""
      ) {
        message.info('Please fill in all information');
      } else {
        let res = api.addFlower(edit_flower);
        res.then((response) => {
          if (response.data.data == "flower insert success") {
            visible2.value = false;
            message.success('Successfully added flowers');
            init();
          }
        });
      }
    };
    //删除花朵
    let deleteFlower = () => {
      let res = api.deleteFlower({fid:edit_flower.fid});
      res.then((response) => {
        if (response.data.data == "flower delete success") {
          visible.value = false;
          message.success('Delete flowers successfully');
          init();
        }
      });
    };
    //图片上传相关
    const handleChange = (info) => {
      if (info.file.status !== "uploading") {
        if (edit_flower.name != "") {
          api.addFlowerPhoto({
            fid: edit_flower.fid,
            store: info.file.response.url,
            name: edit_flower.name,
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
    //初始化花朵数据
    let dataState = ref(false);
    const router = useRouter();
    //获取所有花朵数据
    let flower = reactive({});
    let init = async () => {
      let res = api.getAllFlower();
      await res.then((response) => {
        if (response.data.message == "token 已过期") {
          message.info('Login expired, please login again');
          router.push("/");
        } else {
          dataState.value = true;
          flower.data = response.data.data;
          let Cat_length = flower.data.length;
          edit_flower.fid = flower.data[Cat_length - 1].fid + 1;
        }
      });
    };
    init();
    return {
      visible,
      visible2,
      showDrawer,
      edit_flower,
      updateFlower,
      addFlower,
      deleteFlower,
      fileList,
      headers: {
        authorization: localStorage.getItem("token"),
      },
      handleChange,
      dataState,
      flower,
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
