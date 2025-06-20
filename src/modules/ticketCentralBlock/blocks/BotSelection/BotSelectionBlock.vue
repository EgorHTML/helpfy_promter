<script setup lang="ts">
import { useSelectBot } from '../../composables/useSelectBot'
import { ref } from 'vue'
import BotSelectionModal from '../../components/modals/bot/BotSelectionModal.vue'
import CurrentBotDescriptionModal from '../../components/modals/bot/CurrentBotDescriptionModal.vue'

const { bots, currentBot, setBot, fetching } = useSelectBot()

const showBotSelectionModal = ref(false)
const showCurrentBotDescriptionModal = ref(false)

const toggleBotSelectionModal = () => {
  showBotSelectionModal.value = !showBotSelectionModal.value
}

const openCurrentBotDescription = () => {
  if (currentBot.value) {
    showCurrentBotDescriptionModal.value = true
  } else {
    showBotSelectionModal.value = true
  }
}

const handleBotSelected = (botId: number) => {
  setBot(botId)
  showBotSelectionModal.value = false
}
</script>

<template>
  <div class="el-button-group bot-selection-container">
    <button
      type="button"
      class="current-bot-button el-button-custom el-button--mini"
      :title="
        currentBot?.name
          ? `Информация о боте: ${currentBot.name}`
          : 'Нажмите для выбора или просмотра информации о боте'
      "
      @click="openCurrentBotDescription"
    >
      <span v-if="fetching" class="loading-dots"
        ><span>.</span><span>.</span><span>.</span></span
      >
      <span v-else-if="currentBot" class="current-bot-name">
        {{ currentBot.name }}
      </span>
      <span v-else>Выбрать бота</span>
    </button>
    <button
      type="button"
      class="current-bot-take-button el-button-custom el-button--mini"
      aria-label="Открыть выбор ботов"
      @click="toggleBotSelectionModal"
    >
      <span><i class="el-dropdown__icon el-icon-arrow-down"></i></span>
    </button>
  </div>

  <BotSelectionModal
    v-if="showBotSelectionModal"
    :bots="bots"
    :current-bot-id="currentBot?.id"
    @select-bot="handleBotSelected"
    @close="showBotSelectionModal = false"
  />

  <CurrentBotDescriptionModal
    v-if="showCurrentBotDescriptionModal"
    :bot="currentBot"
    @close="showCurrentBotDescriptionModal = false"
  />
</template>

<style scoped>
.el-button-custom {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
}

.el-button-custom:hover,
.el-button-custom:focus {
  color: #23869b;
  border-color: #bddbe1;
  background-color: #e9f3f5;
}

.bot-selection-container {
  margin-left: 10px;
  display: inline-flex;
  vertical-align: middle;
}

.current-bot-button {
  border-width: 1px;

  padding: 7px 12px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.current-bot-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
}

.el-dropdown__caret-button {
  padding: 7px 5px;
  vertical-align: middle;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
}

.loading-dots {
  display: inline-block;
  line-height: 1;
}
.loading-dots span {
  animation: blink 1.4s infinite both;
  font-size: 1.2em;
  opacity: 0;
}
.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
</style>
