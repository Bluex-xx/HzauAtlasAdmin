<template>
<AdminLogin/>
</template>

<script>

import AdminLogin from "./components/AdminLogin.vue";

export default {
  name: 'App',
  setup(){
    let token = localStorage.getItem('token');
    return{
      token
    }
  },
  components: {
    AdminLogin

}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
