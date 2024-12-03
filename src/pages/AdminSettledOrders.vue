<template>
  <MainNavbar/>
  <AdminSettledOrdersComp/>
</template>

<script>

import MainNavbar from "@/components/MainNavbar.vue";
import AdminSettledOrdersComp from "@/components/AdminSettledOrdersComp.vue";
export default {
  name: "HomePage",

  components: {
    AdminSettledOrdersComp,

    MainNavbar,

  },
  mounted() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  },

}

</script>


<style scoped>

</style>