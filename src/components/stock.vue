<template>
    <div v-show="stock_list.length === 0" class="card p-2 w-100" aria-hidden="true">
        <a class="btn btn-primary placeholder-glow disabled placeholder col-12" aria-disabled="true"></a>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-12"></span>
          <span class="placeholder col-11"></span>
          <span class="placeholder col-10"></span>
          <span class="placeholder col-9"></span>
        </p>
      </div>
  <table v-show="stock_list.length > 0" class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Service</th>
      <th scope="col">Name</th>
      <th scope="col">First Price</th>
      <th scope="col">Current Price</th>
      <th scope="col">Purchase Quantity</th>

      <th scope="col">purchase cost</th>
      <th scope="col">Now Gain</th>
      <th scope="col">Range</th>

      <th scope="col">Status</th>
      <th scope="col">DateFlow</th>
      <th scope="col">Edit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(stock, index) in stock_list" :key="index">
      <th scope="row">{{ index + 1 }}</th>
      <td>{{ get_sale_service_name(stock._Stock__service_id) }}</td>
      <td>{{ stock.name }}</td>
      <td>{{ stock.initial_price }}</td>
      <td>{{ stock.current_price }}</td>
      <td>{{ stock.purchase_quantity }}</td>

      <td>{{ (stock.initial_price * stock.purchase_quantity).toFixed(2) }}</td>
      <td>{{ (stock.current_price * stock.purchase_quantity).toFixed(2) }}</td>

      <td v-if=" (stock.current_price * stock.purchase_quantity - stock.initial_price * stock.purchase_quantity ) > 0"
          style="color: var(--bs-success)"
          class="fw-semibold"
      > +{{ (stock.current_price * stock.purchase_quantity - stock.initial_price * stock.purchase_quantity).toFixed(2) }}
      </td>
      <td v-else style="color: var(--bs-danger)" class="fw-semibold">
       {{ (stock.current_price * stock.purchase_quantity - stock.initial_price * stock.purchase_quantity).toFixed(2) }}
      </td>
      <td>
        <font-awesome-icon :icon="['fas', 'heart']" v-if="stock.process" style="color: var(--bs-success )" />
        <font-awesome-icon :icon="['fas', 'heart']" v-else style="color: var(--bs-danger)" />
      </td>
      <td>
        <button type="button" class="btn btn-secondary disabled" disabled readonly>
        <font-awesome-icon icon="fa-solid fa-calendar-days" />
      </button>
      </td>
      <td>
        <button type="button" class="btn btn-secondary disabled" disabled readonly>
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </button>
      </td>
    </tr>

    <!--    STOCK ADD FORM-->
    <tr v-show="!date_flow">
      <th scope="row" class="pt-3">ID</th>
      <td>
        <select class="form-control" name="sale_service" v-model="new_stock.sale_service_id">
          <option v-for="sale_service in sale_service_list" :value="sale_service.id">{{ sale_service.name }}</option>
        </select>
      </td>
      <td><input class="form-control" type="text" placeholder="name" v-model="new_stock.name" required></td>
      <td><input class="form-control" type="number" placeholder="initial_price" v-model="new_stock.initial_price"></td>
      <td><input class="form-control" type="number" placeholder="current_price" v-model="new_stock.current_price"></td>
      <td><input class="form-control" type="number" placeholder="purchase_quantity" v-model="new_stock.purchase_quantity"></td>

      <td><input class="form-control" type="number" :value="new_stock.initial_price * new_stock.purchase_quantity" readonly placeholder="purchase cost"></td>
      <td><input class="form-control" type="number" :value="new_stock.current_price * new_stock.purchase_quantity" readonly placeholder="Now Gain"></td>
      <td><hr></td>

      <td><input class="my-auto" type="checkbox" :checked="new_stock.process"></td>
      <td class="d-flex">
        <button type="button" class="btn btn-success fw-semibold" v-on:click="date_flow = true">
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
        </button>

      </td>
      <td>
        <button type="button" class="btn btn-success fw-semibold" v-on:click="create_new_stock()">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </td>
    </tr>

    <tr v-show="date_flow">
      <td><hr></td>
      <td><hr></td>
      <td><hr></td>
      <td><hr></td>
      <td><hr></td>
      <td><hr></td>
      <td><input class="form-control" type="date" pattern="YYYY-MM-DD" v-model="new_date_flow.request_start_date" placeholder="request start date" required></td>
      <td><input class="form-control" type="date" pattern="YYYY-MM-DD" v-model="new_date_flow.request_end_date" placeholder="request start date" required></td>
      <td><input class="form-control" type="date" pattern="YYYY-MM-DD" v-model="new_date_flow.process_start_date" placeholder="request start date" required></td>
      <td><hr></td>

    <td class="d-flex">
      <button type="button" class="btn btn-success fw-semibold" v-on:click="date_flow = false">
        <font-awesome-icon :icon="['fas', 'calendar-plus']" />
      </button>
    </td>
    <td>
      <button type="submit" class="btn btn-danger  fw-semibold" v-on:click="date_flow = false;new_date_flow= {}">
        <font-awesome-icon :icon="['fas', 'calendar-minus']" />
      </button>
    </td>
      <td><hr></td>

    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';
import { useStore } from "vuex";
import { computed } from "vue";



export default {
  setup(){
    const store = useStore();

    const cookies = computed(() => {
      return store.getters.get_cookie;
    });
    console.log(cookies)
  return { cookies }
  },
  name: "stock",
  data() {
    return{
      // stock_list: [{"current_price":0.0,"purchase_quantity":10,"_Stock__service_id":1,"name":"EBEBK","id":3,"initial_price":46.5,"process":false,"_Stock__date_flow_id":2},{"current_price":63.95,"purchase_quantity":4,"_Stock__service_id":1,"name":"TATEN","id":2,"initial_price":22.5,"process":true,"_Stock__date_flow_id":1},{"current_price":59.4,"purchase_quantity":5,"_Stock__service_id":1,"name":"IZENR","id":1,"initial_price":19.0,"process":true,"_Stock__date_flow_id":1}]
      date_flow: false,
      stock_list: [],
      sale_service_list: [],
      new_date_flow: {},
      new_stock: {
        sale_service_id: null,
        name: null,
      }
    }
  },
  created() {
    this.get_stock_data();
  },
  computed:{

  },
  methods:{
    create_new_stock(){
      for (var newStockKey in this.new_stock) {
        console.log(newStockKey)
      }
      console.log(this.new_stock)
    },
    get_sale_service_name(id){
      for (let i = 0; i < this.sale_service_list.length; i++) {
        if (this.sale_service_list[i].id === id){
          return this.sale_service_list[i].name
        }
      }
      return 'None'
    },
    async get_stock_data() {
      try {
        var sl = await axios.get(
            process.env.API_HOST + 'stock_list/'
        );
        var sls = await axios.get(
            process.env.API_HOST + "sale_service_list/",
        );
        this.sale_service_list = sls.data;
        this.stock_list = sl.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>