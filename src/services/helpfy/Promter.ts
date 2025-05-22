import {
  botControllerCreateCompletion,
  botControllerGetCompletionStatus,
} from '../helpfy/api'
import type {
  CreateBotCompletionDto,
  ResponseCompletionStatusAsyncDto,
} from './helpfy.schemas'
import { HelpfyPromterError } from './HelpfyPromterError'

export default class HelpfyPromter {
  private readonly userId: number
  private botId: string

  private readonly activeTickets: Set<string> = new Set()

  private readonly CHECK_INTERVAL_MS: number = 3000
  private readonly MAX_WAIT_TIME_MS: number = 30000

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
      let elapsedTime = 0

      const intervalId = setInterval(async () => {
        elapsedTime += this.CHECK_INTERVAL_MS

        if (elapsedTime > this.MAX_WAIT_TIME_MS) {
          clearInterval(intervalId)
          this.activeTickets.delete(ticket_id)
          reject(
            new HelpfyPromterError(
              `Превышено время ожидания ответа для тикета ${ticket_id}.`,
              'TIMEOUT_ERROR'
            )
          )
          return
        }

        try {
          const response = await botControllerGetCompletionStatus(
            this.botId,
            ticket_id
          )
          const statusData = response.data

          if (!HelpfyPromterError.pendingStatuses.includes(statusData.status)) {
            clearInterval(intervalId)
            resolve(statusData)
          }
        } catch (error: any) {
          clearInterval(intervalId)
          this.activeTickets.delete(ticket_id)
          console.error(
            `HelpfyPromter: Ошибка при получении статуса для ticket_id ${ticket_id}:`,
            error
          )
          reject(
            new HelpfyPromterError(
              `Ошибка получения статуса для тикета ${ticket_id}: ${
                error.message || 'Неизвестная ошибка API'
              }`,
              'NETWORK_ERROR',
              error
            )
          )
        }
      }, this.CHECK_INTERVAL_MS)
    })
  }

  public async asc(text: string): Promise<ResponseCompletionStatusAsyncDto> {
    if (!text || !text.trim()) {
      throw new HelpfyPromterError(
        'Prompt не может быть пустым.',
        'INITIALIZATION_ERROR'
      )
    }

    const createDto: CreateBotCompletionDto = {
      user_id: this.userId,
      prompt: text,
    }

    let ticketId: string | undefined

    try {
      const response = await botControllerCreateCompletion(
        this.botId,
        createDto
      )
      const creationData = response.data
      ticketId = creationData.ticket_id

      if (!ticketId) {
        throw new HelpfyPromterError(
          'API не вернуло ticket_id при создании запроса.',
          'NETWORK_ERROR'
        )
      }

      this.activeTickets.add(ticketId)
      return await this.getAnswerAsync(ticketId)
    } catch (error: any) {
      console.error('HelpfyPromter: Ошибка в ask:', error)
      if (error instanceof HelpfyPromterError) {
        throw error
      }

      throw new HelpfyPromterError(
        `Ошибка при взаимодействии с Helpfy API: ${
          error.message || 'Неизвестная ошибка'
        }`,
        'NETWORK_ERROR',
        error
      )
    } finally {
      if (ticketId) {
        this.activeTickets.delete(ticketId)
      }
    }
  }
}
