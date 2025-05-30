<script setup lang="ts">
import { useEvaluation } from '@/modules/ticketCentralBlock/composables/useEvaluation'
import ModalWindow from '../ModalWindow.vue'
import EvaluationForm from '@/modules/ticketCentralBlock/blocks/evaluation/EvaluationForm.vue'
import { computed } from 'vue'

const emit = defineEmits(['close'])

const { mark, comment, sendMark } = useEvaluation()

const transcription = computed(() =>
  mark.value === 'like' ? 'нравится' : 'не нравится'
)

function send() {
  sendMark()
  emit('close')
}
</script>

<template>
  <ModalWindow @close="emit('close')">
    <template #content>
      <div v-if="!mark">
        <h1 style="text-align: center">Оцените ответы суфлера</h1>
        <EvaluationForm class="evaluation_form" />
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
        class="el-button el-button--default el-button--mini"
        style="margin-top: 20px"
        @click="send"
      >
        Отправить оценку
      </button>
    </template>
  </ModalWindow>
</template>

<style scoped>
.evaluation_form {
  align-self: center;
}
</style>
