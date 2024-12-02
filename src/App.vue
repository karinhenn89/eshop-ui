<template>
  <div id="app">
    <!-- The HomePage is rendered here, which includes MainNavbar -->
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

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
