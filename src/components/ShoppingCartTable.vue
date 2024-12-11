<template>
  <div  class="container">
    <div class="pt-5 pl-4 mt-5 mb-5 display-4 mx-3">Ostukorv</div>
  </div>

  <table class="table">
    <thead>
    <tr>
      <th>Toode</th>
      <th class="text-center">Hind</th>
      <th class="text-center">Kogus</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in storeCart" :key="item.productName">
      <td>{{ item.productName }}</td>
      <td class="text-center">€{{ item.price }}</td>

      <td class="text-center">
        <b-button-group size="sm" class="d-inline-flex align-items-center">
          <b-button class="custom-button" @click="decreaseQuantity(item.productName)">-</b-button>
          <span class="mx-2">{{ item.quantity }}</span>
          <b-button class="custom-button" @click="increaseQuantity(item)">+</b-button>
        </b-button-group>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <h5 class="mt-4">Ostukorvi summa kokku: €{{ cartTotal.toFixed(2) }}</h5>
    <h5 class="mt-4">Ostukorvis on {{ cartItemsCount }} toodet</h5>
    <!-- Single button to add orders from cart and show alert -->
    <button @click="addOrdersAndShowAlert" class="btn btn-outline-success">
      Kinnita tellimus ja kuva tellimus
    </button>
  </div>

<!--  <div v-if="!isUser" class="input-group mb-3">-->
<!--    <form action="">-->
<!--      <label for="firstName">Eesnimi</label>-->
<!--      <input type="text" id="firstName" v-model="firstName">-->
<!--      <label for="lastName">Perekonnanimi</label>-->
<!--      <input type="text" id="lastName" v-model="lastName">-->
<!--      <label for="email">E-mail</label>-->
<!--      <input type="text" id="email" v-model="email">-->
<!--    </form>-->
<!--  </div>-->


  <!-- Modal for displaying order confirmation -->
  <div id="orderConfirmationModal" class="modal" tabindex="-1" v-bind:class="{ show: showOrderModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h3>Kaku Foto OÜ</h3>
          </div>
        </div>
        <div class="modal-body">
          <div>
            <h5 class="modal-title">Tellimuse kinnitus</h5>
            <br><br>
          </div>
          <div v-for="(orderGroup, index) in groupedOrders" :key="index" class="order-group">
            <p><strong>Tellimuse number:</strong> {{ orderGroup.orderNumber }}</p>
            <p><strong>Kuupäev:</strong> {{ new Date(orderGroup.orderDate).toLocaleString() }}</p>
            <p><strong>Maksja:</strong> {{ this.firstName }} {{ this.lastName }}</p>
            <hr/>
            <div v-for="item in orderGroup.items" :key="item.productName" class="order-item">
              <p><strong>Toode:</strong> {{ item.productName }}</p>
              <p><strong>Kogus:</strong> {{ item.quantity }}</p>
              <p><strong>Hind:</strong> €{{ item.price.toFixed(2) }}</p>
              <hr/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="downloadPDF" id="downloadPDFButton">Lae alla PDF</button>
          <button type="button" @click="closeModal" id="closeModalButton">Sulge</button>
        </div>
        <div>

        </div>
      </div>
    </div>
  </div>


  <br><br><br><br><br><br><br><br>
</template>


<script>
import axios from "axios";

import html2pdf from "html2pdf.js";


