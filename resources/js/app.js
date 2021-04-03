import { createApp, h, inject } from 'vue'
import { App, plugin } from '@inertiajs/inertia-vue3'
import Cookies from 'js-cookie'
import axios from 'axios'

axios.defaults.headers.common["X-XSRF-TOKEN"] = Cookies.get('xsrf-token')

const el = document.getElementById('app')
const initialPage = JSON.parse(el.dataset.page)

createApp({
  render: () => h(App, {
    initialPage,
    resolveComponent: name => require(`./Pages/${name}`).default,
  })
}).use(plugin).mount(el)