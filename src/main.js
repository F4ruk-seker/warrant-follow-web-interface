import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // Vuex store'unuzu içe aktarın
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'

// import './assets/main.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(fas)

axios.interceptors.request.use(config => {
    const cookies = store.state.cookies;

    if (cookies.length > 0) {
        config.headers['Cookie'] = cookies.join('; ');
    }

    return config;
}, error => {
    return Promise.reject(error);
});

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
