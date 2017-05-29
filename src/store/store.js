import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import person from './modules/person';
import createPersistedState from 'vuex-persistedstate';

export default new Vuex.Store({
    modules: {
        person
    },
    plugins: [createPersistedState()]
});