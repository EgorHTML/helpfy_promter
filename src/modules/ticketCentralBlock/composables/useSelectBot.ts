import type {
  BotEntity,
  UserEntityWithoutSecrets,
} from '@/services/helpfy/helpfy.schemas'
import { ref, watch } from 'vue'
import { botControllerFindAll } from '@/services/helpfy/api'
import { useUser } from './useUser'
import HelpfyPromter from '@/services/helpfy/Promter'
import HDE from '@/plugin'
import defaultBotConfig from '@/utils/defaultBotConfig'
import { getCurrentUserFromMenuApp } from '@/utils/user'

const currentBot = ref<BotEntity>()
const bots = ref<BotEntity[]>([])
const fetching = ref(false)
const promter = ref<HelpfyPromter>()

export const useSelectBot = () => {
  const { user } = useUser()
  watch(user, async (newUser) => {
    if (bots.value.length === 0) {
      await getAllBots(newUser)
      takeDefaultBot()
    }
  })

  watch(
    currentBot,
    (newBot) => {
      if (newBot) {
        if (!promter.value && user.value) {
          promter.value = new HelpfyPromter(user.value.id, String(newBot.id))
        } else if (promter.value) {
          promter.value.setBotId(String(newBot.id))
        }
      }
    },
    { immediate: true }
  )

  function takeDefaultBot() {
    if (HDE.vars.Default_bot_config_for_group) {
      const botForGroups = defaultBotConfig()
      const currentUser = getCurrentUserFromMenuApp()
      const expectedId = botForGroups.get(String(currentUser.groupId))
      const bot = bots.value.find((bot) => bot.id == expectedId)

      currentBot.value = bot
    }

    if (bots.value.length > 0 && !currentBot.value) {
      currentBot.value = bots.value[0]
    }
  }

  async function getAllBots(user: UserEntityWithoutSecrets | undefined) {
    if (!fetching.value && user) {
      fetching.value = true
      try {
        const response = await botControllerFindAll({ user_id: user.id })
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
    }
  }

  function setBot(id: number) {
    const foundBot = bots.value.find((bot) => bot.id === id)
    if (foundBot) {
      currentBot.value = foundBot
    } else {
      console.warn(`Бот с ID ${id} не найден.`)
      return
    }

    if (promter.value) {
      promter.value.setBotId(`${id}`)
    }
  }

  return {
    promter,
    currentBot,
    bots,
    setBot,
    fetching,
  }
}
