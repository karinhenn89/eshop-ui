
<template>
<div v-if="this.userRightsId !== '1'" class="container">
  <h3>Tellimused</h3>
<div>
  <table class="table">
    <thead>
    <tr>
      <th>Tellimuse nr.</th>
      <th class="text-center">Tootenimi</th>
      <th class="text-center">Tellimuse kuupäev</th>
      <th class="text-center">Kogus</th>
      <th class="text-center">Hind</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item in settledOrders" :key="item.productName">
      <td>{{ item.newOrderNumber }}</td>
      <td>{{ item.productName }}</td>
      <td class="text-center">{{ formatDate(item.orderDate) }}</td>
      <td class="text-center">{{ item.quantity }}</td>
      <td class="text-center">€{{ item.price }}</td>
    </tr>

    </tbody>

  </table>
</div>


</div>
</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    settledApi: "http://localhost:8090/api/settled-orders",
    userRightsId: localStorage.getItem('userRightsId'),
    username: localStorage.getItem('username'),
    settledOrders: [],
  }),

  methods: {

    fetchSettledOrders() {
      axios.get(`${this.settledApi}/all-settled-orders`)
          .then(res => {
            // Retrieve the username from localStorage
            const username = localStorage.getItem('username');
            // Filter orders where the username matches
            this.settledOrders = res.data.filter(order => order.username === username);
          })
          .catch(err => console.error(err));
    },

    formatDate(dateString)
    {
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