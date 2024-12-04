<template>
  <div>
    <div>
      <h1>Kasutajate nimekiri</h1>
    </div>
    <div>
      <table class="table">
        <thead>
        <tr>
          <th>Eesnimi</th>
          <th>Perekonnanimi</th>
          <th>Email</th>
          <th>Admin</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in storeUsers" :key="user.email">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td v-if="user.userRightsId === 1">Jah</td>
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
    api: "http://localhost:8090/api/eshop",
    storeUsers: [], // Correct property name
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
  },
};
</script>

<style>
/* Add any styles if necessary */
</style>
