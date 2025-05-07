<script setup lang="ts">
import TicketConversationTitleBlock from '../blocks/ticket/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/ticket/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/ticket/TicketEditor.vue'
import LoadingBlock from '../blocks/ticket/LoadingBlock.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'
import { getCurrentUser } from '../../../utils/user.js'
import linkifyHtml from 'linkify-html'
import { useSelectBot } from '../composables/useSelectBot'
import type { ResponseCompletionStatusAsyncDto } from '@/services/helpfy/helpfy.schemas.js'

type UserType = 'staff' | 'user'

interface IUserHDE {
  name: string
  id: number | string
  imageUrl: string
  type: UserType
}

interface IMessage {
  id: string | number
  content: string
  user: IUserHDE
}

const { currentBot, promter } = useSelectBot()

const ticketValues = ref(HDE.getState().ticketValues)
const defaultBotName = 'Суфлёр'
const botImageUrl = import.meta.env.VITE_BOT_IMAGE_URL

HDE.watch('ticketValues', (to: any) => {
  ticketValues.value = to
})

const messages = ref<IMessage[]>([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)

provide('ticketValues', ticketValues)

async function submit(textarea: string) {
  if (!promter.value) {
    addMessage({
      id: messages.value.length + 1,
      content: 'Суфлёр не активен. Пожалуйста, выберите бота в настройках.',
      user: {
        name: 'Система',
        id: 'system_error',
        imageUrl: '',
        type: 'user',
      },
    })
    setLoading(false)
    return
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
      content: interpretAIResponse(response),
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
        : error.message || 'Произошла неизвестная ошибка при запросе к суфлёру.'
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
  loadingAnswer.value = flag
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

function interpretAIResponse(
  aiResponse: ResponseCompletionStatusAsyncDto
): string {
  let messageText = aiResponse.response || ''

  switch (aiResponse.status) {
    case 'SUCCESS':
      messageText = aiResponse.response || 'Ответ получен.'
      break
    case 'GREETING':
      messageText = aiResponse.response || 'Приветствие от бота.'
      break
    case 'EMPTY_CONTEXT':
      messageText =
        'Недостаточно информации для ответа. Пожалуйста, уточните ваш запрос.'
      break
    case 'OPERATOR':
      messageText = 'По этому вопросу вам поможет оператор. Перенаправляю...'
      break
    case 'SPAM':
      messageText = 'Ваш запрос был расценен как спам.'
      break
    case 'ERROR':
    case 'HTTP_ERROR':
      messageText =
        aiResponse.webhook_error ||
        aiResponse.response ||
        'Произошла ошибка при обработке вашего запроса на стороне сервера.'
      break
    default:
      console.warn(
        'TicketDetail: Неизвестный или необработанный статус ИИ:',
        aiResponse.status
      )
      messageText = `Получен необработанный статус: ${
        aiResponse.status
      }. Ответ: ${aiResponse.response || 'Нет данных.'}`
  }
  return messageText
}
</script>

<template>
  <div id="ticket-app">
    <div class="ticket">
      <div class="ticket_detail">
        <TicketConversationTitleBlock />
        <LoadingBlock v-if="loadingAnswer" />
        <TicketConversationMessagesBlock :messages="messages" />
        <TicketEditor @submit="submit" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket_detail {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
}
</style>
