// ========= Hero Carousel =========
(function() {
  const imgs = document.querySelectorAll('.hero-carousel img');
  if (imgs.length < 2) return;
  let current = 0;
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, 5000);
})();

// ========= Mobile Nav Toggle =========
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
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

// Close nav on link click (mobile)
document.querySelectorAll('.main-nav a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// ========= Intersection Observer — Fade In =========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children').forEach(el => {
  fadeObserver.observe(el);
});

// ========= FAQ Accordion =========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

// ========= Lightbox =========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.src;
    lightboxImg.alt = item.dataset.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// ========= Exit Intent Popup =========
const exitPopup = document.getElementById('exitPopup');
let exitPopupShown = false;

function showExitPopup() {
  if (exitPopupShown || !exitPopup) return;
  if (sessionStorage.getItem('exitPopupDismissed')) return;
  exitPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
  exitPopupShown = true;
}

function closeExitPopup() {
  if (exitPopup) {
    exitPopup.classList.remove('active');
    document.body.style.overflow = '';
    sessionStorage.setItem('exitPopupDismissed', 'true');
  }
}

// Desktop: mouse leaves viewport top
document.addEventListener('mouseout', (e) => {
  if (e.clientY <= 0) showExitPopup();
});

// Mobile: after 45 seconds on page
setTimeout(() => {
  if (window.innerWidth <= 768) showExitPopup();
}, 45000);

if (exitPopup) {
  exitPopup.querySelector('.exit-popup-close')?.addEventListener('click', closeExitPopup);
  exitPopup.querySelector('.exit-popup-overlay')?.addEventListener('click', closeExitPopup);
}

// ========= Mobile Sticky CTA =========
const mobileCta = document.getElementById('mobileCta');
const hero = document.querySelector('.hero, .page-hero');

if (mobileCta && hero) {
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    });
  }, { threshold: 0 });
  ctaObserver.observe(hero);
}

// ========= Header scroll effect =========
const header = document.querySelector('.site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.style.borderBottomColor = 'rgba(212,168,67,0.1)';
  } else {
    header.style.borderBottomColor = 'rgba(255,255,255,0.05)';
  }
  lastScroll = currentScroll;
}, { passive: true });

// ========= Escape key handler =========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeExitPopup();
  }
});

// ========= Smooth page transitions =========
document.querySelectorAll('a[href^="/"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === window.location.pathname) return;
    e.preventDefault();
    const main = document.querySelector('.page-transition');
    if (main) {
      main.style.opacity = '0';
      main.style.transform = 'translateY(10px)';
      main.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    }
    setTimeout(() => { window.location.href = href; }, 250);
  });
});
