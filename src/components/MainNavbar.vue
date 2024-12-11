<template>
  <div id="navbar" class="container-fluid">
    <div  >
      <img class="img-fluid my-2 rounded" src="../assets/20221222-_DSC81782-Edit.jpg" alt="Responsive Image">
      <nav class="navbar navbar-expand-lg navbar-light bg-light w-100 navbar-custom ">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/" class="nav-link fs-3 border-end">Kodu</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fs-3 border-end">Pood</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link fs-3 ">Kontakt</router-link>
            </li>
            <li v-if="loggedIn && isAdmin" class="nav-item">
              <router-link to="/allusers" class="nav-link fs-3 border-start ">Kliendid</router-link>
            </li>
            <li v-if="loggedIn && isAdmin" class="nav-item">
              <router-link to="/allorders" class="nav-link fs-3 border-start ">Tellimused</router-link>  </li>

          </ul>
        </div>

        <!-- Conditionally display login form or user info -->
        <div v-if="!loggedIn">
          <LoginForm @login-success="onLoginSuccess" />
        </div>

        <div v-else class="d-flex align-items-center gap-2">
          <!-- Display username -->
          <router-link class="btn btn-outline-secondary btn-sm text-nowrap d-inline-block" to="/usermenu" >
            <span class="fs-6">{{ username }}</span>
          </router-link>
          <!-- Log out button -->
          <button @click="logout" id="logoutbutton" class="btn btn-outline-secondary btn-sm text-nowrap gap-2">Logi välja</button>
        </div>

        <!-- Adjusted Registreeri button -->
        <div class="d-flex align-items-center gap-2">
          <router-link
              v-if="!loggedIn"
              id="register"
              to="/addnewuser"
              class="btn btn-outline-secondary btn-sm text-nowrap d-inline-block">
            Registreeri
          </router-link>
          <router-link

              id="shoppingcart"
              to="/shoppingcart"
              class="btn btn-outline-secondary btn-sm text-nowrap d-inline-block gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg><span class="badge text-bg-secondary">{{cartItemsCount}}</span>
          </router-link>

        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import axios from "axios";

export default {
  name: "MainNavbar",
  components: { LoginForm },
  data() {
    return {
      api: "http://localhost:8090/api/cart",
      loggedIn: false, // Tracks login state
      username: "", // Username of the logged-in user
      userRightsId: "",
      cartItemsCount: 0, // Reactive cart count
    };
  },
  methods: {
    fetchCartItemsCount(){
      axios.get(`${this.api}/cart-items-count`).then(res => (this.cartItemsCount = res.data));
      },
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
      localStorage.removeItem('userRightsId')
      // location.reload();
      this.$router.push({ name: 'Home2' });
    },
  },

  computed: {
    isAdmin() {
      return this.userRightsId === '1';
    },
  },

  mounted() {
    this.fetchCartItemsCount();


    // Check localStorage for stored login state and username
    if (localStorage.getItem('loggedIn')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
      this.userRightsId = localStorage.getItem("userRightsId")

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
#navbar{
  border-collapse: collapse;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow */
  background-color: #d1c7bd;
  color: #cccccc;
}
.navbar-custom {
  background-color: #d1c7bd !important;

}

input {
  background-color: #42b983;
}

</style>
