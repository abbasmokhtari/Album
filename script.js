const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

let isGrabbing = false,
  // startPos is wherever we click or touch the mobile
  startPos = 0,
  //this is the value we want for translateX in css
  currentTranslate = 0,
  prevTranslate = 0,
  // for animation we are going to use a method from window object and we need animationID for that
  animationID = 0,
  // currentIndex will represident the current slide
  currentIndex = 0

// in order to make sure when we drag an image we don't see ghosting

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())

  // Touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mouseleave', touchEnd)
  slide.addEventListener('mousemove', touchMove)
})

// if we want to disable right-click menu (context menu disabled)
window.oncontextmenu = function (e) {
  e.preventDefault()
  e.stopPropagation()
  return false
}

function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isGrabbing = true

    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function getPositionX(event) {
  // this line checks if we are using mouse or finger touch
  //in other word if we are on computer or mobile device
  // event.type.includes('mouse')
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  //by calling a function inside itself we are making it happen recurrsively
  if (isGrabbing) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function touchEnd() {
  isGrabbing = false
  cancelAnimationFrame(animationID)
  const movedBy = currentTranslate - prevTranslate

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
    

    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
    
     setPositionByIndex()

  slider.classList.remove('grabbing')
}

function touchMove(event) {
  if (isGrabbing) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}