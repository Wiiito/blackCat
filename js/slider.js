const slideContainers = document.querySelectorAll('.contentContainer')
slideContainers.forEach((element, index) => {
  element
    .getElementsByClassName('next')[0]
    .addEventListener('click', () => setSlide(index))

  document
    .querySelectorAll('[name="slides"]')
    [index].addEventListener('click', () => setSlide(index - 1))
})

async function setSlide(actualSlide) {
  if (actualSlide > -1) {
    slideContainers[actualSlide].classList.add('fadeOut')
    await new Promise(r => setTimeout(r, 1000))
  }

  actualSlide++

  if (actualSlide >= slideContainers.length) actualSlide = 0
  slideContainers[actualSlide].classList.remove('fadeOut')

  slideContainers[actualSlide].querySelector('.text').classList.add('fadeIn')
  slideContainers[actualSlide].querySelector('.img').classList.add('fadeIn')
  slideContainers[actualSlide]
    .querySelectorAll('button')[0]
    .classList.add('fadeIn')
  slideContainers[actualSlide]
    .querySelectorAll('button')[1]
    .classList.add('fadeIn')

  document.querySelectorAll('[name="slides"]')[actualSlide].checked = true
}

setSlide(-1)
