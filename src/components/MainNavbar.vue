<template>
  <div class="container">
    <div>
      <img class="img-fluid" src="../assets/20221222-_DSC81782-Edit.jpg" alt="Responsive Image">
      <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse display-5" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/" class="nav-link fs-2">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fs-2">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link fs-2">Contact</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link to="/adminproducts" class="nav-link fs-2">Admin-Products</router-link>
            </li>

          </ul>
        </div>

        <!-- Conditionally display login form or user info -->
        <div v-if="!loggedIn">
          <LoginForm @login-success="onLoginSuccess" />
        </div>

        <div v-else class="d-flex align-items-center gap-2">
          <!-- Display username -->
          <router-link to="/usermenu" class="text-decoration-none">
            <span class="fs-6">{{ username }}</span>
          </router-link>
          <!-- Log out button -->
          <button @click="logout" id="logoutbutton" class="btn btn-outline-secondary btn-sm text-nowrap">Log out</button>
        </div>


      </nav>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "MainNavbar",
  components: { LoginForm },
  data() {
    return {
      loggedIn: false, // Tracks login state
      username: "", // Username of the logged-in user
    };
  },
  methods: {
    // This method will be triggered when the login is successful
    onLoginSuccess(username) {
      this.loggedIn = true;
      this.username = username; // Store the username of the logged-in user
      localStorage.setItem('loggedIn', true); // Persist the login state
      localStorage.setItem('username', username); // Persist username
    },
    logout() {
      this.loggedIn = false;
      this.username = "";
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      alert("Logged out successfully!");
    }
  },
  mounted() {
    // Check localStorage for stored login state and username
    if (localStorage.getItem('loggedIn')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
    }
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.flex-container img {
  max-width: 100%;
  height: auto;
}
</style>
