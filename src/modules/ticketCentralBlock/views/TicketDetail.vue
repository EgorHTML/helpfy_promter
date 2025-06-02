<script setup lang="ts">
import TicketConversationTitleBlock from '../blocks/ticket/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/ticket/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/ticket/TicketEditor.vue'
import LoadingBlock from '../blocks/ticket/LoadingBlock.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'
import { useTicket } from '../composables/useTicket'
import EvaluationModalWindow from '../components/modals/bot/EvaluationModalWindow.vue'
import { useEvaluation } from '../composables/useEvaluation'
import { clickOnPluginButton } from '../plugins/pluginButton'

const { markSend, mark } = useEvaluation()

const { addMessageHandler, messages, loadingAnswer, hasAnswerFromPromter } =
  useTicket()

const ticketValues = ref(HDE.getState().ticketValues)

const showWindow = ref<boolean>(false)

HDE.watch('ticketValues', (to: any) => {
  ticketValues.value = to
})

HDE.watch('plugin', async (to: any, from: any) => {
  if (
    !to.visible &&
    from.visible &&
    !markSend.value &&
    hasAnswerFromPromter.value
  ) {
    mark.value = undefined
    clickOnPluginButton(to)
    showWindow.value = true
  }
})

function closeWindow() {
  showWindow.value = false
  markSend.value = true
}

provide('ticketValues', ticketValues)
</script>

<template>
  <div id="ticket-app">
    <div class="ticket">
      <div class="ticket_detail">
        <EvaluationModalWindow v-if="showWindow" @close="closeWindow" />
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
