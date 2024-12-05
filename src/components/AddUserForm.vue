<template>
<div >
  <h1>Registreeri kasutajaks</h1>


  <form @submit.prevent="addNewUser" >
    <div class="form-group row">
  <label> Kasutajanimi
    <input v-model="newUser.username" type="text" placeholder="Kasutajanimi">
  </label>
      <label> Eesnimi
        <input v-model="newUser.firstName" type="text" placeholder="Eesnimi">
      </label>
  <label> Perekonnanimi
    <input v-model="newUser.lastName" type="text" placeholder="Perekonnanimi">
  </label>
  <label> Email
    <input v-model="newUser.email" type="text" placeholder="Email">
  </label>
<!--  <label> Parool-->
<!--    <input type="password" placeholder="Parool">-->
<!--  </label>-->
  <label> Korda parool
    <input v-model="newUser.password" type="password" placeholder="Parool">
  </label>

  <button type="submit" class="btn btn-primary mb-2">Registreeri</button>

    </div>
  </form>

</div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8090/api/eshop",
    newUser: {username:"", firstName:"", lastName:"", email:"", userRightsId:2}

  }),

  methods:{
    async addNewUser() {
      try {
        await axios.post(`${this.api}/addnewuser`, this.newUser);
        alert("Kasutaja on edukalt registreeritud!");
        this.resetForm();
      } catch (error) {
        console.error("Error while adding user:", error);
        alert("Kasutaja registreerimine ebaõnnestus.");
      }
    },

    // checkPassword (){
    //
    // },

    resetForm() {
      this.newUser = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userRightsId: 2
      };
    }

  }

}

</script>



<style scoped>

</style>