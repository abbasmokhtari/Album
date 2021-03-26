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

