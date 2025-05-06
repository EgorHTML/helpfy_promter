import type { BotEntity } from '@/services/helpfy/helpfy.schemas'
import { onMounted, ref, watch } from 'vue'
import HDE from '../../../plugin'
import { botControllerFindAll } from '@/services/helpfy/api'

const currentBot = ref<BotEntity>()
const bots = ref<BotEntity[]>([])
const fetching = ref(false)

export const useSelectBot = () => {
  onMounted(async () => {
    if (bots.value.length === 0 && !fetching.value) {
      fetching.value = true
      bots.value = (
        await botControllerFindAll({ user_id: HDE.vars.User_id })
      ).data.data
      fetching.value = false
      currentBot.value = bots.value[0] ? bots.value[0] : undefined
    }
  })

  function setBot(id: number) {
    currentBot.value = bots.value.find((bot) => bot.id === id)
  }

  return {
    currentBot,
    bots,
    setBot,
  }
}
