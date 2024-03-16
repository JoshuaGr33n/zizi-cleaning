// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/custom.css'; 

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebookF, faInstagram)

export default {
  components: {
    FontAwesomeIcon
  }
}

createApp(App).mount('#app')
