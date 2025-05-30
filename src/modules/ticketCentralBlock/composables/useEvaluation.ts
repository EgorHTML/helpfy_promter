import { ref, watch } from 'vue'
import HDE from '@/plugin'
import { useTicket } from './useTicket'

export type TMark = 'like' | 'dislike'

interface IReview {
  ticketId: number
  rate: TMark
  comment: string
}

interface DTOMark {
  createdAt: string
  reviews: IReview[]
}

const mark = ref<TMark | undefined>()
const comment = ref<string>('')

const markSend = ref<boolean>(false)

export const useEvaluation = () => {
  const failedSendMark = ref<string>('')

  watch(mark, () => (failedSendMark.value = ''))

  async function sendMark() {
    if (!mark.value) {
      failedSendMark.value = 'Поставьте оценку'
      throw new Error('Поставьте оценку')
    }

    const prevReviews = await getReviewsOfCurrentDay()

    const data: DTOMark = {
      createdAt: getCurrentDate(),
      reviews: [
        ...prevReviews,
        {
          rate: mark.value,
          comment: comment.value,
          ticketId: HDE.getState().ticketId,
        },
      ],
    }

    try {
      const response = await HDE.request({
        method: 'POST',
        url: `{{Reports_webhook}}`,
        data: JSON.stringify(data),
        contentType: 'application/json',
      })

      if (!response) {
        throw new Error('Ошибка отправки оценки')
      } else {
        markSend.value = true
        failedSendMark.value = ''
      }
    } catch {
      failedSendMark.value = 'При отпраке запроса возникла ошибка'
    }
  }

  async function getReviewsOfCurrentDay(): Promise<IReview[]> {
    const { data } = await HDE.webhook({
      endpoint: 'reports',
      value: getCurrentDate(),
    })

    if (!data?.data?.reviews) return []
    else return data.data.reviews
  }

  function getCurrentDate() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    return `${day}.${month}.${year}`
  }

  return { mark, failedSendMark, comment, markSend, sendMark }
}
