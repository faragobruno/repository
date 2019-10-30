import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        fields: [
            { key: 'name', sortable: true },
            { key: 'gender', sortable: true },
            { key: 'email', sortable: true },
            { key: 'age', sortable: true },
            { key: 'isActive', sortable: false }
        ],
        items: [
            { isActive: true, age: 40, name: 'Dickerson Macdonald', email: 'Macdonald@gmail.com', gender: 'male' },
            { isActive: false, age: 21, name: 'Larsen Shaw', email: 'Shaw@yahoo.co.uk', gender: 'male' },
            { isActive: false, age: 89, name: 'Geneva Wilson', email: 'Wilson@gmail.com', gender: 'female' },
            { isActive: true, age: 23, name: 'Jami Carney', email: 'Carney@microsoft.com', gender: 'female' },
            { isActive: true, age: 32, name: 'Amil Basf', email: 'Basf@yahoo.co.uk', gender: 'male' },
            { isActive: false, age: 22, name: 'Heas Jes', email: 'Jes@gmail.com', gender: 'female' },
            { isActive: false, age: 33, name: 'Karsfs Lkas', email: 'Lkas@gmail.com', gender: 'male' },
            { isActive: true, age: 55, name: 'Pores Aens', email: 'Aens@microsoft.com', gender: 'female' },
            { isActive: true, age: 88, name: 'Kasff Xsha', email: 'Xsha@microsoft.com', gender: 'male' },
            { isActive: false, age: 66, name: 'Lemas Nvas', email: 'Nvas@gmail.com', gender: 'male' },
            { isActive: false, age: 54, name: 'Kenfe Hajs', email: 'Hajs@yahoo.co.uk', gender: 'female' },
            { isActive: true, age: 24, name: 'Uhsa Nmeas', email: 'Nmeas@gmail.com', gender: 'male' }
        ]
    },
    mutations: {
        //add_person(state, item) {
        //    state.items.push(item);
        //},
    },
    actions: {
        //createAddition({ commit },item) {
        //    commit('add_person',item);
        //  },
    },
    getters: {
        getMaxPeople: state => {
            return state.items.length
        },
        getMenLength: state => {
            return state.items.filter((person) => {
                return person.gender === 'male'
            })
        },
        getWomenLength: state => {
            return state.items.filter((person) => {
                return person.gender === 'female'
            })
        },
        getActivePeople: state => {
            return state.items.filter((person) => {
                return person.isActive === true
            })
        },
        getNonActivePeople: state => {
            return state.items.filter((person) => {
                return person.isActive === false
            })
        },
        getAdults: state => {
            return state.items.filter((person) => {
                return person.age < 50
            })
        },
        getElders: state => {
            return state.items.filter((person) => {
                return person.age > 50
            })
        },
    },
});