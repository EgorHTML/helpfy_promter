export function addHandlerButton() {
  const buttonHandler = document.createElement('button')
  buttonHandler.title = 'handler'
  buttonHandler.className = 'ticket-conversation__actions-edit-button handler'

  buttonHandler.innerHTML = ` <i class="el-icon-c-scale-to-original">
  </i>`

  const config = { attributes: false, childList: true, subtree: true }
  const observer = new MutationObserver(onMessage)
  const messagesContainer = window.parent.document.querySelector(
    '.ticket-conversation__messages'
  )

  if (messagesContainer) observer.observe(messagesContainer, config)

  setPluginInMessages()

  function setPluginInMessages() {
    getMessageNodes().forEach((message) => setScalePluginInMessage(message))
  }

  function onMessage(mutationList: MutationRecord[]) {
    let addedMessage
    for (let i = 0; i < mutationList.length; i++) {
      const mutation = mutationList[i]
      const target = mutation.target as HTMLElement
      const previousSibling = mutation?.previousSibling as HTMLElement

      if (
        target?.classList.contains('ticket-conversation__messages') &&
        !window.parent.document.body.contains(mutation.nextSibling) &&
        mutation.removedNodes.length === 0
      ) {
        if (previousSibling?.classList.contains('ticket-detail__history')) {
          setPluginInMessages()
        }

        for (let j = 0; j < mutation.addedNodes.length; j++) {
          const node = mutation.addedNodes[j] as HTMLElement

          if (node?.classList?.contains('ticket-conversation__message')) {
            addedMessage = node
            break
          }
        }
      }
    }

    if (addedMessage) {
      setScalePluginInMessage(addedMessage)
    } else {
      console.warn(`added message is undefined`)
    }
  }

  function setScalePluginInMessage(messageNode: HTMLElement) {
    if (!messageNode || !messageNode.dataset.postId) return false
    const plugins = messageNode.querySelector(
      '.ticket-conversation__actions-btn.ticket-conversation__show-on-hover'
    )

    const plugin = buttonHandler.cloneNode(true)
    plugin.addEventListener('click', () => func())
    plugins?.appendChild(plugin)
  }

  function getMessageNodes(): HTMLElement[] {
    return [
      ...window.parent.document.querySelectorAll(
        '.ticket-conversation__message'
      ),
    ] as HTMLElement[]
  }

  function func() {
    console.log('test')
  }
}
