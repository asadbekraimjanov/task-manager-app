import {createApp} from "vue";
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
// import jwtDecode from './jwtDecode'
// import http from './http'

const app = createApp(App)

// app.config.globalProperties.$http = http

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')


//http://16.170.249.186:8080
