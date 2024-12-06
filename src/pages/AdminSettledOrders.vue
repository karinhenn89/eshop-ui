<template>
  <MainNavbar/>
  <AdminSettledOrdersComp/>
  <FooterCompo/>
</template>

<script>

import MainNavbar from "@/components/MainNavbar.vue";
import AdminSettledOrdersComp from "@/components/AdminSettledOrdersComp.vue";
import FooterCompo from "@/components/FooterCompo.vue";
export default {
  name: "HomePage",

  components: {
    FooterCompo,
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