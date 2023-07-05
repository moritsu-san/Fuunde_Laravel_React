require('./bootstrap')
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Axios from 'axios'
import router from './router'
import App from './App.vue'
import { useStoreAuth } from './stores/auth'

Axios.defaults.baseURL = 'http://localhost:3000/'

const startApp = async () => {
    const pinia = createPinia()
    const { currentUser } = useStoreAuth(pinia)
    const app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
    await currentUser()
}

startApp()