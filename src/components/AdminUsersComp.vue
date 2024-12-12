<template>
<div class="container " style="margin-top: 100px; margin-bottom: 100px">
  <div v-if="userRightsId ==='1'"  >
    <div>
      <h1 class="pt-5 ">Kasutajate nimekiri</h1>
    </div>
    <div>
      <table class="rounded-shadow-table">
        <thead >
        <tr>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Kasutajanimi</th>
          <th>Email</th>
          <th>Admin</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in storeUsers" :key="user.email">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{user.username}}</td>
          <td>{{ user.email }}</td>
          <td v-if="user.userRightsId === 1">Jah</td>
          <td v-else>Ei</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";



export default {
  data: () => ({
    api: "http://localhost:8090/api/eshop",
    storeUsers: [], // Correct property name
    userRightsId: localStorage.getItem('userRightsId')
  }),

  methods: {
    async fetchAllUsers() {
      try {
        const response = await axios.get(`${this.api}/allusers`);
        this.storeUsers = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

//     getUserStatus() {
//       let isAdmin = false
//       console.log (this.userRightsId)
//       if (this.userRightsId === '1') {
//         // eslint-disable-next-line no-unused-vars
//         isAdmin = true
//         console.log (this.userRightsId)
//       }
//       console.log (this.userRightsId)
// return isAdmin
//     }


  },

  mounted() {
    this.fetchAllUsers();
    console.log(this.userRightsId)

  },
};
</script>

<style>
/* Add any styles if necessary */
</style>
