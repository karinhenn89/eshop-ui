<template>
  <div class="container">
    <h1 class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Pood</h1>

    <div class="container" style="max-width: 1250px">
      <!-- Shop Items -->
      <div v-for="(item, index) in storeProducts" :key="item.productName" class="row mx-0 my-1 py-5 align-items-end">
        <!-- Product Image on the Left or Right based on index -->
        <div :class="index % 2 === 0 ? 'col-md-6' : 'col-md-6 order-md-2'">
          <img :src="item.image" alt="Product Image" class="img-fluid " />
        </div>

        <!-- Product Info on the Right or Left -->

        <div :class="index % 2 === 0 ? 'col-md-6' : 'col-md-6 order-md-1' ">

          <div class="product-details">
          <h3>{{ item.productName }}</h3>
          <h4>€{{ item.price }}</h4>
          <p>{{ item.description }}</p>
          <div class="text-center">
            <button v-if="isAdmin" @click="removeProduct(item.productName)" class="btn btn-danger border-0 btn-sm" style ="background-color: #a38181;">Kustuta
              toode
            </button>
            <button v-if="!isAdmin && userRightsId !== null" @click="addToCart(item)"
                    class="btn btn-outline-secondary btn-sm text-nowrap gap-2">Lisa ostukorvi
            </button>
            <div class="border-top mt-4 pt-4" v-if="userRightsId === null">
              Logi sisse või
              <router-link class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                           to="/addnewuser">registreeri kasutajaks
              </router-link>
              , et osta
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Section (Admin only) -->
    <div v-if="isAdmin" class="add-product-form mt-5 mb-5">
      <form @submit.prevent="addProduct">
        <div class="row text-center justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <input v-model="newProduct.productName" placeholder="Toote nimi" class="form-control mb-3" required />
            <input v-model="newProduct.price" placeholder="Hind" class="form-control mb-3" required />
            <input v-model="newProduct.image" placeholder="Foto" class="form-control mb-3" />
            <div class="input-group mb-3">
              <span class="input-group-text">Toote kirjeldus</span>
              <textarea v-model="newProduct.description" class="form-control" aria-label="With textarea"></textarea>
            </div>
            <button @click="addProduct" class="btn btn-secondary btn-sm mt-3">Add new</button>
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
    api: "http://localhost:8090/api/admin",
    cartApi: "http://localhost:8090/api/cart",
    newProduct: {productName: "", description: "", price: ""},
    username: localStorage.getItem('username') || null,
    userRightsId: localStorage.getItem('userRightsId') || null,
    storeProducts: [],
    image: null,
  }),
  methods: {

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file; // Store the file in the product object
      }
    },
    fetchProducts() {
      axios.all([
        axios.get(`${this.api}/show-all-products`).then(res => (this.storeProducts = res.data))
      ])
    },
    removeProduct(productName) {
      axios.delete(`${this.api}/remove-product/${productName}`).then(this.fetchProducts);
    },
    addProduct() {
      axios.post(`${this.api}/add-product`, this.newProduct).then(this.fetchProducts);
      this.newProduct = {productName: "", description: "", price: "", image:""};
    },

    updateProduct(productName) {
      axios.put(`${this.api}/update-product-details/${productName}`).then(this.fetchProducts)
    },

    addToCart(item) {
      const productToCart = {
        productName: item.productName,
        price: item.price,
        quantity: 1 // Default to adding 1 quantity to the cart


      };

      axios
          .post(`${this.cartApi}/add-to-cart`, productToCart)
          .then(() => {
            // alert(`${item.productName} has been added to the cart!`);
          })
          .catch((err) => {
            console.error("Error adding to cart:", err);
          });
      // Then trigger a full page reload
      window.location.reload();
    }
  },
  computed: {
    isAdmin() {
      return this.userRightsId === '1';
    },
  },


mounted() {
  console.log(this.isAdmin)
  this.fetchProducts()
}
}

</script>


<style scoped>
/* General Product Card Styling */
.img-thumbnail {
  max-height: 400px;
  object-fit: cover;
}

/* Add Product Form Styling */
.add-product-form {
  margin-top: 50px; /* More space at the top */
  margin-bottom: 50px; /* More space at the bottom */
}

/* Center the form */
.add-product-form form .row {
  display: flex;
  justify-content: center;
}

.add-product-form form .col-12 {
  width: 100%;
}

.add-product-form form .col-md-8,
.add-product-form form .col-lg-6 {
  max-width: 500px; /* Limit the width for large screens */
}

/* Styling for the "Add new" button */
.add-product-form button {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}
.img-thumbnail {
  margin-bottom: 0;
}

.img-fluid {
  height: 350px;
  width: auto;
  border: 4px double #d1c7bd;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  //border-style: double;
}


/* Mobile and tablet responsiveness */
@media (max-width: 768px) {
  .add-product-form form .col-12 {
    width: 100%;
  }
  .row.align-items-center > div {
    padding-left: 1px;
    padding-right: 1px;
  }
}
</style>