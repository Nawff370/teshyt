

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
    description: "The Maldives is a true paradise of picture-perfect beaches, where soft white sands meet the clear, shimmering waters of the Indian Ocean. Each island is fringed by untouched shores, offering a peaceful escape from the outside world."
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

let autoSlideInterval;
let isAnimating = false;

function updateText(index) {
  titleEl.textContent = slidesInfo[index].title;
  descEl.textContent = slidesInfo[index].description;
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startZoomAnimation(slide) {
  // Reset any existing animation
  slide.style.animation = 'none';
  void slide.offsetHeight; // Trigger reflow
  
  // Start new zoom animation
  slide.style.animation = 'slowZoom 15s ease-in-out forwards';
}

startZoomAnimation(1)

function animateSlideTransition(newIndex) {
  if (isAnimating) return;
  isAnimating = true;
  
  // Fade overlay effect
  overlay.style.opacity = '0.3';
  
  // Disable buttons during transition
  buttons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });
  
  // Get current and next slides
  const currentActiveSlide = slides[currentSlide];
  const nextSlide = slides[newIndex];
  
  // Add fade-out class to current slide
  currentActiveSlide.classList.add('fade-out');
  
  setTimeout(() => {
    // Remove classes from current slide
    currentActiveSlide.classList.remove('active', 'fade-out');
    currentActiveSlide.style.animation = 'none';
    
    // Add active class to new slide
    nextSlide.classList.add('active');
    startZoomAnimation(nextSlide);
    
    // Update current slide
    currentSlide = newIndex;
    updateText(currentSlide);
    updateDots(currentSlide);
    
    // Re-enable buttons
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

function goToSlide(index) {
  if (index === currentSlide) return;
  animateSlideTransition(index);
  resetAutoSlide();
}

function changeSlide(direction) {
  let newIndex = currentSlide + direction;
  if (newIndex < 0) newIndex = slides.length - 1;
  else if (newIndex >= slides.length) newIndex = 0;
  
  goToSlide(newIndex);
}

function autoSlide() {
  changeSlide(1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 40000); // Match with zoom duration
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize
window.addEventListener('load', () => {
  slides[currentSlide].classList.add('active');
  startZoomAnimation(slides[currentSlide]);
  updateText(currentSlide);
  updateDots(currentSlide);
  startAutoSlide();
  
  // Add hover effect to pause auto-slide
  const container = document.querySelector('.slideshow-container');
  container.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
    // Pause the zoom animation
    slides[currentSlide].style.animationPlayState = 'paused';
  });
  
  container.addEventListener('mouseleave', () => {
    resetAutoSlide();
    // Resume the zoom animation
    slides[currentSlide].style.animationPlayState = 'running';
  });
});
