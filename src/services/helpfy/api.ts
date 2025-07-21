// src/api/api.ts

import type {
  // Import ALL necessary DTOs and Entity types used in parameters and responses
  BotAgentControllerFindAllParams,
  BotAgentEntity,
  BotAgentsResponseDto,
  BotControllerFindAllParams,
  BotEntity,
  BotsResponseDto,
  ClientControllerFindAllParams,
  ClientEntity,
  ClientsResponseDto,
  CompletionLogControllerFindAllForJournalParams,
  CompletionLogControllerGetLastMessagesParams,
  CompletionLogsResponseDto,
  CompletionTokenUsageResponseDto,
  CreateBotAgentDto,
  CreateBotCompletionDto,
  CreateBotDto,
  CreateBotKnowledgeDto,
  CreateBotKnowledgeResponseDto,
  CreateClientDto,
  CreateFirstLineDto,
  CreateGigaChatIntegrationDto,
  CreateGptIntegrationProfile,
  CreateKnowledgeGroupDto,
  CreateUserDto,
  CreateYandexGPTIntegrationDto,
  EmbeddingLogsResponseDto,
  EmbeddingTokenUsagesResponseDto,
  FirstLineControllerFindAllParams,
  FirstLineEntity,
  FirstLinesResponseDto,
  GPTModelVersionsDto,
  GigaChatProfileEntity,
  GptIntegrationProfileControllerTestIntegration200,
  GptIntegrationProfileEntity,
  KnowledgeControllerFindAllParams,
  KnowledgeEntity,
  KnowledgeGroupEntity,
  KnowledgeGroupEntityWithDocumentsCount,
  KnowledgeGroupResponseDto,
  KnowledgesResponseDto,
  LLMVersionDtoClass,
  LastMessagesResponse,
  LoginDto,
  MasterLoginDto,
  ResetApiKeyResponseDto,
  ResponseBotCompletionDto,
  ResponseCompletionStatusAsyncDto,
  TotalCompletionTokenUsageDto,
  TotalEmbeddingTokenUsageDto,
  UpdateBotAgentDto,
  UpdateBotDto,
  UpdateBotKnowledgeDto,
  UpdateClientDto,
  UpdateFirstLineDto,
  UpdateGptIntegrationProfile,
  UpdateKnowledgeGroupDto,
  UpdateUserDto,
  UserControllerFindAllParams,
  UserEntity,
  UserEntityWithoutSecrets,
  UsersResponseDto,
  YandexGPTProfileEntity,
} from './helpfy.schemas' // Adjust path if needed
import HDE from '../../plugin' // Adjust path if needed
import { buildUrlWithQuery } from '../../utils/query' // Adjust path if needed

const BASE_URL = `https://${
  HDE.vars.BASE_DOMAIN ? HDE.vars.BASE_DOMAIN : 'sharkov.helpfy.ai'
}/api/v1`

// --- Auth Controller ---

export const authControllerLogin = <TData = { data: UserEntityWithoutSecrets }>(
  loginDto: LoginDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/auth/login`,
    data: JSON.stringify(loginDto),
  })
}

export const authControllerMasterLogin = <TData = { data: boolean }>(
  masterLoginDto: MasterLoginDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/auth/master-login`,
    data: JSON.stringify(masterLoginDto),
  })
}

export const authControllerCheckSession = <
  TData = { data: UserEntityWithoutSecrets }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/auth/check-session`,
  })
}

export const authControllerCheckMasterSession = <
  TData = { data: boolean }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/auth/check-master-session`,
  })
}

export const authControllerLogout = <
  TData = { data: void }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json', // Method doesn't matter much for content type here
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/auth/logout`,
    // No data
  })
}

// --- Bot Controller ---

export const botControllerCreateCompletion = <
  TData = { data: ResponseBotCompletionDto }
>(
  id: string,
  createBotCompletionDto: CreateBotCompletionDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/${id}/completion`,
    data: JSON.stringify(createBotCompletionDto),
  })
}

export const botControllerGetCompletionStatus = <
  TData = { data: ResponseCompletionStatusAsyncDto } // Corrected response type from example
>(
  id: string,
  ticketId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/${id}/completion/${ticketId}`,
  })
}

export const botControllerCreate = <TData = { data: BotEntity }>(
  createBotDto: CreateBotDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/bots`,
    data: JSON.stringify(createBotDto),
  })
}

export const botControllerFindAll = <TData = { data: BotsResponseDto }>(
  params?: BotControllerFindAllParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/bots`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const botControllerFindOne = <TData = { data: BotEntity }>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/${id}`,
  })
}

