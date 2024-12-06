<template>
<MainNavbar />
  <ContactsCompo />
  <FooterCompo/>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ContactsCompo from "@/components/ContactsCompo.vue";
import FooterCompo from "@/components/FooterCompo.vue";

export default {
  name: "ContactPage",
  components: {
    FooterCompo,
    MainNavbar,
    ContactsCompo
  },

}
</script>

<style scoped>

</style>