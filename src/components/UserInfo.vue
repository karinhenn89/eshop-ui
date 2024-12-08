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
  <div class="container mt-5" >
    <div class="row mx-2">
  <div class="col-6">
    <ul class="list-unstyled lh-lg">
      <li> Username : {{ username }}</li>
      <li> First Name : {{ firstName }}</li>
      <li> Last Name : {{ lastName }}</li>
      <li> Email: {{ email }}</li>
    </ul>
  </div>
    <div class="col-6 register-form  mb-5">
      <form @submit.prevent="">
      <input type="text" id="newname" placeholder="Muuda nimi" class="form-control">
      <input type="text" id="newlastname" placeholder="Muuda perekonnanimi" class="form-control">
      <input type="text" id="newemail" placeholder="Muuda e-mail" class="form-control">
      <br>
      <button class="btn btn-primary btn-sm " type="submit">OK</button>
      </form>
    </div>

  </div>
  </div>
</template>

<style>

</style>