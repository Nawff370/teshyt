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

// Create swipe feedback elements dynamically
const swipeLeftGlow = document.createElement('div');
swipeLeftGlow.className = 'swipe-feedback swipe-left';
const swipeRightGlow = document.createElement('div');
swipeRightGlow.className = 'swipe-feedback swipe-right';
document.querySelector('.slideshow-container').appendChild(swipeLeftGlow);
document.querySelector('.slideshow-container').appendChild(swipeRightGlow);

let autoSlideInterval;
let isAnimating = false;

function updateText(index) {
  // Smooth animation for text
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

function clearSlideClasses(slide) {
  slide.classList.remove(
    'active',
    'slide-in-left',
    'slide-out-left',
    'slide-in-right',
    'slide-out-right'
  );
}

function startZoomAnimation(slide) {
  slide.style.animation = 'none';
  void slide.offsetHeight;
  slide.style.animation = 'slowZoom 20s ease-in-out forwards';
}

function animateSlideTransition(newIndex, direction) {
  if (isAnimating) return;
  isAnimating = true;

  overlay.style.opacity = '0.3';
  buttons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });

  const currentSlideEl = slides[currentSlide];
  const nextSlideEl = slides[newIndex];

  clearSlideClasses(currentSlideEl);
  clearSlideClasses(nextSlideEl);

  if (direction === 'left') {
    // slide left: current slide out left, next slide in from right
    nextSlideEl.classList.add('slide-in-right', 'active');
    currentSlideEl.classList.add('slide-out-left');
  } else {
    // slide right: current slide out right, next slide in from left
    nextSlideEl.classList.add('slide-in-left', 'active');
    currentSlideEl.classList.add('slide-out-right');
  }

  // Update text and dots immediately
  updateText(newIndex);
  updateDots(newIndex);
  startZoomAnimation(nextSlideEl);

  // After animation ends (500ms)
  setTimeout(() => {
    clearSlideClasses(currentSlideEl);
    currentSlideEl.classList.remove('active');
    nextSlideEl.classList.remove('slide-in-left', 'slide-in-right');
    
    overlay.style.opacity = '0';
    buttons.forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
    });

    currentSlide = newIndex;
    isAnimating = false;
  }, 500);
}

function goToSlide(index, fromAuto = false, direction = 'left') {
  if (index === currentSlide && !fromAuto) return;
  animateSlideTransition(index, direction);
  resetAutoSlide();
}

function changeSlide(direction) {
  let newIndex = currentSlide + direction;
  if (newIndex < 0) newIndex = slides.length - 1;
  else if (newIndex >= slides.length) newIndex = 0;
  goToSlide(newIndex, false, direction === 1 ? 'left' : 'right');
}

// Swipe feedback animation trigger
function triggerSwipeEffect(direction) {
  const feedback = direction === 'left' ? swipeRightGlow : swipeLeftGlow;
  feedback.classList.add('show');
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 700);
}

function autoSlide() {
  let newIndex = currentSlide + 1;
  if (newIndex >= slides.length) newIndex = 0;
  goToSlide(newIndex, true, 'left');
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 20000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

window.addEventListener('load', () => {
  slides.forEach(slide => {
    slide.classList.remove('active', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
  });
  slides[currentSlide].classList.add('active');
  startZoomAnimation(slides[currentSlide]);
  updateText(currentSlide);
  updateDots(currentSlide);
  startAutoSlide();
});

// Swipe support
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

  if (swipeDistance < 0) {
    // Swiped left → next slide, show glow on right side
    triggerSwipeEffect('left');
    changeSlide(1);
  } else {
    // Swiped right → previous slide, show glow on left side
    triggerSwipeEffect('right');
    changeSlide(-1);
  }
}
