<template>
  <div class="container">
    <div class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Shop</div>
  </div>


  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Foto pakett</th>
        <th class="text-center">Kirjeldus</th>
        <th class="text-center">Hind</th>
        <th class="text-center"></th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in storeProducts" :key="item.productName">
        <td>{{ item.productName }}</td>
        <td class="text-center">{{ item.description }}</td>
        <td class="text-center">${{ item.price }}</td>
        <td class="text-center">
          <button @click="removeProduct(item.productName)" class="btn btn-danger btn-sm">Kustuta toode</button>
          <button @click="addToCart(item)" class="btn btn-sm">Lisa ostukorvi</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="input-group">
      <form @submit.prevent="addProduct">
        <div class="row text-center">
          <input v-model="newProduct.productName" placeholder="Toote nimi" class=" form-control col" required/>
          <input v-model="newProduct.price" placeholder="Hind" class=" form-control col" required/>
          <div class="input-group">
            <span class="input-group-text">Toote kirjeldus</span>
            <textarea v-model="newProduct.description" class="form-control" aria-label="With textarea"></textarea>

          </div>
          <button @click="addProduct()" class="btn btn-secondary btn-sm">Add new</button>
        </div>
      </form>
    </div>


    <br><br><br>


  </div>
</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8090/api/admin",
    cartApi: "http://localhost:8090/api/cart",
    newProduct: {productName: "", description: "", price: ""},
    storeProducts: []
  }),
  methods: {
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
      this.newProduct = {productName: "", description: "", price: ""};
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
            alert(`${item.productName} has been added to the cart!`);
          })
          .catch((err) => {
            console.error("Error adding to cart:", err);
          });
    }
  },


mounted()
{
  this.fetchProducts()
}
}

</script>


<style>

</style>