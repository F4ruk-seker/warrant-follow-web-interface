import { createStore } from "vuex";

export default createStore({
    state: {
        cookies: []
    },
    getters: {
        get_cookie(state){
            return state.cookies
        }
    },
    mutations: {
        setCookies(state, cookies) {
            state.cookies = cookies;
        }
    },
    actions: {

    },
    modules: {},
});