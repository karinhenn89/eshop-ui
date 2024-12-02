<template>
  <div id="app">
    <!-- The HomePage is rendered here, which includes MainNavbar -->
    <HomePage />
  </div>
</template>

<script>
import HomePage from "@/pages/HomePage.vue"; // Import the HomePage component

export default {
  name: 'App',
  components: {
    HomePage
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
