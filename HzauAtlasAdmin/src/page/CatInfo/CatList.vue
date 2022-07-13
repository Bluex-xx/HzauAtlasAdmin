<template>
  <div class="cat_content">
    <a-button type="primary" @click="visible2 = true">Add Cat</a-button>
  </div>
  <div class="cat_content">
    <div class="cat_list">
      <div class="cat_one" v-for="(i, index) in list" :key="index">
        <img :src="i.photo" class="cat_pic" />
        <div class="detail_button" @click="showDrawer(i)">
          {{ i.name }}
        </div>
      </div>
    </div>
  </div>
  <a-drawer
    v-model:visible="visible"
    width="36vw"
    title="Edit Cat Information"
    placement="left"
  >
    <a-alert message="Informational Notes" type="info" show-icon />
    <br />
    <a-input v-model:value="edit_cat.name" show-count :maxlength="20" />
    <br />
    <br />
    <a-input v-model:value="edit_cat.color" show-count :maxlength="20" />
    <br />
    <br />
    <a-input v-model:value="edit_cat.character1" show-count :maxlength="20" />
    <br />
    <br />
    <a-textarea v-model:value="edit_cat.place" show-count :maxlength="50" />
    <br />

    <a-button type="primary" @click="updateCat">Updata</a-button>
    <a-button type="primary" @click="updatCat" style="margin-left: 21vw"
      >Delete</a-button
    >
  </a-drawer>
  <a-drawer
    v-model:visible="visible2"
    width="36vw"
    title="Add Cat Information"
    placement="right"
  >
    <a-input v-model:value="new_cat.name" show-count :maxlength="20" />
    <br />
    <br />
    <a-input v-model:value="new_cat.color" show-count :maxlength="20" />
    <br />
    <br />
    <a-input v-model:value="new_cat.character1" show-count :maxlength="20" />
    <br />
    <br />
    <a-textarea v-model:value="new_cat.place" show-count :maxlength="50" />

    <a-alert message="请至少填写名字，后添加照片" type="warning" show-icon />
    <br />
    <a-button type="primary" @click="addCat">Add Cat</a-button>
  </a-drawer>
</template>
<script>
import { reactive, ref } from "vue";
import api from "@/network/api";
export default {
  props: ["list"],
  setup() {
    let edit_cat = reactive({
      cid: "",
      character1: "",
      name: "",
      color: "",
      place: "",
    });
    let new_cat = reactive({
      character1: "性格",
      name: "名字",
      color: "颜色",
      place: "出没地点",
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
    let updateCat = () => {
      let res = api.updateCat(edit_cat);
      res.then((response) => {
        if (response.data.data == "cat update success") {
          visible.value = false;
          alert("信息更新成功");
        }
      });
    };
    let addCat = () => {
      if (new_cat.name == "名字") {
        alert("请填写名字");
      } else {
        let res = api.addCat(new_cat);
        res.then((response) => {
          if (response.data.msg == "cat insert success") {
            visible2.value = false;
            alert("添加成功，请添加照片");
          }
        });
      }
    };
    let deleteCat = ()=>{
        
    }
    return {
      visible,
      visible2,
      showDrawer,
      edit_cat,
      updateCat,
      addCat,
      new_cat,
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
.cat_list {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
</style>
