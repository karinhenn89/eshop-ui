<template>
  <MainNavbar />
  <ShoppingCartTable />


</template>


<script>

import MainNavbar from "@/components/MainNavbar.vue";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";



export default {
  name: "ShoppingCart",


  components: {


    MainNavbar,
    ShoppingCartTable
  },
}
</script>



<style scoped>

</style>