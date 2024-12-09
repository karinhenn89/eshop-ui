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


  <!-- Modal for displaying order confirmation -->
  <div id="orderConfirmationModal" class="modal" tabindex="-1" v-bind:class="{ show: showOrderModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tellimuse kinnitus</h5>
        </div>
        <div class="modal-body">
          <div v-for="(orderGroup, index) in groupedOrders" :key="index" class="order-group">
            <p><strong>Tellimuse number:</strong> {{ orderGroup.orderNumber }}</p>
            <p><strong>Kuupäev:</strong> {{ new Date(orderGroup.orderDate).toLocaleString() }}</p>
            <hr />
            <div v-for="item in orderGroup.items" :key="item.productName" class="order-item">
              <p><strong>Toode:</strong> {{ item.productName }}</p>
              <p><strong>Kogus:</strong> {{ item.quantity }}</p>
              <p><strong>Hind:</strong> €{{ item.price.toFixed(2) }}</p>
              <hr />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="downloadPDF" id="downloadPDFButton">Lae alla PDF</button>
          <button type="button" @click="closeModal" id="closeModalButton">Sulge</button>
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
    newProduct: {productName: "", price: 0, quantity: 0},
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
    },
    downloadPDF() {
      const modalContent = document.querySelector(".modal-body");

      const options = {
        margin: 1,
        filename: "order-details.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "cm",
          format: "a4",
          orientation: "portrait",
          // We add header and footer in the `jsPDF` callbacks
          callback: function (pdf) {
            // Add the header
            pdf.setFontSize(14);
            pdf.text("Tellimuse kinnitus", pdf.settings.margin.left, 1); // Position the header

            // Add the footer
            pdf.setFontSize(10);
            pdf.text("Ettevõtte andmed", pdf.settings.margin.left, pdf.internal.pageSize.height - 1); // Position the footer
          },
        },
      };

      // Generate and download the PDF with header and footer
      html2pdf()
          .set(options)
          .from(modalContent)
          .save();
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
  background: white;
  padding: 15px;
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
.order-details {
  margin-bottom: 10px;
}
.order-details p {
  margin: 4px 0;
}
.order-details hr {
  border: 0;
  border-top: 1px solid #ddd;
}
button {
  cursor: pointer;
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