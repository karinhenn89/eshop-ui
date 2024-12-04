<template>
<MainNavbar/>
  <AdminUsersComp/>
</template>

<script>

import MainNavbar from "@/components/MainNavbar.vue";
import AdminUsersComp from "@/components/AdminUsersComp.vue";

export default {
  name: "HomePage",

  components: {
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