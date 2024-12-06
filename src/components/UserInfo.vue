<script>





export default {
  data(){
    return {
      username:"",
      firstName: "",
      email: "",
      lastName:""
    }
  },

  methods: {
    // updateUserInfo() {
    //   if (localStorage.getItem("loggedIn") === "true") {
    //     // Populate data when user is logged in
    //     this.username = localStorage.getItem("username");
    //     this.email = localStorage.getItem("email");
    //     this.firstName = localStorage.getItem("firstName");
    //     this.lastName = localStorage.getItem("lastName");
    //   } else {
    //     // Clear data when user is logged out
    //     this.username = "";
    //     this.email = "";
    //     this.firstName = "";
    //     this.lastName = "";
    //   }
    // },

    logout() {
      this.loggedIn = false;
      this.username = "";
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('userRightsId')
      alert("Logged out successfully!");
    },

  },

  mounted() {


    // Check localStorage for stored login state and username
    if (localStorage.getItem("loggedIn")) {
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
    } else {
      this.loggedIn = false;
      this.username = "";
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('userRightsId')

    }

  },
};



</script>

<template>
  <div>
    <ul>
      <li> Username : {{ username }}</li>
      <li> First Name : {{ firstName }}</li>
      <li> Last Name : {{ lastName }}</li>
      <li> Email: {{ email }}</li>
    </ul>
  </div>
</template>

<style>

</style>