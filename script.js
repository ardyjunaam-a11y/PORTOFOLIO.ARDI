// ===== Animasi angka usia (count up) =====
function animateNumber(el, target, duration = 900) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(start + (target - start) * eased);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const mdplEl = document.querySelector('.mdpl-number');
if (mdplEl) {
  const target = parseInt(mdplEl.dataset.target, 10);
  window.addEventListener('load', () => animateNumber(mdplEl, target));
}

// ===== Reveal waypoint saat discroll (IntersectionObserver) =====
const waypoints = document.querySelectorAll('.waypoint');

if ('IntersectionObserver' in window && waypoints.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
  );

  waypoints.forEach((wp) => observer.observe(wp));
} else {
  // fallback: langsung tampilkan semua jika browser tidak mendukung
  waypoints.forEach((wp) => wp.classList.add('in-view'));
}

// ===== Tahun otomatis di footer =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Navbar sedikit menggelap saat discroll (opsional efek halus) =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(10,15,28,0.55)';
      navbar.style.backdropFilter = 'blur(6px)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
    }
  });
}
