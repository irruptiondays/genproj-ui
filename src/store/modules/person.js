import Vue from 'vue';
import {eventBus} from '../../configuration/config';

const state = {
    allPersons: []
};

const mutations = {
    'SET_PERSONS'(state, payload) {
        state.allPersons = payload;
    }
};

const actions = {
    setPersons: ({commit, getters}, payload) => {
        commit('SET_PERSONS', payload);
    },
    fetchAllPersons: ({commit, getters}, payload) => {
        console.log('fetchAllPersons called');

        //commit('SET_PERSONS', null);

        Vue.prototype.http.get('/api/person/all').then(persons => {
            console.log('persons from db ', persons);
            commit('SET_PERSONS', persons.data);

        }, error => {
            console.log('An error occurred ', error);
        });
    }
};

const getters = {
    allPersons: state => {
        return state.allPersons;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}