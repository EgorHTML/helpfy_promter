export async function clickOnPluginButton(plugin: any) {
  const module = await import('../composables/useEvaluation')
  const { markSend } = module.useEvaluation()
  const pluginButton = window.parent.document
    ?.querySelector(`iframe[src="/custom/${plugin.cache}"]`)
    ?.closest('.ticket-plugins__dialog')
    ?.querySelector('.ticket-plugins__button') as HTMLElement

  const prev = markSend.value
  markSend.value = true

  pluginButton?.click()
  setTimeout(() => {
    markSend.value = prev
  }, 200)
}
