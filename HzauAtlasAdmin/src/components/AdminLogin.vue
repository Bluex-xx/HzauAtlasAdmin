<template>
  <div class="login_content">
    <div class="login_box">
      <div class="Login_box_logo">
        <img src="../assets/images/logo.jpg" alt="Logo" style="width: 100%" />
      </div>
      <div class="cat_icon">
        <img
          src="../assets/icon/cat-icon.png"
          alt="Cat Icon"
          style="width: 100%"
        />
      </div>
      <div class="Login_box_title">狮山图鉴后台</div>
      <div class="Login_box_form">
        <div class="Login_input">
          <a-input
            v-model:value="user.account"
            placeholder="Account"
            maxlength="20"
            style="padding:0.6vw 10px;border-radius: 0.5vw;"
          />
        </div>
        <div class="Login_input">
          <a-input-password
            v-model:value="user.password"
            placeholder="Password"
            maxlength="20"
            style="padding:0.6vw 10px;border-radius: 0.5vw;"
          />
        </div>
        <div class="Login_button" @click="login">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import api from "../network/api";
export default {
  setup() {
    const user = reactive({
      account: "",
      password: "",
    });
    const login = async () => {
      let res = await api.login(user);
      if (res.msg === "success") {
        alert("登录成功");
        localStorage.setItem("token", res.token);
      } else {
        alert(res.msg);
      }
    };
    return {
      user,
      login,
    };
  },
};
</script>

<style>
.login_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f6f6;
  font-weight: 300;
}
.login_box {
  width: 30%;
  height: 40vh;
  border-radius: 1vw;
  background: #ffffff;
  margin: 30vh 0;
  position: relative;
}
.Login_box_logo {
  width: 4vw;
  height: 4vw;
  position: absolute;
  left: 4.5vw;
  top: 2.3vw;
}
.cat_icon {
  width: 13vw;
  height: 13vw;
  position: absolute;
  top: -8.7vw;
  right: 1.5vw;
}
.Login_box_title {
  font-size: 1.8vw;
  color: grey;
  position: absolute;
  right: 4.6vw;
  top: 2.7vw;
}
.Login_box_form {
  margin-top: 15vh;
}
.Login_input {
  width: 70%;
  height: 1vw;
  margin: 9% 15%;
}
.Login_button {
  margin: 4.3vh 8.4vh;
  padding: 7px 15px;
  background: #f6b6b6;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  border-radius: 0.5vw; 
}
.Login_button:hover {
  background: #e18d8db0;
}
</style>
