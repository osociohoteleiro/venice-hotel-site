import './style.css';

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const heroBg = document.querySelector('.hero__bg img');
if (heroBg) {
  heroBg.addEventListener('load', () => {
    heroBg.style.transform = 'scale(1)';
  });
  if (heroBg.complete) heroBg.style.transform = 'scale(1)';
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

const galleryTrack = document.getElementById('galleryTrack');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');

if (galleryTrack && prevBtn && nextBtn) {
  const scrollAmount = () => {
    const item = galleryTrack.querySelector('.gallery__item');
    return item ? item.offsetWidth + 24 : 400;
  };

  prevBtn.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  let isDown = false;
  let startX;
  let scrollLeft;
  let trackLeft;

  galleryTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    trackLeft = galleryTrack.offsetLeft;
    startX = e.pageX - trackLeft;
    scrollLeft = galleryTrack.scrollLeft;
  });

  galleryTrack.addEventListener('mouseleave', () => { isDown = false; });
  galleryTrack.addEventListener('mouseup', () => { isDown = false; });

  galleryTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackLeft;
    const walk = (x - startX) * 1.5;
    galleryTrack.scrollLeft = scrollLeft - walk;
  });
}

