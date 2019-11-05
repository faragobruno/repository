import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        fields: [
            'selected',
            { key: 'id', sortable: true },
            { key: 'name', sortable: true },
            { key: 'gender', sortable: true },
            { key: 'email', sortable: true },
            { key: 'age', sortable: true },
            { key: 'isActive', sortable: false }
        ],
        items: [],
        profFields: [
            { key: 'id',sortable:true},
            { key: 'name',sortable:true},
            { key: 'amount',sortable:true}
        ],
        profItems:[]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
    },
});