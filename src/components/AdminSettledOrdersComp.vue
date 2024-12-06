<template>
  <div class="container">
    <h1> Kinnitatud tellimused </h1>
</div>



  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Tellimuse nr.</th>
        <th class="text-center">Kasutajanimi</th>
        <th class="text-center">E-mail</th>
        <th class="text-center">Eesnimi</th>
        <th class="text-center">Perekonnanimi</th>
        <th class="text-center">Tootenimi</th>
        <th class="text-center">Tellimuse kuupäev</th>
        <th class="text-center">Kogus</th>
        <th class="text-center">Hind</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in settledOrders" :key="item.productName">
        <td>{{ item.newOrderNumber }}</td>

        <td>{{item.username}}</td>
        <td>{{    }}</td>
        <td>{{    }}</td>
        <td>{{    }}</td>
        <td>{{ item.productName }}</td>
        <td class="text-center">{{ formatDate(item.orderDate) }}</td>
        <td class="text-center">{{ item.quantity }}</td>
        <td class="text-center">€{{ item.price }}</td>
        <td class="text-center">
        </td>
      </tr>
      </tbody>
    </table>
  </div>


  <br><br><br><br><br><br><br>
</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    settledApi: "http://localhost:8090/api/settled-orders",
    settledOrders: [],

  }),

  computed: {
    groupedOrders() {
      const grouped = this.settledOrders.reduce((acc, order) => {
        if (!acc[order.newOrderNumber]) {
          acc[order.newOrderNumber] = {
            newOrderNumber: order.newOrderNumber,
            orderDate: order.orderDate,
            products: [],
          };
        }
        acc[order.newOrderNumber].products.push({
          productName: order.productName,
          price: order.price,
          quantity: order.quantity,
        });
        return acc;
      }, {});
      return Object.values(grouped); // Convert object to array for rendering
    },
  },


  methods: {
    fetchSettledOrders(){
      axios.get(`${this.settledApi}/all-settled-orders`).then(res => this.settledOrders=res.data)
    },
    formatDate(dateString) {
      if (!dateString) return "Unknown Date"; // Fallback for empty dates
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-GB', { // Use 'en-GB' for DD/MM/YYYY
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format. Remove this line for 12-hour format.
      }).format(date);
    },

  },
  mounted() {
    this.fetchSettledOrders();

    if (localStorage.getItem("loggedIn")) {
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
    }  if (localStorage.getItem("loggedIn")) {
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
    }
  }

}

</script>

<style scoped>

</style>
<script setup lang=" ts
    ">
    </script>