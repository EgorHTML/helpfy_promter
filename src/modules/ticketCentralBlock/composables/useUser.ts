import { authControllerCheckSession } from '@/services/helpfy/api'
import type { UserEntityWithoutSecrets } from '@/services/helpfy/helpfy.schemas'
import { ref } from 'vue'

const user = ref<UserEntityWithoutSecrets>()

export const useUser = () => {
  if (!user.value) {
    authControllerCheckSession().then((data) => {
      user.value = data.data
    })
  }

  return {
    user,
  }
}
