<script setup lang="ts">
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot name="content"></slot>
      <button
        class="close-button el-button el-button--default el-button--mini"
        @click="closeModal"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2050;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 450px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.2em;
  color: #303133;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  color: #606266;
}

.close-button {
  margin-top: 20px;
  align-self: center;
}
</style>
