let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.prev, .next');
const overlay = document.querySelector('.fade-overlay');
const dotsContainer = document.createElement('div');
dotsContainer.className = 'slide-dots';

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});
document.querySelector('.slideshow-container').appendChild(dotsContainer);
const dots = document.querySelectorAll('.dot');

const slidesInfo = [
  {
    title: "Beautiful Beaches",
    description: "Celebrate your love in one of the most romantic places on Earth. The Maldives offers an unforgettable honeymoon experience, where every moment feels like a dream."
  },
  {
    title: "Honeymoons",
    description: "Celebrate your love in one of the most romantic places on Earth. The Maldives offers an unforgettable honeymoon experience, where every moment feels like a dream."
  },
  {
    title: "Luxury Stays",
    description: "Experience unmatched elegance in the heart of the Indian Ocean. The Maldives is home to some of the world’s most exclusive and luxurious resorts — set on private islands, surrounded by crystal-clear lagoons and powdery white sands."
  }
];

const titleEl = document.getElementById('slide-title');
const descEl = document.getElementById('slide-desc');
const textOverlay = document.querySelector('.text-overlay');

let autoSlideInterval;
let isAnimating = false;

function updateText(index) {
  textOverlay.classList.remove('animate-text');
  void textOverlay.offsetWidth; // force reflow
  textOverlay.classList.add('animate-text');

  titleEl.textContent = slidesInfo[index].title;
  descEl.textContent = slidesInfo[index].description;
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startZoomAnimation(slide) {
  slide.style.animation = 'none';
  void slide.offsetHeight;
  slide.style.animation = 'slowZoom 20s ease-in-out forwards';
}

function animateSlideTransition(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  overlay.style.opacity = '0.3';
  buttons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });

  const currentActiveSlide = slides[currentSlide];
  const nextSlide = slides[newIndex];

  currentActiveSlide.classList.add('fade-out');

  setTimeout(() => {
    currentActiveSlide.classList.remove('active', 'fade-out');
    currentActiveSlide.style.animation = 'none';

    nextSlide.classList.add('active');
    startZoomAnimation(nextSlide);

    currentSlide = newIndex;
    updateText(currentSlide);
    updateDots(currentSlide);

    setTimeout(() => {
      buttons.forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
      });
      overlay.style.opacity = '0';
      isAnimating = false;
    }, 300);
  }, 500);
}

function goToSlide(index, fromAuto = false) {
  if (index === currentSlide && !fromAuto) return;
  animateSlideTransition(index);
  if (!fromAuto) resetAutoSlide();
}

function changeSlide(direction) {
  let newIndex = currentSlide + direction;
  if (newIndex < 0) newIndex = slides.length - 1;
  else if (newIndex >= slides.length) newIndex = 0;

  goToSlide(newIndex);
}

function autoSlide() {
  let newIndex = currentSlide + 1;
  if (newIndex >= slides.length) newIndex = 0;
  goToSlide(newIndex, true);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 20000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

window.addEventListener('load', () => {
  slides[currentSlide].classList.add('active');
  startZoomAnimation(slides[currentSlide]);
  updateText(currentSlide);
  updateDots(currentSlide);
  startAutoSlide();
});

// Swipe gestures
let touchStartX = 0;
let touchEndX = 0;
const sliderContainer = document.querySelector('.slideshow-container');

sliderContainer.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) < 50) return;
  if (swipeDistance < 0) changeSlide(1); // Swipe left → next
  else changeSlide(-1); // Swipe right → prev
}
