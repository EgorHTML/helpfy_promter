import linkifyHtml from 'linkify-html'
import { ref } from 'vue'
import { useSelectBot } from './useSelectBot'
import { getCurrentUser } from '@/utils/user'
import { HelpfyPromterError } from '@/services/helpfy/HelpfyPromterError'
import HelpfyPromter from '@/services/helpfy/Promter'
import HDE from '../../../plugin'
import { clickOnPluginButton } from '../plugins/pluginButton'

type UserType = 'staff' | 'user'

interface IUserHDE {
  name: string
  id: number | string
  imageUrl: string
  type: UserType
}

export interface IMessage {
  id: string | number
  content: string
  user: IUserHDE
}

const messages = ref<IMessage[]>([])
const amountLoadingRequest = ref(0)
const loadingAnswer = ref(false)

export const useTicket = () => {
  const { currentBot, promter } = useSelectBot()

  const currentUser = getCurrentUser()
  const defaultBotName = 'Суфлёр'
  const botImageUrl = import.meta.env.VITE_BOT_IMAGE_URL

  async function submit(textarea: string) {
    if (!promter.value) {
      throw new HelpfyPromterError('Суфлер не инициализирован')
    }

    addMessage({
      id: messages.value.length + 1,
      content: textarea,
      user: {
        name: currentUser.name ?? 'Неизвестный',
        id: currentUser.id,
        imageUrl: currentUser.image,
        type: 'staff',
      },
    })

    setLoading(true)
    try {
      await getAnswer(textarea)
    } catch (error: any) {
      console.error('Ошибка при получении ответа от суфлёра:', error)
    } finally {
      if (promter.value && !promter.value.hasActiveRequests()) {
        setLoading(false)
      } else if (!promter.value) {
        setLoading(false)
      }
    }
  }

  async function getAnswer(textarea: string) {
    if (!promter.value) {
      throw new Error('Суфлёр не настроен для отправки запроса.')
    }

    const messageId = String(messages.value.length + 1)
    const botDisplayName = currentBot.value?.name || defaultBotName

    try {
      const response = await promter.value.asc(textarea)
      addMessage({
        id: messageId,
        content: HelpfyPromter.interpretAIResponse(response),
        user: {
          name: botDisplayName,
          id: currentBot.value?.id || 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
    } catch (error: any) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error.message ||
            'Произошла неизвестная ошибка при запросе к суфлёру.'
      addMessage({
        id: messageId,
        content: errorMessage,
        user: {
          name: botDisplayName,
          id: currentBot.value?.id || 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
      throw error
    }
  }

  function setLoading(flag: boolean) {
    if (flag) {
      amountLoadingRequest.value = amountLoadingRequest.value + 1
      loadingAnswer.value = flag
    } else {
      amountLoadingRequest.value =
        amountLoadingRequest.value > 1 ? amountLoadingRequest.value - 1 : 0

      if (amountLoadingRequest.value === 0) loadingAnswer.value = flag
    }
  }

  function addMessage(message: IMessage) {
    if (!message.content && message.user.type === 'staff') {
      console.warn('Попытка добавить пустое сообщение от пользователя.')
      return
    }
    const options = {
      target: '_blank',
      rel: 'noopener noreferrer',
    }
    try {
      const linkifyText = linkifyHtml(String(message.content), options)
      message.content = linkifyText
    } catch (e) {
      console.error('Ошибка при обработке ссылок в сообщении:', e)
    }
    messages.value = [...messages.value, message]
  }

  function sendMessageToMainTicket(message: IMessage) {
    const addMessageButton = window.parent.document.querySelector(
      '.ticket-editor__add-post-dropdown button'
    ) as HTMLElement

    if (!addMessageButton)
      throw new Error(
        'Возникла ошибка при отправке сообщения в основную заявку'
      )

    HDE.emit('setTicketValue', {
      field: 'editorContent',
      value: message.content.replaceAll('\n', '<br>'),
    })

    setTimeout(() => {
      clickOnPluginButton(HDE.getState().plugin)
      addMessageButton.click()
    }, 100)
  }

  return {
    addMessageHandler: submit,
    loadingAnswer,
    messages,
    sendMessageToMainTicket,
  }
}
