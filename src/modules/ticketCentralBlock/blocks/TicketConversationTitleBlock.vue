<script setup>
import { computed, inject } from 'vue'

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
    <h1><i class="hde-ticket"></i> {{ title }}</h1>
  </div>
</template>

<style>
.ticket-detail__title {
  border-bottom: 1px solid #c5cad3 !important;
}
</style>
