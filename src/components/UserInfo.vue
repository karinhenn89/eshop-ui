<template>
  <div class="container mt-5">
    <div class="row mx-2">
      <div class="col-6">
        <ul class="list-unstyled lh-lg">
          <li>Username: {{ username }}</li>
          <li>First Name: {{ firstName }}</li>
          <li>Last Name: {{ lastName }}</li>
          <li>Email: {{ email }}</li>
        </ul>
        <button  class="btn btn-outline-secondary btn-sm text-nowrap gap-2" @click="toggleForm">Muuda andmeid</button>
      </div>



      <div class="col-6 register-form my-5 py-5">

        <form v-if="isFormVisible"  @submit.prevent="changeUser" >
          <input
              v-model="newInfo.firstName"
              type="text"
              placeholder="Update First Name"
              class="form-control"
          />
          <input
              v-model="newInfo.lastName"
              type="text"
              placeholder="Update Last Name"
              class="form-control"
          />
          <input
              v-model="newInfo.email"
              type="text"
              placeholder="Update Email"
              class="form-control"
          />

          <button class="btn btn-outline-secondary btn-sm text-nowrap" type="submit">OK</button>

        </form>
      </div>
    </div>


  </div>

</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      isFormVisible: false,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      api: "http://localhost:8090/api/eshop",
      newInfo: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },

  methods: {
    toggleForm() {
      this.isFormVisible = !this.isFormVisible; // Toggle form visibility
    },

    async changeUser() {
      try {
        const response = await axios.put(
            `${this.api}/changeuser/${this.username}`,
            this.newInfo
        );
        // Update the displayed information with the new values
        this.firstName = this.newInfo.firstName;
        this.lastName = this.newInfo.lastName;
        this.email = this.newInfo.email;
        localStorage.setItem("firstName", this.firstName);
        localStorage.setItem("lastName", this.lastName);
        localStorage.setItem("email", this.email);

        console.log("User updated successfully", response.data);
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    },
  },

  mounted() {

    // Check localStorage for stored login state and username
    if (localStorage.getItem("loggedIn")) {
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");

      // Pre-fill newInfo object for the form
      this.newInfo.firstName = this.firstName;
      this.newInfo.lastName = this.lastName;
      this.newInfo.email = this.email;
    } else {
      this.username = "";
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    }
  },
};
</script>


<style>

</style>
