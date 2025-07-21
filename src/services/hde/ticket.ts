import request from '../request'

export interface CreateTicketDTO {
  title: string
  description: string
  user_id?: number
}

export function createTicket(ticketData: CreateTicketDTO) {
  return request(`${window.location.origin}/api/v2/tickets/`, {
    method: 'POST',
    data: JSON.stringify(ticketData),
  })
    .then((data: any) => data.data.data)
    .catch(() => {
      console.warn('Не удалось создать заявку')
    })
}
