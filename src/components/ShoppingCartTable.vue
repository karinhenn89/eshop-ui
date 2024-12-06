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
      <td class="text-center">€{{ item.price }}</td>
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
      Kinnita tellimus ja kuva tellimus
    </button>
  </div>

  <div v-if="!isUser" class="input-group mb-3">
    <form action="">
      <label for="firstName">Eesnimi</label>
      <input type="text" id="firstName" v-model="firstName">
      <label for="lastName">Perekonnanimi</label>
      <input type="text" id="lastName" v-model="lastName">
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="email">

    </form>
  </div>


  <br><br><br><br><br><br><br><br>
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
    orderDate: 0,
    newOrderNumber: 0,
    username:null,
    firstName: "",
    email: "",
    lastName:"",
    userRightsId: localStorage.getItem('userRightsId') || null,


  }),
  methods: {
    fetchCart() {
      axios.all([
        axios.get(`${this.api}/shoppingcart`).then(res => (this.storeCart = res.data)),
        axios.get(`${this.api}/calculate-cart-total`).then(res => (this.cartTotal = res.data)),

        axios.get(`${this.api}/cart-items-count`).then(res => {
          this.cartItemsCount = res.data;
          localStorage.setItem("cartItemsCount", res.data);
          console.log(this.cartItemsCount);
        }),
      ]);

    },
    removeProduct(productName){
      axios.delete(`${this.api}/remove-product/${productName}`).then(this.fetchCart);
      location.reload();
    },
    addOrdersAndShowAlert() {
      this.getUserInfo()
      const payload = {
        username: this.username || localStorage.getItem('username'), // Use the current or stored username
      };
      axios
          .post(`${this.ordersApi}/add-from-cart`, payload) // Move items to settled orders
          .then(() => {
            // Fetch last settled orders
            axios
                .get(`${this.ordersApi}/last-settled-order`)
                .then(response => {
                  const lastOrders = response.data;
                  if (lastOrders && lastOrders.length > 0) {
                    let orderDetails = "Kinnitatud tellimus:\n\n";
                    lastOrders.forEach(order => {
                      orderDetails += `Tellimuse number: ${order.newOrderNumber}\n`;
                      orderDetails += `Kuupäev: ${new Date(order.orderDate).toLocaleString()}\n`;
                      orderDetails += `Toode: ${order.productName}\n`;
                      orderDetails += `Kogus: ${order.quantity}\n`;
                      orderDetails += `Hind: €€{order.price.toFixed(2)}\n\n`;
                    });
                    alert(orderDetails); // Show alert with order details
                  } else {
                    alert("No settled orders found.");
                  }
                  this.deleteCart(); // Clear the cart after processing orders
                })
                .catch(err => {
                  console.error("Error fetching last settled orders:", err);
                  alert("Kinnitatud tellimuste laadimine ebaõnnestus.");
                });
          })
          .catch(err => {
            console.error("Error adding orders from cart:", err);
            alert("Tellimuste kinnitamine ebaõnnestus.");
          });
    },
    deleteCart() {
      axios
          .delete(`${this.ordersApi}/delete-from-cart`)
          .then(this.fetchCart)
          .catch(err => console.error("Error clearing cart:", err));
    },

    getUserInfo() {
      if (localStorage.getItem('loggedIn') !== null) {
        this.firstName = localStorage.getItem('firstName')
        this.lastName = localStorage.getItem('lastName')
        this.email = localStorage.getItem('email')
        this.username = localStorage.getItem('username')

      } else {
        console.log("The user is not logged in.");
      }
      console.log( this.firstName + " " + this.lastName + " " + this.email + this.username)
    },

  },

  computed: {
    isUser() {
      return this.userRightsId === '2';
    },
  },
  mounted() {
    this.fetchCart()
  },
}

</script>

<style>

</style>