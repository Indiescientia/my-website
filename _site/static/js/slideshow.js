// 1. Setup variables
const track = document.getElementById('slideTrack');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const cards = document.querySelectorAll('.clickable-card');
const slides = document.querySelectorAll('.slide-image'); // Grabs all images

// 2. Arrow Controls
rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
});

// 3. Card Controls (Click to scroll)
cards.forEach(card => {
  card.addEventListener('click', () => {
    const slideNumber = card.getAttribute('data-slide');
    const targetImage = document.getElementById('slide-' + slideNumber);
    targetImage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
});

// 4. THE HIGHLIGHT LOGIC (Intersection Observer)
// Tells the observer to trigger when an image is at least 50% visible in the track
const observerOptions = {
  root: track,
  threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      
      // Get the ID of the image that just slid into view (e.g., "slide-1")
      const visibleSlideId = entry.target.id; 
      
      // Split the ID at the dash and grab the number (e.g., "1")
      const slideNumber = visibleSlideId.split('-')[1]; 

      // Remove the '.active-card' class from ALL cards to reset them
      cards.forEach(card => card.classList.remove('active-card'));

      // Find the specific card that matches the visible image's number
      const activeCard = document.querySelector(`.clickable-card[data-slide="${slideNumber}"]`);
      
      // Add the highlight class to that matching card
      if (activeCard) {
        activeCard.classList.add('active-card');
      }
    }
  });
}, observerOptions);

// Attach the observer to every image in the slideshow
slides.forEach(slide => observer.observe(slide));