import type { App } from 'vue'
import Pagination from './pagination/Pagination.vue'

export default {
  install(app: App) {
    app.component('pagination', Pagination)
  }
}
