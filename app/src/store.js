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
            { key: 'name', sortable: true },
            { key: 'details', sortable: true },
            { key: 'start', sortable: true },
            { key: 'end', sortable: true },
            { key: 'isAllowed', sortable: true}
        ],
        profItems: [],
        creditFields:[
            { key: 'hitelosszeg', sortable: true},
            { key:'futamido',sortable:true},
            { key:'lakcim',sortable:true},
            { key:'email',sortable:true},
            { key:'telefon',sortable:true},
            { key:'username',thClass: 'd-none', tdClass: 'd-none' },
            { key:'id',thClass: 'd-none', tdClass: 'd-none' },

        ],
        creditItems:[]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
    },
});