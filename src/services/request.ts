import HDE from '../plugin'

interface IParams {
  method?: string
  auth?: string
  headers?: object
  data?: any
}

interface IError {
  code: string
  title: string
  details: string
}

export default async function (
  url: string,
  params: IParams = { method: 'GET', auth: '', headers: [] }
) {
  const { method, auth, headers, data } = params

  try {
    const res = await HDE.request({
      url,
      method: method || 'GET',
      auth: auth || 'HDE',
      headers,
      contentType: 'application/json',
      data,
    })
    const errors: IError[] | undefined = res?.data?.errors
    if (errors) {
      const details = errors.map((error) => error.details)
      throw new Error(details.join(', '))
    }

    return res
  } catch (error) {
    console.warn(error)
    throw error
  }
}
