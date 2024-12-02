<template>
  <div class="container ">
    <div class="">
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
          </ul>
        </div>
<LoginForm/>
      </nav>
    </div>

  </div >

</template>

<script>

import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "MainNavbar",
  components: {LoginForm},
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