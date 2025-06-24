export function removeOuterHtmlTag(htmlString: string): string {
  const tempElement = document.createElement('div')
  if (!tempElement) return ''

  tempElement.innerHTML = htmlString.trim()
  if (
    tempElement.firstChild &&
    tempElement.childNodes.length === 1 &&
    tempElement.firstChild.nodeType === Node.ELEMENT_NODE
  ) {
    return (tempElement.firstChild as HTMLElement).innerHTML
  } else {
    return htmlString
  }
}

export function removeAllHtmlTags(htmlString: string): string {
  const element = document.createElement('div')

  element.innerHTML = htmlString

  return element.textContent as string
}
