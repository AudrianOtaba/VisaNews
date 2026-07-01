/* =============================================
   VISA NEWS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- 1. LIVE DATE in utility bar ----- */
  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-KE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).toUpperCase();
  }


  /* ----- 2. MOBILE HAMBURGER MENU ----- */
  const hamburger = document.querySelector('.hamburger');
  const navList   = document.querySelector('.nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navList.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navList.classList.remove('open');
      });
    });
  }


  /* ----- 3. SEARCH OVERLAY ----- */
  const searchPill    = document.querySelector('.search-pill');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = document.getElementById('searchInput');

  if (searchPill && searchOverlay) {
    searchPill.addEventListener('click', function () {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('active');
    });
  }
  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  });
  // Close on backdrop click
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });
  }


  /* ----- 4. TOAST NOTIFICATION HELPER ----- */
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }


  /* ----- 5. NEWSLETTER FORM ----- */
  const nlForm = document.querySelector('.nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = nlForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('✓ You\'re subscribed! Check your inbox shortly.');
        input.value = '';
      }
    });
  }


  /* ----- 6. SUBSCRIBE BUTTON (header) ----- */
  const subscribeBtn = document.querySelector('.subscribe-btn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function () {
      // Scroll down to the newsletter section
      const nlSection = document.querySelector('.newsletter');
      if (nlSection) {
        nlSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () {
          const input = nlSection.querySelector('input[type="email"]');
          if (input) input.focus();
        }, 600);
      }
    });
  }


  /* ----- 7. ACTIVE NAV LINK HIGHLIGHT ----- */
  // Highlights nav link matching the current page URL hash or pathname
  const currentPath = window.location.hash || window.location.pathname;
  document.querySelectorAll('.nav-list li a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = 'var(--gold)';
      link.style.borderBottomColor = 'var(--gold)';
    }
  });


  /* ----- 8. SCROLL-REVEAL for cards ----- */
  const revealEls = document.querySelectorAll('.card, .side-card, .trending-list li');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      observer.observe(el);
    });
  }


  /* ----- 9. TICKER PAUSE on hover ----- */
  const tickerText = document.querySelector('.ticker-track p');
  if (tickerText) {
    tickerText.addEventListener('mouseenter', function () {
      tickerText.style.animationPlayState = 'paused';
    });
    tickerText.addEventListener('mouseleave', function () {
      tickerText.style.animationPlayState = 'running';
    });
  }

});
