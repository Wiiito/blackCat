function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        callback(element)
        observer.disconnect()
      }
    })
  }).observe(element)
  if (!callback) return new Promise(r => (callback = r))
}

document.querySelectorAll('.fadeInWhenLoad').forEach(elem => {
  onVisible(elem, elem => {
    elem.classList.add('fadeIn')
  })
})
