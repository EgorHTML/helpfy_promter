import {
  botControllerCreateCompletion,
  botControllerGetCompletionStatus,
} from '../helpfy/api'
import type { ResponseCompletionStatusAsyncDto } from './helpfy.schemas'

export default class HelpfyPromter {
  private readonly userId: number
  private botId: string

  private readonly activeTickets: Set<string> = new Set()

  constructor(userId: number, botId: string) {
    this.userId = userId
    this.botId = botId
  }

  public hasActiveRequests(): boolean {
    return this.activeTickets.size > 0
  }

  public setBotId(id: string) {
    this.botId = id
  }

  private getAnswerAsync(
    ticket_id: string
  ): Promise<ResponseCompletionStatusAsyncDto> {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        botControllerGetCompletionStatus(this.botId, ticket_id).then((data) => {
          if (
            data.data.status === 'SUCCESS' ||
            data.data.status === 'GREETING'
          ) {
            clearInterval(intervalId)
            resolve(data.data)
          }
        })
      }, 3000)

      setTimeout(() => {
        clearInterval(intervalId)
      }, 14000)
    })
  }

  public asc(promt: string): Promise<ResponseCompletionStatusAsyncDto> {
    if (!promt) throw new Error('Prompt undefined.')

    return new Promise((resolve, reject) => {
      botControllerCreateCompletion(this.botId, {
        user_id: this.userId,
        prompt: promt,
      })
        .then(async (data) => {
          const ticket_id = data.data.ticket_id
          this.activeTickets.add(ticket_id)

          try {
            const answer = await this.getAnswerAsync(ticket_id)
            resolve(answer)
          } catch (error) {
            reject(error)
          } finally {
            this.activeTickets.delete(ticket_id)
          }
        })
        .catch(reject)
    })
  }
}
