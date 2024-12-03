import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

import ContactPage from "../pages/ContactPage.vue";
import ShopPage from "../pages/ShopPage.vue";
import AdminProductPage     from "@/pages/AdminProductPage.vue";
import UserMenu from "@/pages/UserMenu.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/shop', name: 'Shop', component: ShopPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/adminproducts', name: 'Admin-Products', component: AdminProductPage },
    { path: '/usermenu', name: 'UserMenu', component: UserMenu }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
