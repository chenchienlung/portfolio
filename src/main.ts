import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faFigma, faSquareFigma } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faCheck,
  faGlobe,
  faUser,
  faHouse,
  faFile,
  faLightbulb,
  faLocationDot,
  faBook,
  faHeadphones,
  faCode,
  faWandMagicSparkles,
  faScrewdriverWrench,
  faPen,
} from '@fortawesome/free-solid-svg-icons'

import { faSun as faSunRegular, faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'

library.add(
  faGithub,
  faEnvelope,
  faCheck,
  faGlobe,
  faFigma,
  faSquareFigma,
  faUser,
  faHouse,
  faFile,
  faLightbulb,
  faLocationDot,
  faBook,
  faHeadphones,
  faCode,
  faWandMagicSparkles,
  faScrewdriverWrench,
  faPen,
  faSunRegular,
  faMoonRegular,
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
