export function removeOuterHtmlTag(htmlString: string) {
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
