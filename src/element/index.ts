import type { App } from 'vue'
import Pagination from './pagination/Pagination.vue'
import Input from './input/CInput.vue'
import CInputNumber from './input/CInputNumber.vue'
import CSelect from './select/CSelect.vue'
import SearchButton from './button/SearchButton.vue'
import ResetButton from './button/ResetButton.vue'
import CreateButton from './button/CreateButton.vue'
import BackButton from './button/BackButton.vue'

export default {
  install(app: App) {
    app.component('pagination', Pagination)
    app.component('c-input', Input)
    app.component('c-input-number', CInputNumber)
    app.component('c-select', CSelect)
    app.component('search-button', SearchButton)
    app.component('reset-button', ResetButton)
    app.component('create-button', CreateButton)
    app.component('back-button', BackButton)
  }
}
