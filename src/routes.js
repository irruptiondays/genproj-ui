import Persons from './components/Persons.vue';
import Home from './components/Home.vue';
import PersonCreator from './components/PersonCreator.vue';

export const routes = [

    { path: '/persons-index', component: Persons },
    { path: '/', component: Home },
    { path: '/add-person', component: PersonCreator }
];