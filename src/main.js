import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import VueGtag from "vue-gtag-next";

createApp(App)
    .use(store)
    .use(vueAxios, axios)
    .use(VueGtag, { property: { id: 'G-7NTWM6KWYG', router }})
    .use(router).mount('#app')
