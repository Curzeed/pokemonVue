import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/components/HomeView.vue";
import AboutView from "@/components/AboutView.vue";
import ContactView from "@/components/ContactView.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name : 'About',
        component: AboutView
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactView
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: PokemonDetails,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router