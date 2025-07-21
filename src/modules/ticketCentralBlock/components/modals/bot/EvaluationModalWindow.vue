<script setup lang="ts">
import { useEvaluation } from '@/modules/ticketCentralBlock/composables/useEvaluation'
import ModalWindow from '../ModalWindow.vue'
import EvaluationForm from '@/modules/ticketCentralBlock/blocks/evaluation/EvaluationForm.vue'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['close'])

const { mark, comment, sendMark, failedSendMark } = useEvaluation()

const transcription = computed(() =>
  mark.value === 'like' ? 'нравится' : 'не нравится'
)

const textarea = ref()
const sendingMark = ref(false)

onMounted(() => {
  textarea.value?.focus()
})

function send() {
  console.log('click')

  sendingMark.value = true
  sendMark()
    .then(() => {
      emit('close')
    })
    .finally(() => {
      sendingMark.value = false
    })
}

function closeModal() {
  emit('close')
}
</script>

<template>
  <ModalWindow @close="closeModal" @keydown.enter.prevent="send">
    <template #content>
      <div v-if="failedSendMark" style="color: var(--ck-color-base-error)">
        {{ failedSendMark ?? 'Произошла ошибка при отправке оценки' }}
      </div>

      <div v-if="!mark">
        <h1 style="text-align: center">Не забудьте оценить работу суфлёра!</h1>
        <EvaluationForm
          class="evaluation_form"
          style="justify-content: center; margin-top: 10px"
        />
      </div>
      <div v-else>
        Вам {{ transcription }} работа суфлера. По желанию вы можете оставить
        комментарий.
      </div>

      <div class="el-form-item__content">
        <div class="ticket-fields__field-input">
          <div class="el-textarea el-input--mini">
            <textarea
              id="comment"
              ref="textarea"
              v-model="comment"
              autocomplete="off"
              class="el-textarea__inner"
              placeholder="Комментарий к оценке"
              style="resize: none; min-height: 30px; height: 70px"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button
        v-if="mark"
        class="el-button el-button--default el-button--mini"
        :class="sendingMark ? 'loading' : ''"
        style="margin-top: 20px; position: relative"
        @click="send"
      >
        Отправить оценку
        <span class="loader"></span>
      </button>
    </template>
  </ModalWindow>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid #1e5509;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: none;
}

.loading .loader {
  display: block;
}

.loading {
  pointer-events: none;
  opacity: 0.4;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
