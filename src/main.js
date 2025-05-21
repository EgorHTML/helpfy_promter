import { createApp } from 'vue'
import App from './App.vue'
import HDE from './plugin'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-theme-lark/dist/index.css'

HDE.on('ready', async () => {
  const state = HDE.getState()
  let { plugin } = state

  let started = false

  plugin.showButton = true
  HDE.emit('setPlugin', plugin)

  HDE.watch('plugin', (to, from) => {
    console.log(to, from)
    if (!started && to.visible) {
      const app = createApp(App)

      document.head.innerHTML += window.parent.document.head.innerHTML

      app.use(CKEditor)
      app.mount('#app')
    }
  })
})
