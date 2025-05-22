import { createApp } from 'vue'
import App from './App.vue'
import HDE from './plugin'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-theme-lark/dist/index.css'
import { addHandlerButton } from './modules/ticketCentralBlock/plugins/addHandlerButtonToMessage'

HDE.on('ready', async () => {
  const state = HDE.getState()
  let { plugin } = state
  let started = false

  plugin.showButton = true
  HDE.emit('setPlugin', plugin)

  addHandlerButton()

  HDE.watch('plugin', (to) => {
    if (!started && to.visible) {
      const app = createApp(App)

      document.head.innerHTML += window.parent.document.head.innerHTML

      app.use(CKEditor)
      app.mount('#app')
    }
  })
})
