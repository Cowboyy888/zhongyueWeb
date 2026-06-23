/* ============================================
   中粤铁网公司 — Premium Interactive JS
   Three.js mesh background + GSAP + Lenis
   ============================================ */

(function () {
  'use strict';

  /* ── MOBILE MENU ── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── LENIS SMOOTH SCROLL ── */
  var lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smooth: true,
    });
    function lenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* smooth anchor scrolling via Lenis */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -70, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ══════════════════════════════════
     THREE.JS — Wire Mesh Background
  ══════════════════════════════════ */
  (function initMeshCanvas() {
    var canvas = document.getElementById('mesh-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x0D1117, 1);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 500);
    camera.position.set(0, 0, 28);

    /* Grid geometry */
    var COLS = 24, ROWS = 16, SPACING = 2.2;
    var positions = [];
    var baseZ = [];

    /* Horizontal lines */
    for (var r = 0; r <= ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var x1 = (c - COLS / 2) * SPACING;
        var y1 = (r - ROWS / 2) * SPACING;
        var x2 = (c + 1 - COLS / 2) * SPACING;
        positions.push(x1, y1, 0, x2, y1, 0);
        baseZ.push(0, 0);
      }
    }
    /* Vertical lines */
    for (var c2 = 0; c2 <= COLS; c2++) {
      for (var r2 = 0; r2 < ROWS; r2++) {
        var x3 = (c2 - COLS / 2) * SPACING;
        var y3 = (r2 - ROWS / 2) * SPACING;
        var y4 = (r2 + 1 - ROWS / 2) * SPACING;
        positions.push(x3, y3, 0, x3, y4, 0);
        baseZ.push(0, 0);
      }
    }

    var geo = new THREE.BufferGeometry();
    var posArray = new Float32Array(positions);
    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    var mat = new THREE.LineBasicMaterial({ color: 0xE31E24, transparent: true, opacity: 0.15 });
    var mesh = new THREE.LineSegments(geo, mat);
    scene.add(mesh);

    var clock = new THREE.Clock();
    var mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function resize() {
      var hero = canvas.parentElement;
      var w = hero ? hero.offsetWidth : window.innerWidth;
      var h = hero ? hero.offsetHeight : window.innerHeight;
      canvas.width = w; canvas.height = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* wave on Z axis */
      var pos = geo.attributes.position;
      var arr = pos.array;
      for (var i = 0; i < arr.length; i += 3) {
        var wx = arr[i];
        var wy = arr[i + 1];
        arr[i + 2] = Math.sin(wx * 0.18 + t * 0.5) * Math.cos(wy * 0.18 + t * 0.3) * 1.8;
      }
      pos.needsUpdate = true;

      /* slow rotation + mouse parallax */
      mesh.rotation.x = t * 0.012 + mouse.y * 0.06;
      mesh.rotation.y = t * 0.018 + mouse.x * 0.06;

      renderer.render(scene, camera);
    }
    animate();
  })();

  /* ══════════════════════════════════
     CANVAS 2D — Welding Sparks
  ══════════════════════════════════ */
  (function initSparks() {
    var canvas = document.getElementById('sparks-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resize() {
      var hero = canvas.parentElement;
      canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
      canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function spawnSpark() {
      var w = canvas.width, h = canvas.height;
      /* sparks appear from right-side weld points */
      particles.push({
        x:  w * 0.55 + Math.random() * w * 0.4,
        y:  h * 0.25 + Math.random() * h * 0.5,
        vx: (Math.random() - 0.5) * 3.5,
        vy: -Math.random() * 5 - 1,
        life: 1,
        decay: 0.015 + Math.random() * 0.025,
        size: Math.random() * 2.5 + 0.8,
        r:   255,
        g:   Math.floor(Math.random() * 100 + 80),
        b:   0
      });
    }

    function draw() {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* spawn burst */
      if (Math.random() < 0.35) spawnSpark();
      if (Math.random() < 0.08) {
        for (var b = 0; b < 6; b++) spawnSpark();
      }

      particles = particles.filter(function (p) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.12;      /* gravity */
        p.vx *= 0.98;
        p.life -= p.decay;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(' + p.r + ',' + Math.floor(p.g * p.life) + ',' + p.b + ')';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#E31E24';
        ctx.fill();
        ctx.restore();

        /* trail streak */
        if (p.life > 0.5) {
          ctx.save();
          ctx.globalAlpha = p.life * 0.25;
          ctx.strokeStyle = 'rgb(255,140,0)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.stroke();
          ctx.restore();
        }
        return true;
      });
    }
    draw();
  })();

  /* ══════════════════════════════════
     GSAP ANIMATIONS
  ══════════════════════════════════ */
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero Entrance ── */
  var heroTl = gsap.timeline({ delay: 0.3 });
  heroTl
    .to('.hero-badge',  { opacity: 1, y: 0,  duration: 0.7, ease: 'power3.out', from: { y: 20 } })
    .from('.hero h1',   { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .from('.hero-desc', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .from('.hero-btns', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-meta', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.comp-main',   { opacity: 0, x: 60, rotationY: -20, duration: 1.0, ease: 'power3.out' }, '-=0.7')
    .from('.comp-accent', { opacity: 0, x: 40, rotationY: 12,  duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .from('.spec-card', { opacity: 0, scale: 0.7, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '-=0.5');

  /* ── Section Reveals (generic) ── */
  gsap.utils.toArray('.section-tag, .section-title, .section-lead').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
    });
  });

  /* ── About Section ── */
  gsap.from('.about-imgs', {
    scrollTrigger: { trigger: '.about-imgs', start: 'top 80%' },
    opacity: 0, x: -50, duration: 1.0, ease: 'power3.out'
  });
  gsap.from('.about-feat', {
    scrollTrigger: { trigger: '.about-features', start: 'top 80%' },
    opacity: 0, x: 40, stagger: 0.15, duration: 0.7, ease: 'power3.out'
  });

  /* ── Products ── */
  gsap.from('.product-card', {
    scrollTrigger: { trigger: '.products-grid', start: 'top 80%' },
    opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out'
  });

  /* ── Why Us / Process Cards ── */
  gsap.from('.process-card', {
    scrollTrigger: { trigger: '.process-grid', start: 'top 82%' },
    opacity: 0, y: 40, stagger: 0.12, duration: 0.75, ease: 'power3.out'
  });

  /* ── Stats counters ── */
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString();
          }
        });
      }
    });
  });

  /* ══════════════════════════════════
     FACILITY PARALLAX SHOWCASE
  ══════════════════════════════════ */
  (function initFacility() {
    var section  = document.querySelector('.facility-showcase');
    var parallax = document.getElementById('facility-parallax');
    var img      = document.getElementById('facility-img');
    if (!section || !parallax) return;

    /* Parallax scroll on the background image */
    gsap.to(parallax, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4
      },
      y: '18%',
      ease: 'none'
    });

    /* Sky/clouds: subtle scale-up as you scroll in */
    gsap.fromTo(img,
      { scale: 1.08 },
      {
        scale: 1.0,
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: 2 },
        ease: 'none'
      }
    );

    /* Text entrance animations */
    var tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 72%', once: true }
    });

    tl
      /* divider lines sweep in */
      .to('.facility-line', { scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
      .to('.facility-eyebrow-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      /* Big title lines slide up */
      .to('.fac-line-1', { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .to('.fac-line-2', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      /* Description fade */
      .to('.facility-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      /* Stats count up */
      .to('.facility-stats', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      /* CTA button */
      .to('.facility-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.2');
  })();

  /* ── Testimonials ── */
  gsap.from('.testi-card', {
    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
    opacity: 0, y: 50, stagger: 0.14, duration: 0.8, ease: 'power3.out'
  });

  /* ══════════════════════════════════
     PRODUCTION TIMELINE ANIMATION
  ══════════════════════════════════ */
  (function initTimeline() {
    var lineFill = document.getElementById('ptl-fill');
    var steps    = document.querySelectorAll('.ptl-step');
    if (!lineFill || !steps.length) return;

    /* Stagger reveal steps on scroll */
    gsap.to(steps, {
      scrollTrigger: {
        trigger: '.ptl-track',
        start: 'top 80%',
        once: true,
        onEnter: function () {
          steps.forEach(function (s, i) {
            setTimeout(function () {
              s.classList.add('visible');
            }, i * 130);
          });
        }
      },
      duration: 0
    });

    /* Animate the fill line */
    ScrollTrigger.create({
      trigger: '.ptl-track',
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: 1.2,
      onUpdate: function (self) {
        var pct = Math.min(self.progress * 100 * 1.4, 100);
        lineFill.style.width = pct + '%';

        /* light up nodes as line passes */
        var total = steps.length;
        steps.forEach(function (step, i) {
          var threshold = (i / (total - 1)) * 0.72;
          if (self.progress >= threshold) {
            step.classList.add('lit');
          }
        });
      }
    });
  })();

  /* ══════════════════════════════════
     FLOATING CTAS VISIBILITY
  ══════════════════════════════════ */
  var fabGroup = document.getElementById('fab-group');
  if (fabGroup) {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 70%',
      onEnter: function () { fabGroup.classList.add('visible'); },
      onLeaveBack: function () { fabGroup.classList.remove('visible'); }
    });
  }

  /* ── Active nav highlighting ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
  ScrollTrigger.create({
    onUpdate: function () {
      var scrollY = window.scrollY + 100;
      sections.forEach(function (sec) {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          navLinks.forEach(function (link) { link.style.color = ''; });
          var active = document.querySelector('nav a[href="#' + sec.id + '"]');
          if (active) active.style.color = 'var(--red)';
        }
      });
    }
  });

  /* ── CONTACT FORM ── */
  var submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var btn = this;
      btn.textContent = '✓ 提交成功 / Sent!';
      btn.classList.add('success');
      setTimeout(function () {
        btn.textContent = '提交询价 / Send Inquiry';
        btn.classList.remove('success');
      }, 3500);
    });
  }

  /* ── NEWSLETTER ── */
  var newsletterBtn = document.getElementById('newsletter-btn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function () {
      var input = document.getElementById('newsletter-input');
      if (input && input.value) {
        input.value = '';
        input.placeholder = '✓ Subscribed!';
        setTimeout(function () { input.placeholder = '您的邮箱 / Your email'; }, 2500);
      }
    });
  }

  /* ── Spec cards parallax tilt on mouse ── */
  document.querySelectorAll('.spec-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var cx = (e.clientX - rect.left) / rect.width  - 0.5;
      var cy = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = 'translateY(-4px) scale(1.04) rotateX(' + (-cy * 12) + 'deg) rotateY(' + (cx * 12) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

})();
