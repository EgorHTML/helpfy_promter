<script setup lang="ts">
import { computed, ref, onMounted, type PropType } from 'vue'
import type { IMessage } from '../../composables/useTicket'

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    required: true,
  },
  scrollToLastMessage: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    },
  },
})

const emit = defineEmits<{
  'create:message': [message: IMessage]
}>()

const user = computed(() => props.message.user)

const messageRef = ref()

onMounted(() => {
  if (props.scrollToLastMessage) messageRef.value.scrollIntoView()
})

function copy() {
  navigator.clipboard.writeText(props.message.content)
}

function send() {
  emit('create:message', props.message)
}
</script>

<template>
  <div
    ref="messageRef"
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
          {{ props.message.date_created }}
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
          <button
            title="Отправить сообщение клиенту"
            class="ticket-conversation__actions-create-ticket-from-post-button"
            @click="send"
          >
            <i class="el-icon-s-promotion"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
