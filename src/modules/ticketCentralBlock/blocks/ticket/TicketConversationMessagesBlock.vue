<script setup lang="ts">
import { computed, type PropType } from 'vue'
import TicketConversationMessage from '../../components/TicketConversationMessage.vue'
import { useTicket, type IMessage } from '../../composables/useTicket'

const props = defineProps({
  messages: {
    required: false,
    default() {
      return []
    },
    type: Array as PropType<IMessage[]>,
  },
})

const messages = computed(() => props.messages)
const { sendMessageToMainTicket } = useTicket()

function sendMessageToTicket(message: IMessage) {
  sendMessageToMainTicket(message)
}
</script>

<template>
  <div class="ticket-conversation">
    <TicketConversationMessage
      v-for="(message, index) in messages"
      :key="message.id"
      :message="message"
      :scroll-to-last-message="messages.length - 1 === index"
      @create:message="sendMessageToTicket(message)"
    />
  </div>
</template>

<style>
.ticket-conversation {
  padding-top: 20px;
  overflow: auto !important;
}
</style>
