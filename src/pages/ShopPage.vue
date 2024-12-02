<template>
<MainNavbar />
  <ProductsCompo />


</template>
<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ProductsCompo from "@/components/ProductsCompo.vue";

export default {
  name: "ShopPage",
  components: {ProductsCompo, MainNavbar},
};
</script>
