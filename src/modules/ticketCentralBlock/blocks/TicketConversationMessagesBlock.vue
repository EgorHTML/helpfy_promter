<script setup>
import { computed } from 'vue'
import TicketConversationMessage from '../components/TicketConversationMessage.vue'

const props = defineProps({
  messages: {
    required: false,
    default() {
      return []
    },
    type: Array,
  },
})

const messages = computed(() => props.messages)
</script>

<template>
  <div class="ticket-conversation">
    <TicketConversationMessage
      v-for="(message, index) in messages"
      :key="message.id"
      :message="message"
      :scroll-to-last-message="messages.length - 1 === index"
    />
  </div>
</template>

<style>
.ticket-conversation {
  padding-top: 20px;
  overflow: auto !important;
}
</style>
