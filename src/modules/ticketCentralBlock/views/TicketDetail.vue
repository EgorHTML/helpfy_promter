<script setup lang="ts">
import TicketConversationTitleBlock from '../blocks/ticket/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/ticket/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/ticket/TicketEditor.vue'
import LoadingBlock from '../blocks/ticket/LoadingBlock.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'
import { useTicket } from '../composables/useTicket'

const { addMessageHandler, messages, loadingAnswer } = useTicket()

const ticketValues = ref(HDE.getState().ticketValues)

HDE.watch('ticketValues', (to: any) => {
  ticketValues.value = to
})

provide('ticketValues', ticketValues)
</script>

<template>
  <div id="ticket-app">
    <div class="ticket">
      <div class="ticket_detail">
        <TicketConversationTitleBlock />
        <LoadingBlock v-if="loadingAnswer" />
        <TicketConversationMessagesBlock :messages="messages" />
        <TicketEditor @submit="addMessageHandler" />
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
