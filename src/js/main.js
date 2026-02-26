// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');
if (navToggle) {
  navToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
}

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.src;
    lightboxImg.alt = item.dataset.alt || '';
    lightbox.classList.add('active');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

// Close on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active');
});
