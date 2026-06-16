/* ============================================
   中粤铁网公司 — Website JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── MOBILE MENU ──
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── SCROLL REVEAL ──
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var current = 0;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 26);
  }

  var counterEls = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(function (el) { counterObserver.observe(el); });

  // ── CONTACT FORM SUBMIT ──
  var submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var btn = this;
      btn.textContent = '✓ 提交成功 / Message Sent!';
      btn.classList.add('success');
      setTimeout(function () {
        btn.textContent = '提交询价 / Send Inquiry';
        btn.classList.remove('success');
      }, 3500);
    });
  }

  // ── NEWSLETTER ──
  var newsletterBtn = document.getElementById('newsletter-btn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function () {
      var input = document.getElementById('newsletter-input');
      if (input && input.value) {
        input.value = '';
        input.placeholder = '✓ 订阅成功 / Subscribed!';
        setTimeout(function () {
          input.placeholder = '您的邮箱 / Your email';
        }, 2500);
      }
    });
  }

  // ── ACTIVE NAV ON SCROLL ──
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (link) { link.style.color = ''; });
        var active = document.querySelector('nav a[href="#' + sec.id + '"]');
        if (active) active.style.color = 'var(--red)';
      }
    });
  }, { passive: true });

});
