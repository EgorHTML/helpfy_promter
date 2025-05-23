/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Helpfy API Documentation
 * Official documentation of the service Helpfy. Available values for the gptServiceName parameter: "yandexgpt", "gigachat"
 * OpenAPI spec version: 1.0
 */
export interface LoginDto {
  /** User email */
  email: string
  /** User api_key value */
  password: string
}

export interface ClientEntity {
  id: number
  client: string
  unique_id: string
  /** @nullable */
  limit: number | null
  created_at: string
  updated_at: string
}

export interface UserEntityWithoutSecrets {
  id: number
  client_id: number
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
  client: ClientEntity
}

export interface MasterLoginDto {
  /** Master email */
  email: string
  /** Master api_key value */
  api_key: string
}

export interface CreateBotCompletionDto {
  /** User id */
  user_id: number
  /** Prompt of the user request */
  prompt: string
}

export interface ResponseBotCompletionDto {
  /** Response message */
  message: string
  /** Created ticket id for request */
  ticket_id: string
}

/**
 * Ticket status string
 */
export type ResponseCompletionStatusAsyncDtoStatus =
  typeof ResponseCompletionStatusAsyncDtoStatus[keyof typeof ResponseCompletionStatusAsyncDtoStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResponseCompletionStatusAsyncDtoStatus = {
  SUCCESS: 'SUCCESS',
  EMPTY_CONTEXT: 'EMPTY_CONTEXT',
  ERROR: 'ERROR',
  HTTP_ERROR: 'HTTP_ERROR',
  GREETING: 'GREETING',
  OPERATOR: 'OPERATOR',
  PENDING: 'PENDING',
  SPAM: 'SPAM',
  IN_PROGRESS_RESPONSE: 'IN_PROGRESS_RESPONSE',
  IN_PROGRESS_REQUEST: 'IN_PROGRESS_REQUEST',
  RESPONSE_IN_PROCESSING: 'RESPONSE_IN_PROCESSING',
} as const

export interface ResponseCompletionStatusAsyncDto {
  /** Unique request id */
  id: number
  /** Ticket status string */
  status: ResponseCompletionStatusAsyncDtoStatus
  /** GPT model response text */
  response: string
  /** Your message prompt */
  prompt: string
  /** Unique ticket id */
  ticket_id: string
  /** Unique user id */
  user_id: number
  /** Error message of webhook response */
  webhook_error: string
  /** Http status code of the webhook response */
  webhook_status: number
  /** Created at date */
  created_at: string
  /** Updated at date */
  updated_at: string
  /** Webhook url for send GPT model response */
  webhook_url: string
  /** Response time in ms */
  response_time_ms: number
  /** Unique bot id */
  bot_id: number
}

/**
 * GPT Model that will be used under the hood of the bot
 */
export type CreateBotDtoGptModel =
  typeof CreateBotDtoGptModel[keyof typeof CreateBotDtoGptModel]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateBotDtoGptModel = {
  yandexgpt: 'yandexgpt',
  gigachat: 'gigachat',
} as const

export interface CreateBotDto {
  /** Bot name */
  name: string
  /** GPT Model that will be used under the hood of the bot */
  gpt_model: CreateBotDtoGptModel
  /** Model version. For gigachat, available versions: GigaChat, GigaChat-2, GigaChat-2-Max, GigaChat-2-Max-preview, GigaChat-2-Pro, GigaChat-2-Pro-preview, GigaChat-2-preview, GigaChat-Max, GigaChat-Max-preview, GigaChat-Plus, GigaChat-Plus-preview, GigaChat-Pro, GigaChat-Pro-preview, GigaChat-preview; For yandexgpt, available versions: yandexgpt-lite, yandexgpt */
  gpt_version?: string
  /** Optional bot webhook url */
  webhook_url?: string
}

export interface UserEntity {
  id: number
  client_id: number
  name: string
  email: string
  password: string
  api_key: string
  role: string
  created_at: string
  updated_at: string
  client: ClientEntity
}

export interface GptIntegrationProfileEntity {
  /**
   * Autoincrement unique id
   */
  id: number
  /**
   * User unique id
   */
  user_id: number
  /**
   * Profile integration name
   */
  name: string
  /**
   * It is default user integration profile?
   */
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface BotEntity {
  id: number
  unique_id: string
  user_id: number
  client_id: number
  integration_profile_id: number
  name: string
  gpt_model: string
  gpt_version: string
  /** @nullable */
  webhook_url?: string | null
  created_at: string
  updated_at: string
  user: UserEntity
  client: ClientEntity
  integration_profile: GptIntegrationProfileEntity
}

export interface PaginationMetaDto {
  /** Total number of records */
  total: number
  /** Number of records skipped */
  skip: number
  /** Number of records taken per page */
  take: number
}

export interface BotsResponseDto {
  data: BotEntity[]
  meta: PaginationMetaDto
}

/**
 * GPT Model that will be used under the hood of the bot
 */
export type UpdateBotDtoGptModel =
  typeof UpdateBotDtoGptModel[keyof typeof UpdateBotDtoGptModel]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateBotDtoGptModel = {
  yandexgpt: 'yandexgpt',
  gigachat: 'gigachat',
} as const

export interface UpdateBotDto {
  /** Bot name */
  name?: string
  /** GPT Model that will be used under the hood of the bot */
  gpt_model?: UpdateBotDtoGptModel
  /** Model version. For gigachat, available versions: GigaChat, GigaChat-2, GigaChat-2-Max, GigaChat-2-Max-preview, GigaChat-2-Pro, GigaChat-2-Pro-preview, GigaChat-2-preview, GigaChat-Max, GigaChat-Max-preview, GigaChat-Plus, GigaChat-Plus-preview, GigaChat-Pro, GigaChat-Pro-preview, GigaChat-preview; For yandexgpt, available versions: yandexgpt-lite, yandexgpt */
  gpt_version?: string
  /** Optional bot webhook url */
  webhook_url?: string
}

export type GPTModelVersionsDtoGigachatItem =
  typeof GPTModelVersionsDtoGigachatItem[keyof typeof GPTModelVersionsDtoGigachatItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GPTModelVersionsDtoGigachatItem = {
  GigaChat: 'GigaChat',
  'GigaChat-2': 'GigaChat-2',
  'GigaChat-2-Max': 'GigaChat-2-Max',
  'GigaChat-2-Max-preview': 'GigaChat-2-Max-preview',
  'GigaChat-2-Pro': 'GigaChat-2-Pro',
  'GigaChat-2-Pro-preview': 'GigaChat-2-Pro-preview',
  'GigaChat-2-preview': 'GigaChat-2-preview',
  'GigaChat-Max': 'GigaChat-Max',
  'GigaChat-Max-preview': 'GigaChat-Max-preview',
  'GigaChat-Plus': 'GigaChat-Plus',
  'GigaChat-Plus-preview': 'GigaChat-Plus-preview',
  'GigaChat-Pro': 'GigaChat-Pro',
  'GigaChat-Pro-preview': 'GigaChat-Pro-preview',
  'GigaChat-preview': 'GigaChat-preview',
} as const

export type GPTModelVersionsDtoYandexgptItem =
  typeof GPTModelVersionsDtoYandexgptItem[keyof typeof GPTModelVersionsDtoYandexgptItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GPTModelVersionsDtoYandexgptItem = {
  'yandexgpt-lite': 'yandexgpt-lite',
  yandexgpt: 'yandexgpt',
} as const

export interface GPTModelVersionsDto {
  /** GigaChat model versions */
  gigachat: GPTModelVersionsDtoGigachatItem[]
  /** YandexGPT model versions */
  yandexgpt: GPTModelVersionsDtoYandexgptItem[]
}

export interface LLMVersionDtoClass {
  value: string
  label: string
}

export interface CreateKnowledgeGroupDto {
  /** Bot id of the knowledge group */
  bot_id: number
  /** Knowledge group name */
  name: string
}

export interface KnowledgeGroupEntity {
  id: number
  unique_id: string
  bot_id: number
  name: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface KnowledgeGroupEntityWithDocumentsCount {
  id: number
  unique_id: string
  bot_id: number
  name: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface KnowledgeGroupResponseDto {
  /** Knowledges list */
  data: KnowledgeGroupEntityWithDocumentsCount[]
  meta: PaginationMetaDto
}

export interface UpdateKnowledgeGroupDto {
  /** Bot id of the knowledge group */
  bot_id?: number
  /** Knowledge group name */
  name?: string
}

export interface CreateBotAgentDto {
  /** Bot id */
  bot_id: number
  name: string
  spam_filter?: string
  /** Spam filter activation toggle */
  spam_filter_is_enabled?: boolean
  system_behavior?: string
  /** System behavior activation toggle */
  system_behavior_is_enabled?: boolean
  executor?: string
  /** Executor behavior activation toggle */
  executor_is_enabled?: boolean
  /** Is this bot agent profile active? */
  is_active?: boolean
}

export interface BotAgentEntity {
  id: number
  unique_id: string
  bot_id: number
  name: string
  /** @nullable */
  spam_filter: string | null
  /** Spam filter activation state */
  spam_filter_is_enabled: boolean
  /** @nullable */
  system_behavior: string | null
  /** System behavior activation state */
  system_behavior_is_enabled: boolean
  /** @nullable */
  executor: string | null
  /** Executor behavior activation state */
  executor_is_enabled: boolean
  is_active: boolean
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface BotAgentsResponseDto {
  data: BotAgentEntity[]
  meta: PaginationMetaDto
}

export interface UpdateBotAgentDto {
  /** Bot id */
  bot_id?: number
  name?: string
  spam_filter?: string
  /** Spam filter activation toggle */
  spam_filter_is_enabled?: boolean
  system_behavior?: string
  /** System behavior activation toggle */
  system_behavior_is_enabled?: boolean
  executor?: string
  /** Executor behavior activation toggle */
  executor_is_enabled?: boolean
  /** Is this bot agent profile active? */
  is_active?: boolean
}

export type KnowledgeEntityType =
  typeof KnowledgeEntityType[keyof typeof KnowledgeEntityType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const KnowledgeEntityType = {
  FILE: 'FILE',
  SITE: 'SITE',
  TEXT: 'TEXT',
} as const

export interface KnowledgeEntity {
  id: number
  unique_id: string
  type: KnowledgeEntityType
  name: string
  content: string
  hash_sum: string
  /** @nullable */
  document_id: string | null
  created_at: string
  updated_at: string
  bot: BotEntity
}

export interface KnowledgesResponseDto {
  /** Knowledges list */
  data: KnowledgeEntity[]
  meta: PaginationMetaDto
}

/**
 * Document type
 */
export type CreateBotKnowledgeDtoType =
  typeof CreateBotKnowledgeDtoType[keyof typeof CreateBotKnowledgeDtoType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateBotKnowledgeDtoType = {
  FILE: 'FILE',
  SITE: 'SITE',
  TEXT: 'TEXT',
} as const

export interface CreateBotKnowledgeDto {
  /** Unique knowledge id */
  document_id?: string
  /** Bot id */
  bot_id: number
  /** Unique knowledge group id */
  knowledge_group_id: number
  /** Name of the knowledge */
  name: string
  /** Document type */
  type: CreateBotKnowledgeDtoType
  /** Content of the knowledge */
  content: string
}

export interface CreateBotKnowledgeResponseDto {
  message: string
  /** It says whether there is already a document with the same hash amount. */
  is_exists: boolean
  /** Knowledge entity data */
  data: KnowledgeEntity
}

/**
 * Document type
 */
export type UpdateBotKnowledgeDtoType =
  typeof UpdateBotKnowledgeDtoType[keyof typeof UpdateBotKnowledgeDtoType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateBotKnowledgeDtoType = {
  FILE: 'FILE',
  SITE: 'SITE',
  TEXT: 'TEXT',
} as const

export interface UpdateBotKnowledgeDto {
  /** Unique knowledge id */
  document_id?: string
  /** Bot id */
  bot_id?: number
  /** Unique knowledge group id */
  knowledge_group_id?: number
  /** Name of the knowledge */
  name?: string
  /** Document type */
  type?: UpdateBotKnowledgeDtoType
  /** Content of the knowledge */
  content?: string
}

export interface CreateUserDto {
  /** User client id */
  client_id: number
  /** User name */
  name: string
  /** User unique email */
  email: string
  /** User password */
  password?: string
}

export interface UsersResponseDto {
  data: UserEntityWithoutSecrets[]
  meta: PaginationMetaDto
}

export interface UpdateUserDto {
  /** User client id */
  client_id?: number
  /** User name */
  name?: string
  /** User unique email */
  email?: string
  /** User password */
  password?: string
}

export interface ResetApiKeyResponseDto {
  api_key: string
}

export interface CreateClientDto {
  /** Client name */
  client: string
  /** Client requests limit value */
  limit?: number
}

export interface ClientsResponseDto {
  data: ClientEntity[]
  meta: PaginationMetaDto
}

export interface UpdateClientDto {
  /** Client name */
  client?: string
  /** Client requests limit value */
  limit?: number
}

export interface CompletionResponseDto {
  /** @nullable */
  statusCode?: number | null
  /** @nullable */
  message?: string | null
}

/**
 * Response type
 */
export type ResponseType = typeof ResponseType[keyof typeof ResponseType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResponseType = {
  SUCCESS: 'SUCCESS',
  EMPTY_CONTEXT: 'EMPTY_CONTEXT',
  ERROR: 'ERROR',
  HTTP_ERROR: 'HTTP_ERROR',
  GREETING: 'GREETING',
  OPERATOR: 'OPERATOR',
  PENDING: 'PENDING',
  SPAM: 'SPAM',
  IN_PROGRESS_RESPONSE: 'IN_PROGRESS_RESPONSE',
  IN_PROGRESS_REQUEST: 'IN_PROGRESS_REQUEST',
  RESPONSE_IN_PROCESSING: 'RESPONSE_IN_PROCESSING',
} as const

export interface CompletionMessageDto {
  /** Unified response */
  response: CompletionResponseDto
  /** Meta information from request */
  meta: CreateBotCompletionDto
  error: boolean
  type: ResponseType
}

export type FirstLineEntityAction =
  typeof FirstLineEntityAction[keyof typeof FirstLineEntityAction]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FirstLineEntityAction = {
  ANSWER: 'ANSWER',
  OPERATOR: 'OPERATOR',
} as const

export type FirstLineEntityStatus =
  typeof FirstLineEntityStatus[keyof typeof FirstLineEntityStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FirstLineEntityStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export interface FirstLineEntity {
  /** Autoincrement unique id */
  id: number
  /** Unique identifier associated with the completion log */
  unique_id: string
  /** Bot unique id */
  bot_id: number
  /** Main question for first line */
  main_question: string
  /**
   * Similar questions with `
` separator
   * @nullable
   */
  similar_questions: string | null
  /** Question answer */
  answer: string
  action: FirstLineEntityAction
  status: FirstLineEntityStatus
  created_at: string
  updated_at: string
}

export interface FirstLinesResponseDto {
  data: FirstLineEntity[]
  meta: PaginationMetaDto
}

export type CreateFirstLineDtoAction =
  typeof CreateFirstLineDtoAction[keyof typeof CreateFirstLineDtoAction]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateFirstLineDtoAction = {
  ANSWER: 'ANSWER',
  OPERATOR: 'OPERATOR',
} as const

export type CreateFirstLineDtoStatus =
  typeof CreateFirstLineDtoStatus[keyof typeof CreateFirstLineDtoStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateFirstLineDtoStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export interface CreateFirstLineDto {
  /** Bot id */
  bot_id: number
  /** Main question for first line */
  main_question: string
  /** Similar questions with `
` separator */
  similar_questions?: string
  /** Question answer */
  answer: string
  action: CreateFirstLineDtoAction
  status: CreateFirstLineDtoStatus
}

export type UpdateFirstLineDtoAction =
  typeof UpdateFirstLineDtoAction[keyof typeof UpdateFirstLineDtoAction]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateFirstLineDtoAction = {
  ANSWER: 'ANSWER',
  OPERATOR: 'OPERATOR',
} as const

export type UpdateFirstLineDtoStatus =
  typeof UpdateFirstLineDtoStatus[keyof typeof UpdateFirstLineDtoStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateFirstLineDtoStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export interface UpdateFirstLineDto {
  /** Bot id */
  bot_id?: number
  /** Main question for first line */
  main_question?: string
  /** Similar questions with `
` separator */
  similar_questions?: string
  /** Question answer */
  answer?: string
  action?: UpdateFirstLineDtoAction
  status?: UpdateFirstLineDtoStatus
}

/**
 * Type of token usage (e.g., COMPLETION, EMBEDDING)
 */
export type CompletionTokenUsageEntityType =
  typeof CompletionTokenUsageEntityType[keyof typeof CompletionTokenUsageEntityType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CompletionTokenUsageEntityType = {
  REGULAR: 'REGULAR',
  CLASSIFICATION: 'CLASSIFICATION',
} as const

/**
 * Used GPT model
 */
export type CompletionTokenUsageEntityGptModel =
  typeof CompletionTokenUsageEntityGptModel[keyof typeof CompletionTokenUsageEntityGptModel]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CompletionTokenUsageEntityGptModel = {
  yandexgpt: 'yandexgpt',
  gigachat: 'gigachat',
} as const

export interface CompletionTokenUsageEntity {
  /** Type of token usage (e.g., COMPLETION, EMBEDDING) */
  type: CompletionTokenUsageEntityType
  /** Unique numeric identifier */
  id: number
  /** Unique string identifier */
  unique_id: string
  /** Associated ticket identifier */
  ticket_id: string
  /** Creation timestamp in ISO format */
  created_at: string
  /** Associated completion log ID */
  completion_log_id: number
  /** Used GPT model */
  gpt_model: CompletionTokenUsageEntityGptModel
  /** GPT model version */
  gpt_version: string
  /** Number of tokens used */
  tokens_used: number
}

export interface CompletionLogEntityWithTokenUsage {
  /** Autoincrement identifier of the completion log */
  id: number
  /** Unique identifier associated with the completion log */
  unique_id: string
  /** User identifier */
  user_id: number
  /** Bot identifier */
  bot_id: number
  /** Ticket identifier associated with the completion log */
  ticket_id: string
  /** The content of the prompt */
  prompt: string
  /**
   * The response content (if available)
   * @nullable
   */
  response: string | null
  /** Status of the completion (e.g. PENDING) */
  status: string
  /**
   * Webhook URL if provided
   * @nullable
   */
  webhook_url: string | null
  /**
   * Webhook response error message
   * @nullable
   */
  webhook_error: string | null
  /**
   * Webhook response status code
   * @nullable
   */
  webhook_status: number | null
  /**
   * Response time in milliseconds (if available)
   * @nullable
   */
  response_time_ms: number | null
  /** Timestamp when the message log was created */
  created_at: string
  /** Timestamp when the message log was last updated */
  updated_at: string
  /** Array of completion token usage records */
  completion_token_usages: CompletionTokenUsageEntity[]
}

export interface CompletionLogsResponseDto {
  /** Array of completion log records */
  data: CompletionLogEntityWithTokenUsage[]
  meta: PaginationMetaDto
}

/**
 * Sender role (user or bot)
 */
export type ChatMessageDtoRole =
  typeof ChatMessageDtoRole[keyof typeof ChatMessageDtoRole]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ChatMessageDtoRole = {
  user: 'user',
  bot: 'bot',
} as const

export interface ChatMessageDto {
  /** Sender role (user or bot) */
  role: ChatMessageDtoRole
  /** Message text */
  text: string
  /** Creation date */
  created_at: string
}

export interface LastMessagesResponse {
  /** List of last messages in chronological order */
  data: ChatMessageDto[]
}

export interface CompletionLogEntity {
  /** Autoincrement identifier of the completion log */
  id: number
  /** Unique identifier associated with the completion log */
  unique_id: string
  /** User identifier */
  user_id: number
  /** Bot identifier */
  bot_id: number
  /** Ticket identifier associated with the completion log */
  ticket_id: string
  /** The content of the prompt */
  prompt: string
  /**
   * The response content (if available)
   * @nullable
   */
  response: string | null
  /** Status of the completion (e.g. PENDING) */
  status: string
  /**
   * Webhook URL if provided
   * @nullable
   */
  webhook_url: string | null
  /**
   * Webhook response error message
   * @nullable
   */
  webhook_error: string | null
  /**
   * Webhook response status code
   * @nullable
   */
  webhook_status: number | null
  /**
   * Response time in milliseconds (if available)
   * @nullable
   */
  response_time_ms: number | null
  /** Timestamp when the message log was created */
  created_at: string
  /** Timestamp when the message log was last updated */
  updated_at: string
}

export interface CompletionTokenUsageEntityWithCompletionLog {
  id: number
  ticket_id: string
  /** Unique identifier associated with the completion token usage */
  unique_id: string
  gpt_model: string
  gpt_version: string
  tokens_used: number
  created_at: string
  completion_log: CompletionLogEntity
}

export interface CompletionTokenUsageResponseDto {
  /** Completion token usages with completion log entity list */
  data: CompletionTokenUsageEntityWithCompletionLog[]
  meta: PaginationMetaDto
}

export interface TotalCompletionTokenUsageDto {
  /** User/Bot/Client id */
  id: number
  /** Spent number of tokens per request */
  total_tokens: number
}

export interface EmbeddingTokenUsageEntity {
  /** Autoincrement identifier of the embedding token usage */
  id: number
  /** Unique identifier associated with the embedding token usage */
  unique_id: string
  /** Embedding log identifier */
  embedding_log_id: number
  /** Ticket identifier associated with the embedding embedding token usage */
  ticket_id: string
  gpt_model: string
  gpt_version: string
  /** Token used for create embedding */
  tokens_used: number
  /** Timestamp when the message log was created */
  created_at: string
}

/**
 * The embedding content (if available)
 * @nullable
 */
export type EmbeddingLogEntityEmbedding = { [key: string]: unknown } | null

export interface EmbeddingLogEntity {
  /** Autoincrement identifier of the embedding log */
  id: number
  /** Unique identifier associated with the embedding log */
  unique_id: string
  /** User identifier */
  user_id: number
  /** Bot identifier */
  bot_id: number
  /** Ticket identifier associated with the embedding log */
  ticket_id: string
  /** The content of the prompt */
  content: string
  /**
   * The embedding content (if available)
   * @nullable
   */
  embedding: EmbeddingLogEntityEmbedding
  /** Status of the embedding (e.g. PENDING) */
  status: string
  /**
   * Response time in milliseconds (if available)
   * @nullable
   */
  embedding_time_ms: number | null
  /** Timestamp when the message log was created */
  created_at: string
  /** Timestamp when the message log was last updated */
  updated_at: string
  /** Embedding token usage records */
  embedding_token_usages: EmbeddingTokenUsageEntity[]
}

export interface EmbeddingTokenUsageEntityWithEmbeddingLog {
  /** Autoincrement identifier of the embedding token usage */
  id: number
  /** Unique identifier associated with the embedding token usage */
  unique_id: string
  /** Embedding log identifier */
  embedding_log_id: number
  /** Ticket identifier associated with the embedding embedding token usage */
  ticket_id: string
  gpt_model: string
  gpt_version: string
  /** Token used for create embedding */
  tokens_used: number
  /** Timestamp when the message log was created */
  created_at: string
  embedding_log: EmbeddingLogEntity
}

export interface EmbeddingTokenUsagesResponseDto {
  /** Embedding token usages with embedding log entity list */
  data: EmbeddingTokenUsageEntityWithEmbeddingLog[]
  meta: PaginationMetaDto
}

export interface TotalEmbeddingTokenUsageDto {
  /** User/Bot/Client id */
  id: number
  /** Spent number of tokens per request */
  total_tokens: number
}

/**
 * The embedding content (if available)
 * @nullable
 */
export type EmbeddingLogEntityWithEmbeddingTokenUsageEmbedding = {
  [key: string]: unknown
} | null

export interface EmbeddingLogEntityWithEmbeddingTokenUsage {
  /** Autoincrement identifier of the embedding log */
  id: number
  /** Unique identifier associated with the embedding log */
  unique_id: string
  /** User identifier */
  user_id: number
  /** Bot identifier */
  bot_id: number
  /** Ticket identifier associated with the embedding log */
  ticket_id: string
  /** The content of the prompt */
  content: string
  /**
   * The embedding content (if available)
   * @nullable
   */
  embedding: EmbeddingLogEntityWithEmbeddingTokenUsageEmbedding
  /** Status of the embedding (e.g. PENDING) */
  status: string
  /**
   * Response time in milliseconds (if available)
   * @nullable
   */
  embedding_time_ms: number | null
  /** Timestamp when the message log was created */
  created_at: string
  /** Timestamp when the message log was last updated */
  updated_at: string
  /** Array of embedding token usage records */
  embedding_token_usages: EmbeddingTokenUsageEntity[]
}

export interface EmbeddingLogsResponseDto {
  /** Array of embedding log records */
  data: EmbeddingLogEntityWithEmbeddingTokenUsage[]
  meta: PaginationMetaDto
}

export interface CreateGptIntegrationProfile {
  /** User id */
  user_id: number
  /** Integration profile name */
  name: string
}

export interface UpdateGptIntegrationProfile {
  /** User id */
  user_id?: number
  /** Integration profile name */
  name?: string
}

export interface YandexGPTProfileEntity {
  /**
   * Autoincrement unique id
   */
  id: number
  /**
   * Unique profile integration id
   */
  profile_id: number
  /**
   * Has the integration been confirmed by a test request and is working successfully?
   */
  is_approved: boolean
  /**
   * API key for authenticating with YandexGPT services
   */
  api_key: string
  /**
   * The URI of the YandexGPT model to use
   */
  model_uri: string
  created_at: string
  updated_at: string
}

export interface GigaChatProfileEntity {
  /**
   * Autoincrement unique id
   */
  id: number
  /**
   * Unique profile integration id
   */
  profile_id: number
  /**
   * Has the integration been confirmed by a test request and is working successfully?
   */
  is_approved: boolean
  /**
   * API key for authenticating with GigaChat services
   */
  api_key: string
  /**
   * Request unique identifier for GigaChat API calls
   */
  rquid: string
  /**
   * Access scope for GigaChat API
   */
  scope: string
  /**
   * Temporary short-lived token
   * @nullable
   */
  access_token: string | null
  /**
   * The time until the expiration of the temporary short-lived token
   * @nullable
   */
  access_token_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateGigaChatIntegrationDto {
  /** API key for authenticating with GigaChat services */
  api_key: string
  /** Request unique identifier for GigaChat API calls */
  rquid: string
  /** Access scope for GigaChat API */
  scope: string
}

export interface CreateYandexGPTIntegrationDto {
  /** API key for authenticating with YandexGPT services */
  api_key: string
  /** The URI of the YandexGPT model to use */
  model_uri: string
}

export type BotControllerFindAllParams = {
  user_id?: number
  /**
   * Search string
   */
  search?: unknown
  /**
   * Number of records to return (default: 10)
   */
  take?: unknown
  /**
   * Number of records to skip (default: 0)
   */
  skip?: unknown
}

export type BotAgentControllerFindAllParams = {
  /**
   * Number of records to return (default: 10)
   */
  take?: unknown
  /**
   * Number of records to skip (default: 0)
   */
  skip?: unknown
  /**
   * Id of the bot whose agents we want to retrieve
   */
  bot_id: unknown
}

export type KnowledgeControllerFindAllParams = {
  take?: unknown
  skip?: unknown
  /**
   * Search string
   */
  search?: unknown
  /**
   * Filter by knowledge group id
   */
  group_id?: unknown
  /**
   * Filter by bot id
   */
  bot_id?: unknown
}

export type UserControllerFindAllParams = {
  /**
   * Filter users by name, email and unique_id containing this string
   */
  search?: unknown
  /**
   * Number of records to return (default: 10)
   */
  take?: unknown
  /**
   * Number of records to skip for pagination (default: 0)
   */
  skip?: unknown
}

export type ClientControllerFindAllParams = {
  /**
   * Filter clients by client and unique_id containing this string
   */
  search?: unknown
  /**
   * Number of records to return (default: 10)
   */
  take?: unknown
  /**
   * Number of records to skip for pagination (default: 0)
   */
  skip?: unknown
}

export type FirstLineControllerFindAllParams = {
  /**
   * Number of records to return (default: 10)
   */
  take?: number
  /**
   * Number of records to skip for pagination (default: 0)
   */
  skip?: number
  /**
   * Filter by status (e.g. open, closed, etc.)
   */
  status?: string
  /**
   * Search string to filter questions by text/content
   */
  search?: string
  /**
   * Filter by a specific Bot id
   */
  bot_id?: number
}

export type CompletionLogControllerFindAllForJournalParams = {
  end_date?: unknown
  start_date?: unknown
  status?: unknown
  ticket_id?: unknown
  bot_id?: unknown
  take?: unknown
  skip?: unknown
  search?: unknown
}

export type CompletionLogControllerGetLastMessagesParams = {
  /**
   * Number of last messages to retrieve
   */
  limit: number
}

export type GptIntegrationProfileControllerTestIntegration200 = {
  /** Indicates whether the integration test was successful */
  success?: boolean
}
