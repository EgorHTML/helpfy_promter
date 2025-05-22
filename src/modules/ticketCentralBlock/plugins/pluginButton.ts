export function clickOnPluginButton(plugin: any) {
  const pluginButton = window.parent.document
    ?.querySelector(`iframe[src="/custom/${plugin.cache}"]`)
    ?.closest('.ticket-plugins__dialog')
    ?.querySelector('.ticket-plugins__button') as HTMLElement

  pluginButton?.click()
}
