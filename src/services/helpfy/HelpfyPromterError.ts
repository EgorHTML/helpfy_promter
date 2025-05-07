import type { ResponseCompletionStatusAsyncDtoStatus } from './helpfy.schemas'

export class HelpfyPromterError extends Error {
  public static readonly pendingStatuses:
    | ResponseCompletionStatusAsyncDtoStatus[]
    | 'NETWORK_ERROR'
    | 'TIMEOUT_ERROR'
    | 'INITIALIZATION_ERROR' = [
    'PENDING',
    'IN_PROGRESS_REQUEST',
    'IN_PROGRESS_RESPONSE',
    'RESPONSE_IN_PROCESSING',
  ]

  public originalError?: any
  public status?:
    | ResponseCompletionStatusAsyncDtoStatus
    | 'NETWORK_ERROR'
    | 'TIMEOUT_ERROR'
    | 'INITIALIZATION_ERROR'

  constructor(
    message: string,
    status?: HelpfyPromterError['status'],
    originalError?: any
  ) {
    super(message)
    this.name = 'HelpfyPromterError'
    this.status = status
    this.originalError = originalError
  }
}
