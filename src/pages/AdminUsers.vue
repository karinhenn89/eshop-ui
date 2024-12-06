<template>
<MainNavbar/>
  <AdminUsersComp/>
  <FooterCompo/>
</template>

<script>

import MainNavbar from "@/components/MainNavbar.vue";
import AdminUsersComp from "@/components/AdminUsersComp.vue";
import FooterCompo from "@/components/FooterCompo.vue";

export default {
  name: "HomePage",

  components: {
    FooterCompo,
    AdminUsersComp,

    MainNavbar,


  },
  mounted() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  },

}


</script>



<style scoped>

</style>