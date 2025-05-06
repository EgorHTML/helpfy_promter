export const cleanQuery = (
  obj: Record<string, any> | undefined
): Record<string, string> => {
  if (!obj) return {}
  const cleaned: Record<string, string> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      if (value !== undefined && value !== null) {
        cleaned[key] = String(value)
      }
    }
  }
  return cleaned
}

export const buildUrlWithQuery = (
  baseUrl: string,
  params?: Record<string, any>
): string => {
  const cleanedParams = cleanQuery(params)
  const queryString = new URLSearchParams(cleanedParams).toString()
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`
}
