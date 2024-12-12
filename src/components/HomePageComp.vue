<template>
  <div class="container custom-font" style="margin-top: 100px; margin-bottom: 100px">
    <h1 class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Lähme, püüame hetki...</h1>
    <div class="row mx-2" style="margin-top: 100px">
      <div class="col-6 ">
        <p class="lh-lg fw-lighter sometext" style="text-align: justify">
          Tere tulemast, armas inimene, minu kodulehele! Olen Tallinnas resideeruv pulmafotograaf ja
          portreefotograaf. Ilmselt jõudsid minu kodulehe, sest otsid omale fotograafi. Vaata julgelt ringi
          ning "Kontakt" lehekülje alt saad mulle otse kirjutada või "Tutvustus ja tagasiside" lehel
          tagasisidet jätta!
          <br><br>
          Olen fotograaf, kes jäädvustab piltidele värve ja armastust. Piltidelt leiab liikuvust ja emotsioone
          kui ka veidi rangemalt poseeritud hetki. Armastan inimesi ning portreede pildistamist erinevates
          keskkondades. Samuti liigun igal hooajal järjest rohkem pulmade ja armastuslugude jäädvustamise
          poole. Olen portreefotograaf, pulmafotograaf, perefotograaf, beebiootuse fotograaf - jäädvustan
          pigem oma erinevate kogemustega saadud oskuste põhjal kui siis ühte kindlat kitsast suunda. Lõpuks
          on fotografeerimisel oluline, et pildid oleksid selged ja puhtad ning täis ilusaid hetki.
          <br><br>
          Aga veelkord, vaata julgelt mu kodulehel ringi ning ootan Su imelisi pildisoove oma postkasti! :)
        </p>
      </div>

      <div class="col-3">
        <img src="../assets/20230326-_DSC1747-Edit-2.jpg" class="img-fluid mb-3" alt="">
        <img src="../assets/20211104-_DSC0366-Edit-2.jpg" class="img-fluid mb-3" alt="">
        <img src="../assets/20230326-_DSC1624-Edit-2.jpg" class="img-fluid mb-3" alt="">
      </div>
      <div class="col-3">
        <img src="../assets/20230326-_DSC1655-Edit-2.jpg" class="img-fluid mb-3" alt="">
        <img src="../assets/20230805-_DSC9409.jpg" class="img-fluid mb-3"  alt="">
        <img src="../assets/20230326-_DSC1684-Edit-2.jpg" class="img-fluid mb-3" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.custom-font {
  font-family: "Verdana",  serif;
}

.img-fluid {
  //height: 350px;
  //width: auto;
  border: 4px double #d1c7bd;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  //border-style: double;
}

.sometext{
  border: 4px double #d1c7bd;
  border-radius: 15px; /* Rounded corners */
  padding: 70px; /* Add some spacing inside the container */
  margin-left: 50px;
  margin-right: 50px;
  background-color: #f1eeea;
  background-color: rgba(241, 238, 234, 0.4); /* Add opacity (0.8) */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Subtle shadow for depth */

  display: flex; /* Flexbox for alignment */
  flex-direction: column; /* Stack children vertically */
  justify-content: space-between; /* Space between content blocks */
  align-items: center; /* Center-align content horizontally */


}
</style>