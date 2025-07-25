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
    const selectBotModule = await import(
      './modules/ticketCentralBlock/composables/useSelectBot'
    )

    const useTicket = ticketModule.useTicket
    const useSelectBot = selectBotModule.useSelectBot

    const { currentBot } = useSelectBot()
    const { addMessageHandler } = useTicket()

    await waitBot()()

    clickOnPluginButton(plugin)

    await sendMessage()

    async function sendMessage() {
      const messageContent = message?.querySelector(
        '.ticket-conversation__message-html'
      )
      if (!messageContent)
        throw new Error('Не удалось найти сообщение для отправки')

      await addMessageHandler(messageContent.innerHTML, {
        post_id: +message.dataset.postId,
      })
    }

    function waitBot() {
      let attempt = 0

      return function waitAttempt() {
        attempt++
        if (attempt > 5) return false
        return new Promise((res) => {
          setTimeout(async () => {
            if (currentBot.value) {
              res(true)
            } else {
              const status = await waitAttempt()

              res(status)
            }
          }, 300)
        })
      }
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
