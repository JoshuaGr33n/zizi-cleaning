import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; 
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/custom.css';

library.add(faFacebookF, faInstagram);

const app = createApp(App);

app.use(VueSweetalert2);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
store.dispatch('initializeStore');




app.mount('#app');