export const botControllerUpdate = <TData = { data: BotEntity }>(
  id: string,
  updateBotDto: UpdateBotDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/${id}`,
    data: JSON.stringify(updateBotDto),
  })
}

export const botControllerRemove = <TData = { data: BotEntity }>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/${id}`,
  })
}

export const botControllerGetAllGptModelsAndTheirVersions = <
  TData = { data: GPTModelVersionsDto }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/models/all`,
  })
}

export const botControllerGetGptModelVersions = <
  TData = { data: LLMVersionDtoClass[] }
>(
  model: 'gigachat' | 'yandexgpt'
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/bots/models/${model}/versions`,
  })
}

// --- Knowledge Group Controller ---

export const knowledgeGroupControllerCreate = <
  TData = { data: KnowledgeGroupEntity }
>(
  createKnowledgeGroupDto: CreateKnowledgeGroupDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledge-groups`,
    data: JSON.stringify(createKnowledgeGroupDto),
  })
}

export const knowledgeGroupControllerFindAll = <
  TData = { data: KnowledgeGroupResponseDto }
>(): // No params in original function signature
Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledge-groups`,
  })
}

export const knowledgeGroupControllerFindOne = <
  TData = { data: KnowledgeGroupEntityWithDocumentsCount }
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledge-groups/${id}`,
  })
}

export const knowledgeGroupControllerUpdate = <
  TData = { data: KnowledgeGroupEntity }
>(
  id: string,
  updateKnowledgeGroupDto: UpdateKnowledgeGroupDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledge-groups/${id}`,
    data: JSON.stringify(updateKnowledgeGroupDto),
  })
}

export const knowledgeGroupControllerRemove = <
  TData = { data: KnowledgeGroupEntity }
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledge-groups/${id}`,
  })
}

// --- Bot Agent Controller ---

export const botAgentControllerCreate = <TData = { data: BotAgentEntity }>(
  createBotAgentDto: CreateBotAgentDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/bot-agents`,
    data: JSON.stringify(createBotAgentDto),
  })
}

export const botAgentControllerFindAll = <
  TData = { data: BotAgentsResponseDto }
>(
  params: BotAgentControllerFindAllParams // Required param in original
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/bot-agents`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const botAgentControllerFindOne = <TData = { data: BotAgentEntity }>(
  id: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/bot-agents/${id}`,
  })
}

export const botAgentControllerUpdate = <TData = { data: BotAgentEntity }>(
  id: number, // ID is number here
  updateBotAgentDto: UpdateBotAgentDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/bot-agents/${id}`,
    data: JSON.stringify(updateBotAgentDto),
  })
}

export const botAgentControllerRemove = <TData = { data: BotAgentEntity }>(
  id: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/bot-agents/${id}`,
  })
}

// --- Knowledge Controller ---

export const knowledgeControllerFindAll = <
  TData = { data: KnowledgesResponseDto }
>(
  params?: KnowledgeControllerFindAllParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/knowledges`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const knowledgeControllerCreate = <
  TData = { data: CreateBotKnowledgeResponseDto }
>(
  createBotKnowledgeDto: CreateBotKnowledgeDto
): Promise<TData> => {
  // Note: Original API might use multipart/form-data if file uploads are involved.
  // Assuming JSON for now based on DTO structure. HDE.request might need adjustments
  // for form data if that's the case.
  return HDE.request({
    contentType: 'application/json', // Adjust if it's form-data
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledges`,
    data: JSON.stringify(createBotKnowledgeDto), // Adjust if it's form-data
  })
}

export const knowledgeControllerFindOneById = <
  TData = { data: KnowledgesResponseDto } // Original response type seems odd (plural for single ID?), check API spec if unsure
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledges/${id}`,
  })
}

export const knowledgeControllerUpdate = <TData = { data: KnowledgeEntity[] }>(
  id: string,
  updateBotKnowledgeDto: UpdateBotKnowledgeDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json', // Adjust if form-data needed
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledges/${id}`,
    data: JSON.stringify(updateBotKnowledgeDto), // Adjust if form-data
  })
}

export const knowledgeControllerRemove = <TData = { data: KnowledgeEntity[] }>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/knowledges/${id}`,
  })
}

// --- User Controller ---

export const userControllerCreate = <TData = { data: UserEntity }>(
  createUserDto: CreateUserDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/users`,
    data: JSON.stringify(createUserDto),
  })
}

export const userControllerFindAll = <TData = { data: UsersResponseDto }>(
  params?: UserControllerFindAllParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/users`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const userControllerFindOne = <
  TData = { data: UserEntityWithoutSecrets }
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/users/${id}`,
  })
}

