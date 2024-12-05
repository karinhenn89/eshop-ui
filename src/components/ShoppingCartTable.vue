<template>
  <div class="container">
    <div class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Ostukorv</div>
  </div>

  <table class="table">
    <thead>
    <tr>
      <th>Toode</th>
      <th class="text-center">Kogus</th>
      <th class="text-center">Hind</th>
      <th class="text-center"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in storeCart" :key="item.productName">
      <td>{{ item.productName }}</td>
      <td class="text-center">{{ item.quantity }}</td>
      <td class="text-center">${{ item.price }}</td>
      <td class="text-center">
        <button @click="removeProduct(item.productName)">Kustuta ostukorvist</button>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <h5 class="mt-4">Ostukorvi summa kokku: €{{cartTotal.toFixed(2) }}</h5>
    <h5 class="mt-4">Ostukorvis on  {{cartItemsCount }} toodet</h5>
  </div>


</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8090/api/cart",
    newProduct: {productName: "", price: 0, quantity: 0},
    storeCart: [],
    quantity: 0,
    price: 0,
    cartTotal: 0,
    cartItemsCount: 0
  }),
  methods: {
    fetchCart() {
      axios.all([
        axios.get(`${this.api}/shoppingcart`).then(res => (this.storeCart = res.data)),
        axios.get(`${this.api}/calculate-cart-total`).then(res => (this.cartTotal = res.data)),
        axios.get(`${this.api}/cart-items-count`).then(res => (this.cartItemsCount = res.data))
      ])
    },
    removeProduct(productName){
      axios.delete(`${this.api}/remove-product/${productName}`).then(this.fetchCart);
    }


  },
  mounted() {
    this.fetchCart()
  },
}

</script>

<style>

</style>