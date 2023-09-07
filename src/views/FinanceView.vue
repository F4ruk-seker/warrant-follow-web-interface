<template>
  <Header />
  <section class="border rounded py-2 px-3">
    <stock />
  </section>
</template>

<script>
import Stock from "@/components/stock.vue";
import Header from "@/components/Header.vue";

export default {
  name: "FinanceView",
  components: {Header, Stock}
}
</script>

<style scoped>

</style>