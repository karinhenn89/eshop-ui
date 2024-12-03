<template>
  <MainNavbar />
  <ProductsCompo />

</template>


<script>

import MainNavbar from "@/components/MainNavbar.vue";
import ProductsCompo from "@/components/ProductsCompo.vue";


export default {
  name: "ShoppingCart",

  components: {

    MainNavbar,
    ProductsCompo
  },
}
</script>



<style scoped>

</style>