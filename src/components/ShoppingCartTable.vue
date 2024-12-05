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
    <!-- Single button to add orders from cart and show alert -->
    <button @click="addOrdersAndShowAlert" class="btn btn-outline-success">
      Kinnita tellimus ja kuva tellimused
    </button>
  </div>




</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8090/api/cart",
    ordersApi: "http://localhost:8090/api/settled-orders",
    newProduct: {productName: "", price: 0, quantity: 0},
    storeCart: [],
    quantity: 0,
    price: 0,
    cartTotal: 0,
    cartItemsCount: 0,
    orderNumber: 0,
    orderDate: 0
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
    },
    addOrdersAndShowAlert() {
      // Add orders from cart to settled orders and fetch settled orders
      axios
          .post(`${this.ordersApi}/add-from-cart`) // Call backend method
          .then(() => {
            // Fetch settled orders after adding
            axios
                .get(`${this.ordersApi}/all-settled-orders`) // Ensure this endpoint returns settled orders
                .then((response) => {
                  const orders = response.data;
                  let orderDetails = "Kinnitatud tellimus:\n\n";
                  orders.forEach((order) => {
                    orderDetails += `Tellimuse number: ${order.orderNumber}\n`;
                    orderDetails += `Kuupäev: ${new Date(order.orderDate).toLocaleString()}\n`;
                    orderDetails += `Toode: ${order.productName}\n`;
                    orderDetails += `Kogus: ${order.quantity}\n`;
                    orderDetails += `Hind: €${order.price.toFixed(2)}\n\n`;
                  });
                  alert(orderDetails); // Display the orders in an alert
                  this.fetchCart(); // Refresh the cart
                })
                .catch((err) => {
                  console.error("Error fetching settled orders:", err);
                  alert("Kinnitatud tellimuste laadimine ebaõnnestus.");
                });
          })
          .catch((err) => {
            console.error("Error adding orders from cart:", err);
            alert("Tellimuste kinnitamine ebaõnnestus.");
          });
    }
  },
  mounted() {
    this.fetchCart()
  },
}

</script>

<style>

</style>