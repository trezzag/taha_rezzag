/* ===========================
   TAHA REZZAG — PORTFOLIO JS
=========================== */

// ─── NAV scroll behavior ───────────────────────────────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// ─── Canvas: particle + wave effect ───────────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.5 - 0.1;
      this.life = Math.random();
      this.maxLife = 0.5 + Math.random() * 0.5;
      this.r = Math.random() * 1.5 + 0.3;
      this.hue = 20 + Math.random() * 30; // orange-amber range
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.003;
      if (this.life <= 0) this.reset();
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 55%, ${alpha})`;
      ctx.fill();
    }
  }

  // Connection lines (grid-like, sparse)
  function drawConnections() {
    const connected = particles.slice(0, 60);
    for (let i = 0; i < connected.length; i++) {
      for (let j = i + 1; j < connected.length; j++) {
        const dx = connected[i].x - connected[j].x;
        const dy = connected[i].y - connected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.06;
          ctx.beginPath();
          ctx.moveTo(connected[i].x, connected[i].y);
          ctx.lineTo(connected[j].x, connected[j].y);
          ctx.strokeStyle = `rgba(232, 116, 58, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Slow rotating ring in background
  let angle = 0;
  function drawRings() {
    angle += 0.0015;
    const cx = W * 0.75, cy = H * 0.5;
    const radii = [180, 250, 320];
    radii.forEach((r, i) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * (i % 2 === 0 ? 1 : -1));
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.setLineDash([3, 18]);
      ctx.strokeStyle = `rgba(232, 116, 58, 0.06)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });

    // Detonation wave dot
    const wx = cx + Math.cos(angle * 3) * 215;
    const wy = cy + Math.sin(angle * 3) * 215;
    const grd = ctx.createRadialGradient(wx, wy, 0, wx, wy, 18);
    grd.addColorStop(0, 'rgba(255, 106, 0, 0.7)');
    grd.addColorStop(1, 'rgba(255, 106, 0, 0)');
    ctx.beginPath();
    ctx.arc(wx, wy, 18, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(wx, wy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 180, 60, 0.9)';
    ctx.fill();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < Math.min(count, 80); i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animate() {
    animId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    drawRings();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
  }
  animate();
}

// ─── Scroll reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.research-card, .pub-item, .about-text, .about-visual, .contact-item, .blog-preview-card, .post-card, .featured-article'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80 * i);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ─── Blog post expand ──────────────────────────────────
document.querySelectorAll('.post-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const body = document.getElementById(targetId);
    if (!body) return;
    const isHidden = body.classList.contains('hidden');
    body.classList.toggle('hidden');
    btn.textContent = isHidden ? '← Collapse' : '→ Read more';
  });
});

// ─── Smooth anchor scroll ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
