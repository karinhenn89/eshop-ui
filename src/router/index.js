import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ContactPage from "../pages/ContactPage.vue";
import ShopPage from "../pages/ShopPage.vue";
import UserMenu from "@/pages/UserMenu.vue";
import AdminUsers from "@/pages/AdminUsers.vue";
import AdminSettledOrders from "@/pages/AdminSettledOrders.vue";
import ShoppingCart from "@/pages/ShoppingCart.vue";
import AddUserPage from "@/pages/AddUserPage.vue";
import LoginForm from "@/components/LoginForm.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/home', name: 'Home2', component: HomePage },
    { path: '/shop', name: 'Shop', component: ShopPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/usermenu', name: 'UserMenu', component: UserMenu },
    { path: '/shoppingcart', name: 'Ostukorv', component: ShoppingCart},
    { path: '/allusers', name: 'AllUsers', component: AdminUsers },
    { path: '/allorders', name: 'AllOrders', component: AdminSettledOrders },
    { path: '/addnewuser', name: 'AddNewUser', component: AddUserPage },
    { path: '/login', name: 'LogIn', component: LoginForm },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
