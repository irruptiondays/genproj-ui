import Vue from 'vue'
import App from './App.vue'

window.moment = require('moment');

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

import store from './store/store.js';

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
    store,
    render: h => h(App)
});