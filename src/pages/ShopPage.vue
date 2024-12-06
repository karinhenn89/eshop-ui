<template>
<MainNavbar />
  <ProductsCompo />
  <FooterCompo/>

</template>
<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ProductsCompo from "@/components/ProductsCompo.vue";
import FooterCompo from "@/components/FooterCompo.vue";

export default {
  name: "ShopPage",
  components: {FooterCompo, ProductsCompo, MainNavbar},
};
</script>
