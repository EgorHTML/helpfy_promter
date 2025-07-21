import { ref, watch } from 'vue'
import HDE from '@/plugin'
import { useTicket, type IMessage } from './useTicket'
import { createTicket } from '@/services/hde/ticket'
import { getCurrentUser } from '@/utils/user'
import { removeOuterHtmlTag } from '@/utils/parseMessage'

export type TMark = 'like' | 'dislike'

interface IOwner {
  id: number
  name: string
}

interface IReview {
  ticketId: number
  owner: IOwner
  rate: TMark
  comment: string
  uniqueId: string
  reviewTicketId?: number
}

interface DTOMark {
  createdAt: string
  reviews: IReview[]
}

const mark = ref<TMark | undefined>()
const comment = ref<string>('')

const markSend = ref<boolean>(false)

export const useEvaluation = () => {
  const { answersFromPromter, messages } = useTicket()
  const failedSendMark = ref<string>('')

  watch(mark, () => (failedSendMark.value = ''))

  watch(answersFromPromter, () => {
    markSend.value = false
    mark.value = undefined
  })

  async function sendMark() {
    if (!mark.value) {
      failedSendMark.value = 'Поставьте оценку'
      throw new Error('Поставьте оценку')
    }
    const state = HDE.getState()
    const prevReviews = await getReviewsOfCurrentDay()

    let negativeTicket

    const data: DTOMark = {
      createdAt: getCurrentDate(),
      reviews: [
        ...prevReviews,
        {
          rate: mark.value,
          comment: comment.value,
          ticketId: state.ticketId,
          owner: getCurrentOwner(),
          uniqueId: state.ticketValues.uniqueId,
        },
      ],
    }

    try {
      if (mark.value === 'dislike') {
        negativeTicket = await createNegativeReport()
        data.reviews[data.reviews.length - 1].reviewTicketId = negativeTicket.id
      }

      const response1 = await HDE.request({
        method: 'POST',
        url: `{{Reports_webhook}}`,
        data: JSON.stringify(data),
        contentType: 'application/json',
      })

      const response2 = await HDE.request({
        method: 'POST',
        url: `{{Reports_plugin}}`,
        data: JSON.stringify(data),
        contentType: 'application/json',
      })

      if (!response1.data || !response2.data) {
        throw new Error('Ошибка отправки оценки')
      } else {
        markSend.value = true
        failedSendMark.value = ''
      }
    } catch {
      failedSendMark.value = 'При отпраке запроса возникла ошибка'
    }
  }

  function getCurrentOwner(): IOwner {
    const state = HDE.getState()
    const ownerId = state.ticketValues.ownerId

    if (ownerId) {
      const owners: IOwner[] = state.ticketData.owners

      const owner: IOwner | undefined = owners.find(
        (owner) => owner.id === ownerId
      )

      return owner ?? { id: ownerId, name: 'Сотрудник' }
    } else {
      return { id: 0, name: 'Исполнитель не был присвоен' }
    }
  }

  async function getReviewsOfCurrentDay(): Promise<IReview[]> {
    const { data } = await HDE.webhook({
      endpoint: 'reports',
      value: getCurrentDate(),
    })

    if (Array.isArray(data?.data?.reviews)) return data.data.reviews
    else return []
  }

  function getCurrentDate() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    return `${day}.${month}.${year}`
  }

  async function createNegativeReport() {
    return createTicket({
      title: `[Cуфлер - Негативная оценка] - #${
        HDE.getState().ticketValues.uniqueId
      }`,
      description: getCombinedPosts(messages.value),
      user_id: getCurrentUser().id,
    })
  }

  function getCombinedPosts(posts: IMessage[]) {
    const state = HDE.getState()
    let res = `<a href='${window.location.origin}/ru/ticket/list/filter/id/0/ticket/${state.ticketId}'>${state.ticketValues.uniqueId} : ${state.ticketValues.title}</a><br><br>`

    posts.forEach((post) => {
      res += `[${post.date_created}] ${post.user.name}: ${removeOuterHtmlTag(
        post.content
      )} <br>`
    })

    return res.replaceAll('\n', '<br>')
  }

  return { mark, failedSendMark, comment, markSend, sendMark }
}
