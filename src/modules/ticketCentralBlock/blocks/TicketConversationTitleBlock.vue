<script setup>
import { computed, inject } from 'vue'
import BotSelectionBlock from './BotSelectionBlock.vue'

const ticketValues = inject('ticketValues')

const title = computed(() => ticketValues.value.title)
const uniqueId = computed(() => ticketValues.value.uniqueId)
const createdAt = computed(() => ticketValues.value.createdAt)
</script>

<template>
  <div class="ticket-detail__title">
    <div class="ticket-detail__unique-id">
      <strong>#{{ uniqueId }}</strong> от {{ createdAt }}
    </div>
    <h1>
      <i class="hde-ticket"></i>
      <div class="ticket_title">{{ title }}</div>
      <BotSelectionBlock />
    </h1>
  </div>
</template>

<style scoped>
.ticket-detail__title {
  border-bottom: 1px solid #c5cad3 !important;
}

h1 {
  align-items: center;
}

.ticket_title {
  flex: 1;
}
</style>
