<template>
  <div class="container">
    <h1 class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Registreeri kasutajaks</h1>

    <!-- Registration Form -->
    <div class="register-form mt-5 mb-5">
      <form @submit.prevent="addNewUser">
        <div class="row text-center justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="form-group mb-3">
              <label for="username">Kasutajanimi</label>
              <input v-model="newUser.username" type="text" id="username" placeholder="Kasutajanimi" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="firstName">Eesnimi</label>
              <input v-model="newUser.firstName" type="text" id="firstName" placeholder="Eesnimi" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="lastName">Perekonnanimi</label>
              <input v-model="newUser.lastName" type="text" id="lastName" placeholder="Perekonnanimi" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input v-model="newUser.email" type="email" id="email" placeholder="Email" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="password">Parool</label>
              <input v-model="newUser.password" type="password" id="password" placeholder="Parool" class="form-control" required />
            </div>
            <div class="form-group mb-3 position-relative">
              <label for="password2">Korda parool</label>
              <input v-model="newUser.password2" type="password" id="password2" placeholder="Parool" class="form-control" required />
              <span
                  v-if="passwordsMatch"
                  class="position-absolute end-0 top-50 translate-middle-y me-3 text-success"
              >
                ✔
              </span>
              <span
                  v-else
                  class="position-absolute end-0 top-50 translate-middle-y me-3 text-danger"
              >
                ✖
              </span>
            </div>

            <button type="submit" class="btn btn-outline-secondary btn-sm text-nowrap gap-2" :disabled="!passwordsMatch">
              Registreeri
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8090/api/eshop",
    newUser: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      userRightsId: 2,
    },
  }),

  computed: {
    passwordsMatch() {
      return this.newUser.password === this.newUser.password2 && this.newUser.password !== "";
    },
  },

  methods: {
    async addNewUser() {
      try {
        if (!this.passwordsMatch) {
          alert("Passwords do not match!");
          return;
        }
        await axios.post(`${this.api}/addnewuser`, this.newUser);
        alert("Kasutaja on edukalt registreeritud!");
        this.resetForm();
      } catch (error) {
        console.error("Error while adding user:", error);
        alert("Kasutaja registreerimine ebaõnnestus.");
      }
    },

    resetForm() {
      this.newUser = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        userRightsId: 2,
      };
    },
  },
};
</script>




<style scoped>
/* General Form Styling */
.register-form {
  margin-top: 50px;
  margin-bottom: 50px;
}

.register-form form .row {
  display: flex;
  justify-content: center;
}

.register-form form .col-12 {
  width: 100%;
}

.register-form form .col-md-8,
.register-form form .col-lg-6 {
  max-width: 500px; /* Limit the width for large screens */
}

/* Form Input Styling */
.form-group input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Label Styling */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Smaller Submit Button */
.register-form button {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

/* Mobile and tablet responsiveness */
@media (max-width: 768px) {
  .register-form form .col-12 {
    width: 100%;
  }
}
</style>
>