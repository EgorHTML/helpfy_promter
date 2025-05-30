import { ref } from 'vue'
import HDE from '@/plugin'

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

export const useEvaluation = () => {
  const failedSendMark = ref<boolean>(false)

  function setMark(flag: TMark) {
    mark.value = flag
  }

  function setComment(text: string) {
    comment.value = text
  }

  async function sendMark() {
    if (!mark.value) throw new Error('Поставьте оценку')

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

    HDE.request({
      method: 'POST',
      url: `{{Reports_webhoo}}`,
      data: JSON.stringify(data),
      contentType: 'application/json',
    })
      .then(() => {
        failedSendMark.value = false
      })
      .catch(() => {
        failedSendMark.value = true
      })
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

  return { mark, failedSendMark, setMark, setComment, sendMark }
}