export default {
  data: () => ({
    api: "http://localhost:8090/api/cart",
    ordersApi: "http://localhost:8090/api/settled-orders",
    adminApi: "http://localhost:8090/api/admin",
    newProduct: {productName: "", price: 0, quantity: 0},
    newProduct2: {productName: "", description: "", price: 0},
    storeCart: [],
    quantity: 0,
    price: 0,
    cartTotal: 0,
    cartItemsCount: 0,
    orderNumber: 0,
    orderDate: 0,
    newOrderNumber: 0,
    username: null,
    firstName: "",
    email: "",
    lastName: "",
    userRightsId: localStorage.getItem('userRightsId') || null,
    modalContent: "",
    showOrderModal: false,
    parsedOrders: []

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
    removeProduct(productName) {
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
                  this.parsedOrders = lastOrders.length ? lastOrders : [];
                  this.showOrderModal = true;
                  this.deleteCart();
                })
                .catch((err) => {
                  console.error("Error fetching last settled orders:", err);
                  this.parsedOrders = [];
                  this.showOrderModal = true;
                });
          })
          .catch((err) => {
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
    increaseQuantity(item) {
      const productToCart = {
            productName: item.productName,
            price: item.price,
            quantity: 1 // Default to adding 1 quantity to the cart
    };
      axios
          .post(`${this.api}/add-to-cart`, productToCart)
          .then(() => {
            // alert(`${item.productName} has been added to the cart!`);
          })
          .catch((err) => {
            console.error("Error adding to cart:", err);
          });
      // Then trigger a full page reload
      window.location.reload();
    },

    decreaseQuantity(productName) {
      axios.delete(`${this.api}/remove-product/${productName}`).then(this.fetchCart);
      window.location.reload();
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
      console.log(this.firstName + " " + this.lastName + " " + this.email + this.username)
    },
    closeModal() {
      this.showOrderModal = false;
      window.location.reload();
    },
    downloadPDF() {

      const modalContent = document.querySelector(".modal-body");

      const options = {
        margin: 1,
        filename: "order-details.pdf",
        image: {type: "jpeg", quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {
          unit: "cm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf()
          .from(modalContent)
          .set(options)
          .toPdf()
          .get('pdf')
          .then((pdf) => {

            const pageWidth = pdf.internal.pageSize.getWidth();
            // Add a custom header
            pdf.setFontSize(12);
            pdf.setTextColor(40);
            pdf.text("Kaku Foto OÜ", pageWidth - 1, 1, {align: "right"});

            pdf.text("Arise tee 3-1, Kiili vald, Harjumaa", pageWidth - 1, 1.5, {align: "right"});
            pdf.text("+372 56 486 385", pageWidth - 1, 2, {align: "right"});

            pdf.setLineWidth(0.05); // Thickness of the line
            pdf.line(1, 2.5, pageWidth - 1, 2.5); // Draw line from left to right margin


            // Add a footer
            const pageHeight = pdf.internal.pageSize.height;
            pdf.setFontSize(10);
            pdf.text(
                "Aitäh, Sulle, tellimuse eest!",
                pdf.internal.pageSize.getWidth() / 2,
                pageHeight - 1,
                {align: "center"}
            );

            // Save the file
            pdf.save("order-details.pdf");
          });
    },
  },
  computed: {
    isUser() {
      return this.userRightsId === '2';
    },
    groupedOrders() {
      const grouped = [];
      this.parsedOrders.forEach((order) => {
        let existingGroup = grouped.find(
            (group) =>
                group.orderNumber === order.newOrderNumber &&
                group.orderDate === order.orderDate
        );
        if (!existingGroup) {
          existingGroup = {
            orderNumber: order.newOrderNumber,
            orderDate: order.orderDate,
            items: [],
          };
          grouped.push(existingGroup);
        }
        existingGroup.items.push({
          productName: order.productName,
          quantity: order.quantity,
          price: order.price,
        });
      });
      return grouped;
    },
  },
  mounted() {
    this.fetchCart()
  },
}

</script>

<style>

.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  margin: auto;
  top: 20%;
  max-width: 500px;
}

.modal-content {
  text-align: left;
  background: white;
  padding: 35px;
  border-radius: 5px;
}

.modal-header {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.modal-footer {
  text-align: right;
  padding-top: 10px;
}
.order-details p {
  margin: 4px 0;
}

.order-details hr {
  border: 0;
  border-top: 1px solid #ddd;
}

.custom-button {
  background-color: #f5f5dc; /* Beige color */
  border: 1px solid #dcd2a2; /* Slightly darker beige for border */
  color: #6b6b47; /* Muted dark color for text */
  font-size: 12px; /* Smaller font size */
  font-weight: bold; /* Make text bold */
  border-radius: 4px; /* Rounded corners */
  padding: 0.25rem 0.5rem; /* Smaller padding for compact size */
  transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
  background-color: #e6dbc9; /* Slightly darker beige on hover */
  color: #4a4a34; /* Darker text color on hover */
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(221, 217, 195, 0.5); /* Focus ring for accessibility */
}

.order-group {
  margin-bottom: 20px;
}

.order-item {
  margin-left: 20px;
}

.order-item hr {
  margin-top: 5px;
  margin-bottom: 10px;
}

</style>