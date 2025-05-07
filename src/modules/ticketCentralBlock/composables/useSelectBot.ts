import type { BotEntity } from '@/services/helpfy/helpfy.schemas'
import { onMounted, ref } from 'vue'
import HDE from '../../../plugin'
import { botControllerFindAll } from '@/services/helpfy/api'

const currentBot = ref<BotEntity>()
const bots = ref<BotEntity[]>([])
const fetching = ref(false)

export const useSelectBot = () => {
  onMounted(async () => {
    const userIdString = HDE.vars.User_id
    if (!userIdString) {
      console.error('User_id не найден в HDE.vars')
      fetching.value = false
      return
    }

    const userId = parseInt(userIdString, 10)
    if (isNaN(userId)) {
      console.error('User_id не является числом:', userIdString)
      fetching.value = false
      return
    }

    if (bots.value.length === 0 && !fetching.value) {
      fetching.value = true
      try {
        const response = await botControllerFindAll({ user_id: userId })
        if (response && response.data && response.data.data) {
          bots.value = response.data.data
        } else {
          console.error('Некорректный ответ от API ботов:', response)
          bots.value = []
        }
      } catch (error) {
        console.error('Ошибка при загрузке ботов:', error)
        bots.value = []
      } finally {
        fetching.value = false
      }

      if (bots.value.length > 0) {
        currentBot.value = bots.value[0]
      } else {
        currentBot.value = undefined
      }
    }
  })

  function setBot(id: number) {
    const foundBot = bots.value.find((bot) => bot.id === id)
    if (foundBot) {
      currentBot.value = foundBot
    } else {
      console.warn(`Бот с ID ${id} не найден.`)
    }
  }

  return {
    currentBot,
    bots,
    setBot,
    fetching,
  }
}
