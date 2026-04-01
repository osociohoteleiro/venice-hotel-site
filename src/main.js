// ===== 1819 Marine Hotel - Main JS =====

// --- Mobile Sidebar Toggle ---
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const navLinks = document.querySelectorAll('.nav-link');

function toggleSidebar() {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });
});

// --- Mobile Header Shadow on Scroll ---
const mobileHeader = document.getElementById('mobileHeader');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mobileHeader.classList.add('scrolled');
  } else {
    mobileHeader.classList.remove('scrolled');
  }
}, { passive: true });

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// --- Intersection Observer for Scroll Animations ---
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => observer.observe(el));

// --- Casamentos Photo Modal & Lightbox ---
const btnVerFotos = document.getElementById('btnVerFotos');
const modalCasamentos = document.getElementById('modalCasamentos');
const modalClose = document.getElementById('modalClose');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentLightboxIndex = 0;
let lightboxImages = [];

function openModal() {
  modalCasamentos.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalCasamentos.classList.remove('active');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function openLightbox(index) {
  lightboxImages = Array.from(document.querySelectorAll('.modal-thumb')).map(t => t.dataset.full);
  currentLightboxIndex = index;
  lightboxImg.src = lightboxImages[currentLightboxIndex];
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentLightboxIndex];
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentLightboxIndex];
}

btnVerFotos.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevLightbox);
lightboxNext.addEventListener('click', nextLightbox);

modalCasamentos.addEventListener('click', (e) => {
  if (e.target === modalCasamentos) closeModal();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.querySelectorAll('.modal-thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => openLightbox(i));
});

document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  } else if (modalCasamentos.classList.contains('active')) {
    if (e.key === 'Escape') closeModal();
  }
});

// --- Sticky Booking Form ---
const heroSection = document.querySelector('.hero');
const bookingFormEl = document.querySelector('.hero-booking');

function handleStickyBooking() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom - 80) {
    bookingFormEl.classList.add('sticky');
  } else {
    bookingFormEl.classList.remove('sticky');
  }
}

window.addEventListener('scroll', handleStickyBooking, { passive: true });

// --- Booking Form ---
const bookingForm = document.getElementById('bookingForm');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

// Set default dates (today + 2 days for check-in, +4 for check-out)
const today = new Date();
const checkInDate = new Date(today);
checkInDate.setDate(today.getDate() + 2);
const checkOutDate = new Date(today);
checkOutDate.setDate(today.getDate() + 4);

const formatDate = (d) => d.toISOString().split('T')[0];
checkInInput.value = formatDate(checkInDate);
checkInInput.min = formatDate(today);
checkOutInput.value = formatDate(checkOutDate);
checkOutInput.min = formatDate(checkInDate);

checkInInput.addEventListener('change', () => {
  const minOut = new Date(checkInInput.value);
  minOut.setDate(minOut.getDate() + 1);
  checkOutInput.min = formatDate(minOut);
  if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
    checkOutInput.value = formatDate(minOut);
  }
});

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const checkIn = checkInInput.value;
  const checkOut = checkOutInput.value;
  const adults = document.getElementById('guests').value;
  const url = `https://reservas.1819marinehotel.com.br/reservar/f32a1ca9-6a17-42bb-8b23-8c873adfb54a/?check_in=${checkIn}&check_out=${checkOut}&rooms=1&adults=${adults}`;
  window.open(url, '_blank');
});

// --- Hero Slider ---
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 5000);
}
