import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

import ContactPage from "../pages/ContactPage.vue";
import ShopPage from "../pages/ShopPage.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/shop', name: 'Shop', component: ShopPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
