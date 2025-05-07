import { authControllerCheckSession } from '@/services/helpfy/api'
import type { UserEntityWithoutSecrets } from '@/services/helpfy/helpfy.schemas'
import { ref } from 'vue'

const user = ref<UserEntityWithoutSecrets>()
const fetching = ref(false)

export const useUser = () => {
  if (!user.value && !fetching.value) {
    fetching.value = true
    authControllerCheckSession()
      .then((data) => {
        user.value = data.data
      })
      .finally(() => {
        fetching.value = false
      })
  }

  return {
    user,
  }
}
