/* ═══════════════════════════════════════════════════════════════
   SIGNET SCIENCE — Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── ANNOUNCEMENT BANNER ──
  const banner = document.getElementById('announcement-banner');
  const bannerClose = document.getElementById('announcement-close');
  const reportForm = document.getElementById('report-signup');

  // Check if previously dismissed
  if (banner && sessionStorage.getItem('banner-dismissed')) {
    banner.classList.add('hidden');
  }

  bannerClose?.addEventListener('click', () => {
    banner.classList.add('hidden');
    sessionStorage.setItem('banner-dismissed', 'true');
  });

  reportForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = reportForm.querySelector('.announcement-btn');
    const email = reportForm.querySelector('.announcement-input').value;
    btn.textContent = 'Sending...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: JSON.stringify({
        access_key: '71a6f32b-a57b-42cb-a74a-22220375ace8',
        subject: 'New Report Signup: 2026-2027 IRL Challenger Brand Trend Report',
        email: email,
        source: 'challenger-brand-report-2026'
      }),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) {
        btn.textContent = 'You\'re In!';
        reportForm.querySelector('.announcement-input').value = '';
        setTimeout(() => {
          banner.classList.add('hidden');
          sessionStorage.setItem('banner-dismissed', 'true');
        }, 2000);
      } else {
        btn.textContent = 'Try Again';
        setTimeout(() => { btn.textContent = 'Notify Me'; }, 2000);
      }
    }).catch(() => {
      btn.textContent = 'Try Again';
      setTimeout(() => { btn.textContent = 'Notify Me'; }, 2000);
    });
  });

  // ── STICKY NAV SCROLL EFFECT ──
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ── MOBILE NAV ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── SMOOTH SCROLL FOR NAV LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ── SCROLL REVEAL ANIMATIONS ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── HERO SIGNET RINGS CANVAS ──
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    // Ring definitions — each orbital ring has its own tilt, size, speed, and color
    const RING_COUNT = 7;
    const rings = [];
    const pulses = []; // energy pulses traveling along rings

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
    }

    function initRings() {
      rings.length = 0;
      pulses.length = 0;
      const cx = w * 0.5;
      const cy = h * 0.48;
      const baseRadius = Math.min(w, h) * 0.32;

      for (let i = 0; i < RING_COUNT; i++) {
        const t = i / (RING_COUNT - 1); // 0..1
        rings.push({
          cx: cx + (Math.random() - 0.5) * 20,
          cy: cy + (Math.random() - 0.5) * 10,
          rx: baseRadius * (0.4 + t * 0.7),          // semi-major axis
          ry: baseRadius * (0.15 + t * 0.25),         // semi-minor (perspective tilt)
          rotation: (i * 28 + Math.random() * 15) * Math.PI / 180, // tilt angle
          speed: (0.015 + Math.random() * 0.01) * (i % 2 === 0 ? 1 : -1), // deg/frame, slow rotation
          phase: Math.random() * Math.PI * 2,
          // Color interpolation: magenta (#F908ED) -> gold (#FFBD07)
          r: Math.round(249 + (255 - 249) * t),
          g: Math.round(8 + (189 - 8) * t),
          b: Math.round(237 + (7 - 237) * t),
          opacity: 0.12 + (1 - Math.abs(t - 0.5) * 2) * 0.18, // brighter in middle
          lineWidth: 0.6 + (1 - Math.abs(t - 0.5) * 2) * 0.8,
        });

        // Add 2-4 energy pulses per ring
        const pulseCount = 2 + Math.floor(Math.random() * 3);
        for (let p = 0; p < pulseCount; p++) {
          pulses.push({
            ringIndex: i,
            angle: Math.random() * Math.PI * 2,
            speed: (0.003 + Math.random() * 0.002) * (i % 2 === 0 ? 1 : -1),
            size: 1.5 + Math.random() * 2,
            brightness: 0.5 + Math.random() * 0.5,
          });
        }
      }
    }

    // Draw a single elliptical ring with rotation
    function drawRing(ring, time) {
      const rot = ring.rotation + time * ring.speed * 0.01;
      ctx.save();
      ctx.translate(ring.cx, ring.cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.r}, ${ring.g}, ${ring.b}, ${ring.opacity})`;
      ctx.lineWidth = ring.lineWidth;
      ctx.stroke();
      ctx.restore();
    }

    // Get position on a ring at a given angle
    function getPosOnRing(ring, angle, time) {
      const rot = ring.rotation + time * ring.speed * 0.01;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const px = ring.rx * Math.cos(angle);
      const py = ring.ry * Math.sin(angle);
      return {
        x: ring.cx + px * cosR - py * sinR,
        y: ring.cy + px * sinR + py * cosR
      };
    }

    // Draw energy pulse (glowing dot traveling along a ring)
    function drawPulse(pulse, time) {
      const ring = rings[pulse.ringIndex];
      const pos = getPosOnRing(ring, pulse.angle, time);
      const t = pulse.ringIndex / (RING_COUNT - 1);

      // Glow
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulse.size * 6);
      gradient.addColorStop(0, `rgba(${ring.r}, ${ring.g}, ${ring.b}, ${0.4 * pulse.brightness})`);
      gradient.addColorStop(0.4, `rgba(${ring.r}, ${ring.g}, ${ring.b}, ${0.1 * pulse.brightness})`);
      gradient.addColorStop(1, `rgba(${ring.r}, ${ring.g}, ${ring.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(pos.x - pulse.size * 6, pos.y - pulse.size * 6, pulse.size * 12, pulse.size * 12);

      // Core dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, pulse.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ring.r}, ${ring.g}, ${ring.b}, ${0.9 * pulse.brightness})`;
      ctx.fill();
    }

    // Subtle center glow
    function drawCenterGlow(time) {
      const cx = w * 0.5;
      const cy = h * 0.48;
      const breathe = 0.7 + 0.3 * Math.sin(time * 0.0003);
      const radius = Math.min(w, h) * 0.18 * breathe;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, 'rgba(249, 8, 237, 0.06)');
      gradient.addColorStop(0.5, 'rgba(200, 80, 130, 0.02)');
      gradient.addColorStop(1, 'rgba(255, 189, 7, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    }

    // Occasional ripple effect emanating from center
    let ripples = [];
    let lastRipple = 0;

    function spawnRipple(time) {
      if (time - lastRipple > 8000 + Math.random() * 6000) {
        ripples.push({
          born: time,
          cx: w * 0.5 + (Math.random() - 0.5) * 40,
          cy: h * 0.48 + (Math.random() - 0.5) * 20,
          maxRadius: Math.min(w, h) * (0.2 + Math.random() * 0.15),
          duration: 5000 + Math.random() * 3000,
        });
        lastRipple = time;
        // Keep ripple array bounded
        if (ripples.length > 3) ripples.shift();
      }
    }

    function drawRipples(time) {
      ripples = ripples.filter(r => time - r.born < r.duration);
      ripples.forEach(r => {
        const progress = (time - r.born) / r.duration;
        const radius = r.maxRadius * progress;
        const alpha = 0.12 * (1 - progress) * (1 - progress);
        ctx.beginPath();
        ctx.ellipse(r.cx, r.cy, radius, radius * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 8, 237, ${alpha})`;
        ctx.lineWidth = 1.2 * (1 - progress);
        ctx.stroke();
      });
    }

    function animate(time) {
      ctx.clearRect(0, 0, w, h);

      // Center glow
      drawCenterGlow(time);

      // Draw rings back to front
      rings.forEach(ring => drawRing(ring, time));

      // Draw ripples
      spawnRipple(time);
      drawRipples(time);

      // Update and draw pulses
      pulses.forEach(pulse => {
        pulse.angle += pulse.speed;
        // Subtle brightness flicker
        pulse.brightness = 0.4 + 0.3 * Math.sin(time * 0.0006 + pulse.angle * 2);
        drawPulse(pulse, time);
      });

      animId = requestAnimationFrame(animate);
    }

    resize();
    initRings();
    requestAnimationFrame(animate);
    window.addEventListener('resize', () => { resize(); initRings(); });
  }

  // ── STAT COUNTER ANIMATION ──
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  // ── CONTACT FORM HANDLER ──
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        btn.textContent = 'Message Sent!';
        form.reset();
      } else {
        btn.textContent = 'Error — Try Again';
      }
      setTimeout(() => {
        btn.textContent = 'Send Message \u2192';
        btn.disabled = false;
      }, 3000);
    }).catch(() => {
      btn.textContent = 'Error — Try Again';
      setTimeout(() => {
        btn.textContent = 'Send Message \u2192';
        btn.disabled = false;
      }, 3000);
    });
  });

});
