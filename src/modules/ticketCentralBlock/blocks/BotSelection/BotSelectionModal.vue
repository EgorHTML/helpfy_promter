<script setup lang="ts">
import type { BotEntity } from '@/services/helpfy/helpfy.schemas'
import type { PropType } from 'vue'
import { useSelectBot } from '../../composables/useSelectBot'

defineProps({
  bots: {
    type: Array as PropType<BotEntity[]>,
    required: true,
  },
  currentBotId: {
    type: Number as PropType<number | undefined>,
    required: false,
    default: 0,
  },
})

const emit = defineEmits(['select-bot', 'close'])
const { fetching } = useSelectBot()

const selectBot = (botId: number) => {
  emit('select-bot', botId)
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="bot-selection-modal-overlay" @click.self="closeModal">
    <div class="bot-selection-modal-content">
      <h3>Выберите бота</h3>
      <div v-if="fetching" class="loading-indicator">Загрузка ботов...</div>
      <ul v-else-if="bots.length > 0" class="bot-list">
        <li
          v-for="bot in bots"
          :key="bot.id"
          class="bot-list-item"
          :class="{ selected: bot.id === currentBotId }"
          :title="`Подробнее о боте ${bot.name}`"
          @click="selectBot(bot.id)"
        >
          <div class="bot-info">
            <span class="bot-name">{{ bot.name }}</span>
            <span class="bot-detail">ID: {{ bot.unique_id }}</span>
            <span class="bot-detail"
              >Модель: {{ bot.gpt_model }} ({{ bot.gpt_version }})</span
            >
            <span v-if="bot.user && bot.user.name" class="bot-detail"
              >Создатель: {{ bot.user.name }}</span
            >
            <span v-if="bot.client && bot.client.client" class="bot-detail"
              >Клиент: {{ bot.client.client }}</span
            >
          </div>
        </li>
      </ul>
      <p v-else>Список ботов пуст.</p>
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
.bot-selection-modal-overlay {
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

.bot-selection-modal-content {
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

.bot-selection-modal-content h3 {
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

.bot-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.bot-list-item {
  padding: 12px 15px;
  border-bottom: 1px solid #e4e7ed;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.bot-list-item:last-child {
  border-bottom: none;
}

.bot-list-item:hover {
  background-color: #f5f7fa;
}

.bot-list-item.selected {
  background-color: #eaf8e5;
}

.bot-list-item.selected .bot-name {
  font-weight: bold;
  color: #4d9d30;
}
.bot-list-item.selected .bot-detail {
  color: #608e4f;
}

.bot-info {
  display: flex;
  flex-direction: column;
}

.bot-name {
  font-size: 1.1em;
  color: #303133;
  margin-bottom: 6px;
}

.bot-detail {
  font-size: 0.85em;
  color: #606266;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bot-detail:last-child {
  margin-bottom: 0;
}

.close-button {
  margin-top: 20px;
  align-self: center;
}
</style>
