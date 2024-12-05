import { createStore } from 'vuex';

const store = createStore({
    state: {
        isLoggedIn: false,
    },
    mutations: {
        setLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
    },
});

export default store;
