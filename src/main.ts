import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faFigma } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faCheck,
  faGlobe,
  faUser,
  faHouse,
  faFile,
} from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faEnvelope, faCheck, faGlobe, faFigma, faUser, faHouse, faFile)

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  anchorPlacement: 'top',
  once: true,
  disable: 'mobile',
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
