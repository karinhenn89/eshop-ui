<template>
  <MainNavbar />
  <HomePageComp />

</template>

<script>


import MainNavbar from "@/components/MainNavbar.vue";
import HomePageComp from "@/components/HomePageComp.vue";

export default {
  name: "HomePage",

  components: {

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