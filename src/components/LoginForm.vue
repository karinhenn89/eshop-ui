<template>
  <div>
    <form
        v-if="!loggedIn"
        @submit.prevent="login"
        class="d-flex align-items-center m-lg-2 "
    >
      <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Username"
          class="form-control form-control-sm "
          style="width: 100px; background-color:#F1ede6 "

      />
      <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Password"
          class="form-control form-control-sm m-lg-2"
          style="width: 100px; background-color:#F1ede6 "
      />
      <button
          class="btn btn-outline-secondary btn-sm text-nowrap"
          type="submit"
          id="loginbutton"
      >
        Logi sisse
      </button>
    </form>


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

        const response = await axios.post('http://localhost:8090/login', user);
        if (response.status === 200) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', true); // Persist login state
          localStorage.setItem('username', this.username); // Persist username
          localStorage.setItem('firstName', response.data.firstName); // Persist username
          localStorage.setItem('lastName', response.data.lastName); // Persist username
          localStorage.setItem('email', response.data.email); // Persist username
          localStorage.setItem('userRightsId', response.data.userRightsId); // Persist username
          this.$emit('login-success', this.username);// Emit the username to parent component

          window.location.reload();
          this.$router.push({ name: 'Home2' });

        } else {
          this.loginError = true; // Show error if login fails
        }
      } catch (error) {
        console.error('Login error:', error);
        this.loginError = true;
      }
    },

  },
};
</script>
