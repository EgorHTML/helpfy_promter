export interface IHandlerButton {
  id: string
  delegate: (message: HTMLElement) => any
  title: string
}

export class HandlerButton implements IHandlerButton {
  id: string
  delegate: (message: HTMLElement) => any
  title: string

  buttonHandler: HTMLButtonElement | undefined

  constructor(
    id: string,
    delegate: (message: HTMLElement) => any,
    title: string = 'handler'
  ) {
    this.id = id
    this.delegate = delegate
    this.title = title

    if (
      window.parent.document.querySelector(
        `.ticket-conversation__actions-edit-button.${id}`
      )
    ) {
      console.warn(`Handelr button with id ${id} already exists`)

      return
    }

    const computedClass = `ticket-conversation__actions-edit-button ${id}`
    const button = document.createElement('button')
    button.title = title
    button.className = computedClass

    button.innerHTML = ` <i class="el-icon-c-scale-to-original">
  </i>`
    this.buttonHandler = button

    if (
      window.parent.document.querySelector(
        `.ticket-conversation__actions-edit-button.${id}`
      )
    ) {
      console.warn(`handler button with id ${id} already exists`)

      return
    }
    const buttonHandler = document.createElement('button')
    buttonHandler.title = title
    buttonHandler.className = computedClass

    buttonHandler.innerHTML = ` <i class="el-icon-c-scale-to-original">
  </i>`

    const config = { attributes: false, childList: true, subtree: true }
    const observer = new MutationObserver(this.onMessage.bind(this))
    const messagesContainer = window.parent.document.querySelector(
      '.ticket-conversation__messages'
    )

    if (messagesContainer) observer.observe(messagesContainer, config)

    this.setPluginInMessages()
  }

  private setPluginInMessages() {
    this.getMessageNodes().forEach((message) =>
      this.setScalePluginInMessage(message)
    )
  }

  private onMessage(mutationList: MutationRecord[]) {
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
          this.setPluginInMessages()
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
      this.setScalePluginInMessage(addedMessage)
    }
  }

  private setScalePluginInMessage(messageNode: HTMLElement) {
    if (!messageNode || !messageNode.dataset.postId) return false
    const plugins = messageNode.querySelector(
      '.ticket-conversation__actions-btn.ticket-conversation__show-on-hover'
    )

    if (this.buttonHandler) {
      const plugin = this.buttonHandler.cloneNode(true)
      plugin.addEventListener('click', this.delegate.bind(this, messageNode))
      plugins?.appendChild(plugin)
    }
  }

  private getMessageNodes(): HTMLElement[] {
    return [
      ...window.parent.document.querySelectorAll(
        '.ticket-conversation__message'
      ),
    ] as HTMLElement[]
  }
}
