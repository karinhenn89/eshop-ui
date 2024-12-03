<template>
  <div class="container">
    <div class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Shop</div>
  </div>


  <div>
    <table class="table">
<!--      <thead>
      <tr >
        <th >Product</th>
        <th class="text-center">Name</th>
        <th class="text-center">Description</th>
        <th class="text-center">Price</th>
        <th class="text-center">Action</th>
      </tr>
      </thead>-->
      <tbody>
      <tr v-for="item in storeProducts" :key="item">
        <td>{{ item.productName }}</td>
        <td class="text-center">{{ item.description }}</td>
        <td class="text-center">${{ item.price }}</td>
        <td class="text-center">
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
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
methods:{
  fetchProducts() {
    axios.all([
        axios.get(`${this.api}/show-all-products`).then(res => (this.storeProducts = res.data))
    ])
    },
    removeProduct(productName) {
      axios.delete(`${this.api}/remove-product/${productName}`).then(this.fetchProducts);
    },
  /*  addProduct() {
      axios.post(`${this.api}/add-product`,this.newProduct´).then(this.fetchProducts);
      this.newProduct ={productName: "", description: "", price: ""};
    }*/
  },
  mounted() {
    this.fetchProducts()
  }
}

</script>


<style>

</style>