export function startObserver() {
  const bodyElement = document.body

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      console.log(mutation)
    })
  })

  const config: MutationObserverInit = {
    attributes: true,
    subtree: true,
    attributeOldValue: false, // ?
  }

  observer.observe(bodyElement, config)
}