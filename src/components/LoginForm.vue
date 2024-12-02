<template>
  <div>
    <!-- Login Form -->
    <form
        v-if="!loggedIn"
        @submit.prevent="login"
        class="d-flex align-items-center gap-2"
    >
      <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Username"
          class="form-control form-control-sm"
          style="width: 100px;"
      />
      <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Password"
          class="form-control form-control-sm"
          style="width: 100px;"
      />
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
      username: '',
      password: '',
      loggedIn: false,
      loginError: false,
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
        const response = await axios.post('http://localhost:8090/api/eshop/validateUser', user);

        // Handle response
        if (response.data === true) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', true); // Persist login state
          localStorage.setItem('username', this.username); // Persist username
          this.$emit('login-success', this.username); // Emit the username to parent component
        } else {
          this.loginError = true; // Show error if login fails
        }
      } catch (error) {
        console.error('Login error:', error);
        this.loginError = true;
      }
    },
    logout() {
      this.loggedIn = false;
      this.username = '';
      this.password = '';
      this.$emit('login-success', null); // Notify the parent component to reset the state
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
    },
  },
};
</script>
