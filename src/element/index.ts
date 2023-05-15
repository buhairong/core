import type { App } from 'vue'
import Pagination from './pagination/Pagination.vue'
import Input from './input/CInput.vue'
import CSelect from './select/CSelect.vue'
import SearchButton from './button/SearchButton.vue'
import ResetButton from './button/ResetButton.vue'

export default {
  install(app: App) {
    app.component('pagination', Pagination)
    app.component('c-input', Input)
    app.component('c-select', CSelect)
    app.component('search-button', SearchButton)
    app.component('reset-button', ResetButton)
  }
}
