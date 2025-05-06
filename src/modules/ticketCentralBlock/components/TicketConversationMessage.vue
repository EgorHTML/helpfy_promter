<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    required: true,
    type: Object,
    default() {
      return {
        user: {
          id: 1,
          name: 'Егор',
          imageUrl: '',
          type: 'staff',
        },
        content: 'text',
        id: 1,
      }
    },
  },
  scrollToLastMessage: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const user = computed(() => props.message.user)

const message = ref()

onMounted(() => {
  if (props.scrollToLastMessage) message.value.scrollIntoView()
})

function parseCalendarNumber(num) {
  return num < 10 && !isNaN(num) ? '0' + num : num
}

function getDateMessage() {
  const date = new Date()
  const minutes = parseCalendarNumber(date.getMinutes())
  const hours = parseCalendarNumber(date.getHours())
  const fullYear = parseCalendarNumber(date.getFullYear())
  const month = parseCalendarNumber(date.getMonth() + 1)
  const day = parseCalendarNumber(date.getDate())
  return `${day}.${month}.${fullYear} ${hours}:${minutes}`
}

function copy() {
  navigator.clipboard.writeText(props.message.content)
}
</script>

<template>
  <div
    ref="message"
    class="ticket-conversation__message"
    :class="`ticket-conversation__message_${user.type}`"
  >
    <div class="ticket-conversation__message-user-block">
      <div
        class="ticket-conversation__message-image"
        :class="`ticket-conversation__message-image_${user.type}`"
        :style="{ 'background-image': `url(${user.imageUrl})` }"
      ></div>
    </div>
    <div class="ticket-conversation__message-block">
      <div
        class="ticket-conversation__message-meta"
        :class="`ticket-conversation__message-meta_${user.type}`"
      >
        <span class="el-tooltip" tabindex="0">
          {{ user.name }}
          {{ getDateMessage() }}
        </span>
      </div>
      <div
        class="ticket-conversation__message-text"
        :class="`ticket-conversation__message-text_${user.type}`"
      >
        <div
          style="white-space: pre-wrap"
          class="ticket-conversation__message-html"
          v-html="props.message.content"
        ></div>
      </div>
      <div class="ticket-conversation__actions">
        <span
          class="ticket-conversation__actions-btn ticket-conversation__show-on-hover"
        >
          <button
            title="Скопировать сообщение"
            class="ticket-conversation__actions-create-ticket-from-post-button"
            @click="copy"
          >
            <i class="hde-ticket"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
