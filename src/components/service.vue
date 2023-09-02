<template>
  <div v-show="service_list.length === 0" class="card p-2 w-100" aria-hidden="true">
    <a class="btn btn-success placeholder-glow disabled placeholder col-12" aria-disabled="true"></a>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-4"></span>
      <span class="placeholder col-5"></span>
      <span class="placeholder col-3"></span>
    </p>
  </div>
  <table v-show="service_list.length > 0" class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="service in service_list">
      <th scope="row">{{ service.id }}</th>
      <td>{{ service.name }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  name: "service",
  data() {
    return {
      service_list: []
    }
  },
  methods: {
    async get_service_list(){
      var sls = await axios.get(
          "http://127.0.0.1:8000/sale_service_list/"
      );
      this.service_list = sls.data;
    }
  },
   created() {
     this.get_service_list()
   }
}
</script>

<style scoped>

</style>