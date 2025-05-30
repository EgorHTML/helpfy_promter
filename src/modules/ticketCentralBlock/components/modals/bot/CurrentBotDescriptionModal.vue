<script setup lang="ts">
import type { BotEntity } from '@/services/helpfy/helpfy.schemas'
import type { PropType } from 'vue'
import { computed } from 'vue'
import HDE from '@/plugin'
import ModalWindow from '../ModalWindow.vue'

const props = defineProps({
  bot: {
    type: Object as PropType<BotEntity | undefined>,
    required: true,
  },
})

const emit = defineEmits(['close'])

const formattedDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (e) {
    console.error('Ошибка форматирования даты:', e)
    return dateString
  }
}

const botDetails = computed(() => {
  if (!props.bot) return []

  if (HDE.vars.info && String(HDE.vars.info).trim()) {
    return [
      { label: 'ID Бота (внутренний)', value: props.bot.id },
      { label: 'Уникальный ID', value: props.bot.unique_id },
      { label: 'Модель GPT', value: props.bot.gpt_model },
      { label: 'Версия модели', value: props.bot.gpt_version },
      {
        label: 'Webhook URL',
        value: props.bot.webhook_url || 'Не указан',
        isLink: !!props.bot.webhook_url,
      },
      {
        label: 'Создатель',
        value: (props.bot.user && props.bot.user.name) || 'N/A',
      },
      {
        label: 'Клиент',
        value: (props.bot.client && props.bot.client.client) || 'N/A',
      },
      { label: 'Дата создания', value: formattedDate(props.bot.created_at) },
      {
        label: 'Последнее обновление',
        value: formattedDate(props.bot.updated_at),
      },
      {
        label: 'ID Профиля интеграции',
        value: props.bot.integration_profile_id || 'N/A',
      },
    ]
  }

  return [
    { label: 'Модель GPT', value: props.bot.gpt_model },
    { label: 'Версия модели', value: props.bot.gpt_version },
  ]
})
</script>

<template>
  <ModalWindow @close="emit('close')">
    <template v-if="bot" #content>
      <h3 v-if="bot">Описание бота: {{ bot.name }}</h3>
      <h3 v-else>Информация о боте</h3>

      <div v-if="bot" class="details-grid">
        <template v-for="detail in botDetails" :key="detail.label">
          <div class="detail-label">{{ detail.label }}:</div>
          <div class="detail-value">
            <a
              v-if="detail.isLink"
              :href="detail.value"
              target="_blank"
              rel="noopener noreferrer"
              class="link-value"
              >{{ detail.value }}</a
            >
            <span v-else>{{ detail.value }}</span>
          </div>
        </template>
      </div>
      <p v-else class="no-bot-selected">
        Бот не выбран. Пожалуйста, выберите бота из списка.
      </p>
    </template>
  </ModalWindow>
</template>

<style scoped>
.details-grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 12px 20px;
  margin-bottom: 25px;
  font-size: 0.95em;
}

.detail-label {
  font-weight: 600;
  color: #555;
  text-align: left;
  padding-right: 10px;
}

.detail-value {
  color: #333;
  word-break: break-word;
}

.link-value {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s;
}

.link-value:hover {
  color: #2980b9;
  text-decoration: underline;
}

.no-bot-selected {
  text-align: center;
  color: #7f8c8d;
  font-size: 1em;
  padding: 20px 0;
}
</style>
