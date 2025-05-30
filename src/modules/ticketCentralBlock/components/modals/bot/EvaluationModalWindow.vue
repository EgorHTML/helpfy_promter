<script setup lang="ts">
import { useEvaluation } from '@/modules/ticketCentralBlock/composables/useEvaluation'
import ModalWindow from '../ModalWindow.vue'
import EvaluationForm from '@/modules/ticketCentralBlock/blocks/evaluation/EvaluationForm.vue'
import { computed } from 'vue'

const emit = defineEmits(['close'])

const { mark, comment, sendMark, failedSendMark } = useEvaluation()

const transcription = computed(() =>
  mark.value === 'like' ? 'нравится' : 'не нравится'
)

function send() {
  sendMark().then(() => {
    emit('close')
  })
}

function closeModal() {
  emit('close')
}
</script>

<template>
  <ModalWindow @close="closeModal">
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
          <div data-v-6784100c="" class="el-textarea el-input--mini">
            <textarea
              id="comment"
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
        style="margin-top: 20px"
        @click="send"
      >
        Отправить оценку
      </button>
    </template>
  </ModalWindow>
</template>
