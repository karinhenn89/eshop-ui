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
              <a class="nav-link " href="">Home <span class="visually-hidden">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="">Contact</a>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <form class="d-flex">
            <button class="btn btn-outline-secondary" type="submit">Log in</button>
            <button class="btn btn-outline-secondary" type="submit">Register</button>
            <button class="btn btn-outline-secondary" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
              </svg>
              <span class="badge text-bg-secondary">4</span>
            </button>
          </form>
        </div>
      </nav>
    </div>

  </div >

</template>

<script>
export default {
  name: "MainNavbar",
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