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

