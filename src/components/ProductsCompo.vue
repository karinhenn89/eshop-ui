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
          <!--          <button @click="updateProduct(item.productName)" class="btn btn-sm">Muuda toodet </button>-->
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
    }
  },
  mounted() {
    this.fetchProducts()
  }
}

</script>


<style>

</style>