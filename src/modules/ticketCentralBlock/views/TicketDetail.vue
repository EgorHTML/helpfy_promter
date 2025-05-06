<script setup lang="ts">
import TicketConversationTitleBlock from '../blocks/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/TicketEditor.vue'
import LoadingBlock from '../blocks/LoadingBlock.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'
import { getCurrentUser } from '../../../utils/user.js'
import linkifyHtml from 'linkify-html'
import HelpfyPromter from '../../../services/helpfy/Promter.ts'

type UserType = 'staff' | 'user'

interface IMessage {
  id: string | number
  content: string
  user: {
    name: string
    id: number
    imageUrl: string
    type: UserType
  }
}

const ticketValues = ref(HDE.getState().ticketValues)
const botName = 'Суфлёр'
const botImageUrl = import.meta.env.VITE_BOT_IMAGE_URL

HDE.watch('ticketValues', (to: any) => {
  ticketValues.value = to
})

const messages = ref<IMessage[]>([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)

const promter = new HelpfyPromter(8, '4')

provide('ticketValues', ticketValues)

async function submit(textarea: string) {
  try {
    addMessage({
      id: messages.value.length + 1,
      content: textarea,
      user: {
        name: currentUser.name,
        id: currentUser.id,
        imageUrl: currentUser.image,
        type: 'staff',
      },
    })
    setLoading(true)
    await getAnswer(textarea)
  } catch (error: any) {
    addMessage({
      id: messages.value.length + 1,
      content: error.message,
      user: {
        name: botName,
        id: 0,
        imageUrl: botImageUrl,
        type: 'user',
      },
    })
  } finally {
    if (!promter.hasActiveRequests()) setLoading(false)
  }
}

async function getAnswer(textarea: string) {
  const messageId = String(messages.value.length + 1)

  return promter
    .asc(textarea)
    .then((response) => {
      addMessage({
        id: messageId,
        content: response.response,
        user: {
          name: botName,
          id: 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
    })
    .catch((error) => {
      addMessage({
        id: messageId,
        content: error,
        user: {
          name: botName,
          id: 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
    })
}

function setLoading(flag: boolean) {
  loadingAnswer.value = flag
}

function addMessage(message: IMessage) {
  if (!message.content) throw new Error('Введите сообщение.')
  const options = {
    target: '_blank',
  }
  const linkifyText = linkifyHtml(message.content, options)
  message.content = linkifyText
  messages.value = [...messages.value, message]
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