export const userControllerUpdate = <TData = { data: UserEntity }>(
  id: string,
  updateUserDto: UpdateUserDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/users/${id}`,
    data: JSON.stringify(updateUserDto),
  })
}

export const userControllerRemove = <
  TData = { data: UserEntityWithoutSecrets }
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/users/${id}`,
  })
}

export const userControllerResetApiKey = <
  TData = { data: ResetApiKeyResponseDto }
>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET', // Original was GET, seems odd for a reset action, but following spec
    auth: 'helpfy',
    url: `${BASE_URL}/users/reset-api-key/${id}`,
  })
}

// --- Client Controller ---

export const clientControllerCreate = <TData = { data: ClientEntity }>(
  createClientDto: CreateClientDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/clients`,
    data: JSON.stringify(createClientDto),
  })
}

export const clientControllerFindAll = <TData = { data: ClientsResponseDto }>(
  params?: ClientControllerFindAllParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/clients`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const clientControllerFindOne = <TData = { data: ClientEntity }>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/clients/${id}`,
  })
}

export const clientControllerUpdate = <TData = { data: ClientEntity }>(
  id: string,
  updateClientDto: UpdateClientDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/clients/${id}`,
    data: JSON.stringify(updateClientDto),
  })
}

export const clientControllerRemove = <TData = { data: ClientEntity }>(
  id: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/clients/${id}`,
  })
}

// --- First Line Controller ---

export const firstLineControllerFindAll = <
  TData = { data: FirstLinesResponseDto }
>(
  params?: FirstLineControllerFindAllParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/first-lines`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const firstLineControllerCreate = <TData = { data: FirstLineEntity }>(
  createFirstLineDto: CreateFirstLineDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/first-lines`,
    data: JSON.stringify(createFirstLineDto),
  })
}

export const firstLineControllerFindOne = <TData = { data: FirstLineEntity }>(
  id: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/first-lines/${id}`,
  })
}

export const firstLineControllerUpdate = <TData = { data: FirstLineEntity }>(
  id: number, // ID is number here
  updateFirstLineDto: UpdateFirstLineDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/first-lines/${id}`,
    data: JSON.stringify(updateFirstLineDto),
  })
}

export const firstLineControllerRemove = <TData = { data: FirstLineEntity }>(
  id: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/first-lines/${id}`,
  })
}

// --- Completion Log Controller ---

export const completionLogControllerFindAllForJournal = <
  TData = { data: CompletionLogsResponseDto }
>(
  params?: CompletionLogControllerFindAllForJournalParams
): Promise<TData> => {
  const url = buildUrlWithQuery(`${BASE_URL}/completion-log/journal`, params)
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

export const completionLogControllerGetLastMessages = <
  TData = { data: LastMessagesResponse }
>(
  botId: string,
  params: CompletionLogControllerGetLastMessagesParams // Required param in original
): Promise<TData> => {
  const url = buildUrlWithQuery(
    `${BASE_URL}/completion-log/history/${botId}`,
    params
  )
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: url,
  })
}

// --- Completion Token Usage Controller ---

export const completionTokenUsageControllerCompletionFindAll = <
  TData = { data: CompletionTokenUsageResponseDto }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/completion-token-usage/completion/all`,
  })
}

export const completionTokenUsageControllerCompletionGetUserTotalTokens = <
  TData = { data: TotalCompletionTokenUsageDto }
>(
  userId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/completion-token-usage/completion/user/${userId}/total`,
  })
}

export const completionTokenUsageControllerCompletionGetBotTotalTokens = <
  TData = { data: TotalCompletionTokenUsageDto }
>(
  botId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/completion-token-usage/completion/bot/${botId}`, // Path typo in original? Missing /total? Assuming based on user/client paths
  })
}

export const completionTokenUsageControllerCompletionGetClientTotalTokens = <
  TData = { data: TotalCompletionTokenUsageDto }
>(
  clientId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/completion-token-usage/completion/client/${clientId}/total`,
  })
}

// --- Embedding Token Usage Controller ---

export const embeddingTokenUsageControllerEmbeddingFindAll = <
  TData = { data: EmbeddingTokenUsagesResponseDto }
>(): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/embedding-token-usage/embedding/all`,
  })
}

export const embeddingTokenUsageControllerEmbeddingGetUserTotalTokens = <
  TData = { data: TotalEmbeddingTokenUsageDto }
>(
  userId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/embedding-token-usage/embedding/user/${userId}/total`,
  })
}

