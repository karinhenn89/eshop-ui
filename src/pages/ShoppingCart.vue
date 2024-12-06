<template>
  <MainNavbar />
  <ShoppingCartTable />
  <FooterCompo/>


</template>


<script>

import MainNavbar from "@/components/MainNavbar.vue";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";
import FooterCompo from "@/components/FooterCompo.vue";



export default {
  name: "ShoppingCart",


  components: {
    FooterCompo,


    MainNavbar,
    ShoppingCartTable
  },
}
</script>



<style scoped>

</style>