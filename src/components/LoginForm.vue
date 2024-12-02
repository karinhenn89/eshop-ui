<template>
  <div>
    <!-- Login Form -->
    <form
        v-if="!loggedIn"
        @submit.prevent="login"
        class="d-flex align-items-center gap-2"
    >
      <!-- Username Input -->
      <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Username"
          class="form-control form-control-sm"
          style="width: 100px;"
      />

      <!-- Password Input -->
      <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Password"
          class="form-control form-control-sm"
          style="width: 100px;"
      />

      <!-- Log In Button -->
      <button
          class="btn btn-outline-secondary btn-sm text-nowrap"
          type="submit"
      >
        Log in
      </button>
    </form>

    <!-- Log Out Button -->
    <button
        v-if="loggedIn"
        @click="logout"
        class="btn btn-outline-secondary btn-sm text-nowrap"
    >
      Log out
    </button>

    <!-- Display Login Status -->
    <p v-if="loginError" class="text-danger">
      Invalid username or password
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '', // Bound to the input
      password: '', // Bound to the input
      loggedIn: false, // Tracks login state
      loginError: false, // Tracks if login failed
    };
  },
  methods: {
    async login() {
      try {
        const user = {
          username: this.username,
          password: this.password,
        };

        // Send login request to backend
        const response = await axios.post(
            'http://localhost:8090/api/eshop/validateUser',
            user
        );

        // Handle response
        if (response.data === true) {
          localStorage.setItem('loggedIn', true);
          this.loggedIn = true; // Update state to logged in
          this.loginError = false; // Reset error state
          alert('Logged in successfully!');
        } else {
          this.loginError = true; // Show error if invalid login
        }
      } catch (error) {
        localStorage.removeItem('loggedIn');
        console.error('Login error:', error);
        this.loginError = true; // Show error if request fails
      }
    },
    logout() {
      this.loggedIn = false; // Reset logged-in state
      this.username = ''; // Clear username
      this.password = ''; // Clear password
      alert('Logged out successfully!');
    },


  },
};
</script>
