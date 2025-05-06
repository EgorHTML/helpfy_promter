import HDE from '../plugin'

export default function (url, params = {}) {
  const { method, auth, headers } = params

  return HDE.request({
    url,
    method: method || 'GET',
    auth: auth || '',
    headers,
    contentType: 'application/json',
    data: '',
  })
}
