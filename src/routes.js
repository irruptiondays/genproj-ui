import Persons from './components/Persons.vue';
import Home from './components/Home.vue';
import PersonCreator from './components/PersonCreator.vue';
import Family from './components/Family.vue';
import Marriages from './components/Marriages.vue';

export const routes = [

    { path: '/persons-index', component: Persons },
    { path: '/', component: Home },
    { path: '/add-person', component: PersonCreator },
    { path: '/set-family-origin', component: Family },
    { path: '/set-marriages', component: Marriages }
];