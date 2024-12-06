<template>
  <footer class="bg-light text-dark py-4 mt-auto">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <!-- Quick Links -->
        <div class="col-md-6 mb-3 d-flex justify-content-start">

          <nav>
            <router-link to="/" class="text-decoration-none text-dark mx-2">Kodu</router-link>
            <router-link to="/shop" class="text-decoration-none text-dark mx-2">Pood</router-link>
            <router-link to="/contact" class="text-decoration-none text-dark mx-2">Kontakt</router-link>
          </nav>
        </div>

        <!-- Contact Info -->
        <div class="col-md-6 mb-3 text-end">

          <p class="mb-1">
            <i class="bi bi-envelope"></i> info@epood.ee
          </p>
          <p class="mb-1">
            <i class="bi bi-telephone"></i> +372 123 4567
          </p>
          <p>
            <i class="bi bi-geo-alt"></i> Tallinn, Eesti
          </p>
          <!-- Social Media Links -->
          <div class="d-flex justify-content-end gap-3">
            <a href="#" class="text-dark">
              <i class="bi bi-facebook fs-4"></i>
            </a>
            <a href="#" class="text-dark">
              <i class="bi bi-instagram fs-4"></i>
            </a>
            <a href="#" class="text-dark">
              <i class="bi bi-twitter fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid #eaeaea;
}
footer a:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
