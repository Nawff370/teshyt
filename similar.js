const BookButton = document.getElementById('booknowbutton')
BookButton.addEventListener('click', function() {
    BookButton.classList.add('top-bookbuttonclicked')
})



let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.prev, .next');
const overlay = document.querySelector('.fade-overlay');

const slidesInfo = [
  {
    title: "Beautiful Beaches",
    description: "description shi here"
  },
  {
    title: "Adventure Tours",
    description: "Explore exciting adventures tailored for thrill seekers."
  },
  {
    title: "Luxury Stays",
    description: "Relax in the finest resorts with stunning ocean views."
  }
]

const titleEl = document.getElementById('slide-title')
const descEl = document.getElementById('slide-desc')

let autoSlideInterval

function updateText(index) {
  titleEl.textContent = slidesInfo[index].title
  descEl.textContent = slidesInfo[index].description
}

function startZoomSequence(slide) {
  slide.style.animation = 'none'
  slide.offsetHeight

  setTimeout(() => {
    slide.style.animation = 'slowZoomIn 15s ease-in-out forwards'
  }, 500)

  setTimeout(() => {
    slide.style.animation = 'slowZoomOut 1.5s ease forwards'
  }, 15500)
}

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove('active')
    slide.style.animation = 'none'
  })

  slides[index].classList.add('active')
  startZoomSequence(slides[index])
  updateText(index)
}

function changeSlide(direction) {
  overlay.style.opacity = '0.2'
  setTimeout(() => overlay.style.opacity = '0', 300)
  buttons.forEach(btn => btn.style.pointerEvents = 'none')
  buttons.forEach(btn => btn.style.opacity = '0.5')

  currentSlide += direction;
  if (currentSlide < 0) currentSlide = slides.length - 1
  else if (currentSlide >= slides.length) currentSlide = 0

  showSlide(currentSlide)

  setTimeout(() => {
    buttons.forEach(btn => btn.style.pointerEvents = 'auto')
    buttons.forEach(btn => btn.style.opacity = '1')
  }, 1000)

  resetAutoSlide()
}

function autoSlide() {
  changeSlide(1)
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 8000)
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

window.addEventListener('load', () => {
  showSlide(currentSlide)
  startAutoSlide()
});




const openorclosebtntop = document.getElementById('menuopenorclose')

const themenuofsmall = document.getElementById('idmenuforsmallwindow')
function topmenufunc() {
    // Get the real computed display value
    const chh = window.getComputedStyle(themenuofsmall).display;

    if (chh === 'none') {
        openorclosebtntop.classList.remove("fa-bars");
        openorclosebtntop.classList.add("fa-xmark");
        themenuofsmall.style.display = "flex";
    } else {
        openorclosebtntop.classList.remove("fa-xmark");
        openorclosebtntop.classList.add("fa-bars");
        themenuofsmall.style.display = "none";
    }
}