export const embeddingTokenUsageControllerEmbeddingGetBotTotalTokens = <
  TData = { data: TotalEmbeddingTokenUsageDto }
>(
  botId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/embedding-token-usage/embedding/bot/${botId}`, // Path typo in original? Missing /total? Assuming based on user/client paths
  })
}

export const embeddingTokenUsageControllerEmbeddingGetClientTotalTokens = <
  TData = { data: TotalEmbeddingTokenUsageDto }
>(
  clientId: string
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/embedding-token-usage/embedding/client/${clientId}/total`,
  })
}

// --- Embedding Log Controller ---

export const embeddingLogControllerFindAllForJournal = <
  TData = { data: EmbeddingLogsResponseDto }
>(): // No params in original function signature
Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/embedding-log/journal`,
  })
}

// --- GPT Integration Profile Controller ---

export const gptIntegrationProfileControllerCreate = <
  TData = { data: GptIntegrationProfileEntity }
>(
  createGptIntegrationProfile: CreateGptIntegrationProfile
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles`,
    data: JSON.stringify(createGptIntegrationProfile),
  })
}

export const gptIntegrationProfileControllerRemove = <
  TData = { data: GptIntegrationProfileEntity }
>(
  profileId: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'DELETE',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${profileId}`,
  })
}

export const gptIntegrationProfileControllerUpdate = <
  TData = { data: GptIntegrationProfileEntity }
>(
  profileId: number, // ID is number here
  updateGptIntegrationProfile: UpdateGptIntegrationProfile
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${profileId}`,
    data: JSON.stringify(updateGptIntegrationProfile),
  })
}

export const gptIntegrationProfileControllerSetBotIntegrationProfile = <
  TData = { data: BotEntity }
>(
  botId: number, // ID is number here
  profileId: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${botId}/set-profile/${profileId}`,
    // No data
  })
}

export const gptIntegrationProfileControllerGetUserProfiles = <
  TData = { data: GptIntegrationProfileEntity[] }
>(
  userId: number // ID is number here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${userId}/all`,
  })
}

export const gptIntegrationProfileControllerGetYandexGPTCredentials = <
  TData = { data: YandexGPTProfileEntity }
>(
  id: string // ID is string here (inconsistent with others in this controller?)
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${id}/yandexgpt-credentials`,
  })
}

export const gptIntegrationProfileControllerGetGigaChatCredentials = <
  TData = { data: GigaChatProfileEntity }
>(
  id: string // ID is string here
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'GET',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${id}/gigachat-credentials`,
  })
}

export const gptIntegrationProfileControllerUpdateGigaChatCredentials = <
  TData = { data: GigaChatProfileEntity }
>(
  profileId: string, // ID is string here
  createGigaChatIntegrationDto: CreateGigaChatIntegrationDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/gigachat-credentials/${profileId}`,
    data: JSON.stringify(createGigaChatIntegrationDto),
  })
}

export const gptIntegrationProfileControllerUpdateYandexGPTCredentials = <
  TData = { data: YandexGPTProfileEntity }
>(
  profileId: string, // ID is string here
  createYandexGPTIntegrationDto: CreateYandexGPTIntegrationDto
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'PATCH',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/yandexgpt-credentials/${profileId}`,
    data: JSON.stringify(createYandexGPTIntegrationDto),
  })
}

export const gptIntegrationProfileControllerTestIntegration = <
  TData = { data: GptIntegrationProfileControllerTestIntegration200 }
>(
  id: string, // ID is string here
  model: 'gigachat' | 'yandexgpt'
): Promise<TData> => {
  return HDE.request({
    contentType: 'application/json',
    method: 'POST',
    auth: 'helpfy',
    url: `${BASE_URL}/integration-profiles/${id}/test/${model}`,
    // No data
  })
}

// --- Prometheus Controller ---
// This might not be intended for use via HDE.request if it's a metrics endpoint
// for scraping, but translating it anyway. Auth might not be required.

export const prometheusControllerIndex = <
  TData = { data: void }
>(): Promise<TData> => {
  // Note: Prometheus usually expects text/plain; charset=utf-8
  // HDE.request might default to JSON or apply auth unnecessarily.
  // This might need direct fetch or a specialized HDE method if available.
  // Assuming standard HDE.request for translation completeness:
  return HDE.request({
    contentType: 'text/plain', // Or omit contentType if HDE handles based on expected response
    method: 'GET',
    auth: 'helpfy', // Prometheus endpoints usually don't need auth
    url: `https://sharkov.helpfy.ai/metrics`, // Different base URL?
  })
}
