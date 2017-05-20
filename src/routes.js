import Persons from './components/Persons.vue';
import Home from './components/Home.vue';

export const routes = [

    { path: '/persons-index', component: Persons },
    { path: '/', component: Home }
];