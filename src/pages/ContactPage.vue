<template>
<MainNavbar />
  <ContactsCompo />
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ContactsCompo from "@/components/ContactsCompo.vue";

export default {
  name: "ContactPage",
  components: {
    MainNavbar,
    ContactsCompo
  },

}
</script>

<style scoped>

</style>