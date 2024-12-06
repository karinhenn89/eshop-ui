<template>
  <MainNavbar />
  <HomePageComp />
  <FooterCompo/>

</template>

<script>


import MainNavbar from "@/components/MainNavbar.vue";
import HomePageComp from "@/components/HomePageComp.vue";
import FooterCompo from "@/components/FooterCompo.vue";

export default {
  name: "HomePage",

  components: {
    FooterCompo,

    MainNavbar,
    HomePageComp
  },
  mounted() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  },

}
</script>



<style scoped>


</style>