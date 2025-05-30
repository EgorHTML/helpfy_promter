<script setup>
import { ClassicEditor, Essentials, Mention, Paragraph } from 'ckeditor5'
import { ref } from 'vue'
import EvaluationForm from '../evaluation/EvaluationForm.vue'
import { useTicket } from '../../composables/useTicket'

const emit = defineEmits(['submit'])

const editorData = ref('')
const editorConfig = {
  plugins: [Essentials, Mention, Paragraph],
  toolbar: ['|'],
  placeholder: 'Задать вопрос',
}
const editor = ref()

const { hasAnswerFromPromter } = useTicket()

function submit() {
  emit('submit', editor.value.instance.data.get())
  editor.value.instance.data.set('')
  editorData.value = ''
}
</script>

<template>
  <div class="ticket-detail__editor" @keydown.enter.prevent="submit">
    <ckeditor
      ref="editor"
      v-model="editorData"
      :editor="ClassicEditor"
      :config="editorConfig"
    ></ckeditor>

    <div class="button-group">
      <EvaluationForm v-if="hasAnswerFromPromter" />
      <button
        class="el-button el-button--primary el-button--mini"
        style="float: right; margin: 0; align-self: center"
        @click="submit"
      >
        Добавить ответ
      </button>
    </div>
  </div>
</template>

<style>
.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;
}

.ck.ck-editor__editable > .ck-placeholder::before {
  color: #606266 !important;
}
.ck-body-wrapper {
  display: none;
}
.ticket-detail__editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #ccced1 !important;
  flex: 1;
  margin: 10px 5px;
  position: relative;
}

#ticket-app .el-button--primary {
  margin-top: 10px;
  color: var(--ticket-primary-button-color, #fff);
  background-color: var(--ticket-primary-button-background, #23869b);
  border-color: var(--ticket-primary-button-background, #23869b);
}
#ticket-app .el-button--primary:hover {
  color: var(--ticket-primary-button-color-hover, #fff);
  background-color: var(--ticket-primary-button-background-hover, #4f9eaf);
  border-color: var(--ticket-primary-button-background-hover, #4f9eaf);
}
</style>
