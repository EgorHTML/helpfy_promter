export function getCurrentUser() {
  const ticketAppInitialState = window.parent.document.querySelector(
    '#ticketAppInitialState'
  )

  if (!ticketAppInitialState?.innerHTML) return

  const data = JSON.parse(ticketAppInitialState.innerHTML)
  const userId = data.currentUser.userId

  return data.usersOnline.find((user: any) => user.id === userId)
}

export function getCurrentUserFromMenuApp() {
  const ticketAppInitialState = window.parent.document.querySelector(
    '#menuAppInitialState'
  )

  if (!ticketAppInitialState?.innerHTML) return

  const data = JSON.parse(ticketAppInitialState.innerHTML)
  const user = data.currentUser

  return user
}
