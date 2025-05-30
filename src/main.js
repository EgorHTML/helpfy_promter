import { createApp } from 'vue'
import HDE from './plugin'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-theme-lark/dist/index.css'
import { HandlerButton } from './modules/ticketCentralBlock/plugins/HandlerButton'
import { clickOnPluginButton } from './modules/ticketCentralBlock/plugins/pluginButton'

HDE.on('ready', async () => {
  const state = HDE.getState()
  const { plugin } = state
  let started = false

  plugin.showButton = true
  HDE.emit('setPlugin', plugin)

  new HandlerButton('take-message', askPromter, 'Спросить у суфлера')

  async function askPromter(message) {
    await start()
    const ticketModule = await import(
      './modules/ticketCentralBlock/composables/useTicket'
    )

    const useTicket = ticketModule.useTicket

    const { addMessageHandler } = useTicket()

    try {
      clickOnPluginButton(plugin)
      sendMessage(true)
    } catch (error) {
      setTimeout(async () => {
        sendMessage()
      }, 500)
    }

    function sendMessage(force = false) {
      const messageContent = message?.querySelector(
        '.ticket-conversation__message-html'
      )
      if (!messageContent)
        return new Error('Не удалось найти сообщение для отправки')
      addMessageHandler(messageContent.innerHTML, force)
    }
  }

  HDE.watch('plugin', (to) => {
    if (!started && to.visible) {
      start()
    }
  })

  async function start() {
    if (started) return false
    started = true

    const App = await import('./App.vue')

    const app = createApp(App.default)

    document.head.innerHTML += window.parent.document.head.innerHTML

    app.use(CKEditor)
    app.mount('#app')
  }
})
