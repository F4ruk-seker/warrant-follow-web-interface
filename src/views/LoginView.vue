<template>
<section class="login_banner">

<div class="row d-flex justify-content-center">
  <div class="col-md-6 col-xl-4">
    <div class="top-0 start-0 top-md-50 start-md-50" style="position: relative;background: transparent!important;border: 2px solid rgba(255,255,255,0.53);border-radius: 20px;backdrop-filter: blur(3px);-webkit-backdrop-filter: blur(3px);">
      <div class="card-body d-flex flex-column align-items-center">
        <form @submit.prevent="send_login_request">
          <input type="text" v-model="username" required>
          <input type="text" v-model="password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>
</section>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginView",
  data(){return{
    username:null,
    password:null,
  }},
  methods:{
    async send_login_request(){
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/',
            {"password": this.password, "username": this.username},
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
        if (response.status === 200){
          const cookies = response.headers['set-cookie'];
          this.$store.commit('setCookies', cookies);
        }
      }catch (e) {

      }

    }
  }
}
</script>

<style scoped>
.login_banner{
  background: url('https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') no-repeat center;
  background-size: cover!important;
  height: 100vh
}
</style>