import Vue from 'vue'
import App from './App.vue'

// needed for time stuff [global usage]
window.moment = require('moment');

// to assist with any data manipulation [global usage]
window._ = require('lodash');

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import VueRouter from 'vue-router';
import { routes } from './routes.js';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

// import VueResource from 'vue-resource';
// Vue.use(VueResource);

import axios from 'axios';
axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Cache-Control': 'no-store, must-revalidate'
    }
});
Vue.prototype.http = axios;

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});