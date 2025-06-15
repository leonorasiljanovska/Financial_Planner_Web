import {createRouter, createWebHistory} from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ExpensesView from '@/views/ExpensesView.vue';
import DashboardView from "@/views/DashboardView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/', redirect: '/login'},
    {path: '/login', component: LoginView},
    {path: '/register', component: RegisterView},
    {
        path: '/expenses', component: ExpensesView,
        beforeEnter: (to, from, next) => {
            const user = localStorage.getItem('loggedInUser');
            if (user) next(); else next('/login');
        },
    },
    {path: '/dashboard', component: DashboardView},
];

export default createRouter({
    history: createWebHistory(),
    routes
});
