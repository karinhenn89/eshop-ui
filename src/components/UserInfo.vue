<script>


import {
  fetchUserName
} from "@/api/users"


export default {
  data(){
    return {
      username:"",
      name: "",
      email: ""
    }
  },

  methods: {
    async getUserInfo() {
      try {
        // Fetch user data (assumes fetchUserName is a promise-based API call)
        const result = await fetchUserName(this.username);
        if (result && result.name) {
          this.name = result.name; // Update name in state
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  },

  mounted() {
    // Check localStorage for stored login state and username
    if (localStorage.getItem("loggedIn")) {
      this.username = localStorage.getItem("username"); // Retrieve stored username
      this.getUserInfo(); // Fetch additional user info
    }
  },
};



</script>

<template>
<div>
  <ul>
    <li> Username : {{ username }}</li>
    <li> Name : {{ name }}</li>
  </ul>
</div>
</template>

<style scoped>

</style>