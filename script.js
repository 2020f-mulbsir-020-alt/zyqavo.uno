(function () {
  'use strict';

  /* ============================================
     Navigation Menu
     ============================================ */
  const menuBtn = document.getElementById('menuBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    menuBtn.setAttribute('aria-expanded', 'true');
    navOverlay.classList.add('is-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', function () {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ============================================
     Scroll Brand Reveal
     ============================================ */
  const scrollBrand = document.getElementById('scrollBrand');
  const openingSection = document.getElementById('opening');

  function handleScrollBrand() {
    if (!openingSection || !scrollBrand) return;
    const openingBottom = openingSection.getBoundingClientRect().bottom;
    if (openingBottom < 0) {
      scrollBrand.classList.add('is-visible');
      scrollBrand.setAttribute('aria-hidden', 'false');
    } else {
      scrollBrand.classList.remove('is-visible');
      scrollBrand.setAttribute('aria-hidden', 'true');
    }
  }

  /* ============================================
     Passport Stamp Hover Effects
     ============================================ */
  const stampCards = document.querySelectorAll('.stamp-card');

  stampCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.classList.add('is-stamped');
    });
    card.addEventListener('mouseleave', function () {
      card.classList.remove('is-stamped');
    });
  });

  /* ============================================
     Philosophy Section — Scroll-Triggered
     ============================================ */
  const philosophySlides = document.querySelectorAll('.philosophy__slide');

  function updatePhilosophy() {
    philosophySlides.forEach(function (slide) {
      const rect = slide.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4;
      slide.classList.toggle('is-active', visible);
    });
  }

  /* ============================================
     Experience Atlas — Interactive Markers
     ============================================ */
  const atlasData = {
    morocco: {
      title: 'Morocco',
      image: 'https://images.unsplash.com/photo-1569387330134-fcb946c44f05?w=560&q=80',
      alt: 'Sahara desert dunes at sunset',
      duration: '12 days',
      type: 'Desert Immersion',
      season: 'Autumn'
    },
    kyoto: {
      title: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e912f1f7?w=560&q=80',
      alt: 'Traditional Japanese temple with autumn foliage',
      duration: '10 days',
      type: 'Temple & Tea Ceremony',
      season: 'Winter'
    },
    patagonia: {
      title: 'Patagonia',
      image: 'https://images.unsplash.com/photo-1551632811-561732b1e23d?w=560&q=80',
      alt: 'Patagonian glacier and mountain peaks',
      duration: '14 days',
      type: 'Glacier Trek',
      season: 'Spring'
    },
    cappadocia: {
      title: 'Cappadocia',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=560&q=80',
      alt: 'Hot air balloons over Cappadocia',
      duration: '8 days',
      type: 'Balloon & Cave Dwellings',
      season: 'Summer'
    },
    iceland: {
      title: 'Iceland',
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=560&q=80',
      alt: 'Northern lights over Icelandic landscape',
      duration: '9 days',
      type: 'Aurora & Highlands',
      season: 'Winter'
    },
    zanzibar: {
      title: 'Zanzibar',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=560&q=80',
      alt: 'Tropical beach in Zanzibar',
      duration: '11 days',
      type: 'Spice Islands',
      season: 'Spring'
    }
  };

  const atlasInfo = document.getElementById('atlasInfo');
  const atlasMarkers = document.querySelectorAll('.atlas__marker');
  let activeMarker = null;

  function showAtlasInfo(marker, data) {
    if (!atlasInfo) return;

    const img = atlasInfo.querySelector('.atlas__info-img');
    const title = atlasInfo.querySelector('.atlas__info-title');
    const duration = atlasInfo.querySelector('.atlas__info-duration');
    const type = atlasInfo.querySelector('.atlas__info-type');
    const season = atlasInfo.querySelector('.atlas__info-season');

    img.src = data.image;
    img.alt = data.alt;
    title.textContent = data.title;
    duration.textContent = data.duration;
    type.textContent = data.type;
    season.textContent = data.season;

    const container = marker.closest('.atlas__map-container');
    const markerRect = marker.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let left = markerRect.left - containerRect.left + 20;
    let top = markerRect.top - containerRect.top - 10;

    if (left + 280 > containerRect.width) {
      left = markerRect.left - containerRect.left - 300;
    }
    if (top + 260 > containerRect.height) {
      top = containerRect.height - 270;
    }
    if (top < 10) top = 10;
    if (left < 10) left = 10;

    atlasInfo.style.left = left + 'px';
    atlasInfo.style.top = top + 'px';
    atlasInfo.classList.add('is-visible');
    atlasInfo.setAttribute('aria-hidden', 'false');
  }

  function hideAtlasInfo() {
    if (!atlasInfo) return;
    atlasInfo.classList.remove('is-visible');
    atlasInfo.setAttribute('aria-hidden', 'true');
  }

  atlasMarkers.forEach(function (marker) {
    const key = marker.getAttribute('data-marker');
    const data = atlasData[key];
    if (!data) return;

    marker.addEventListener('mouseenter', function () {
      atlasMarkers.forEach(function (m) { m.classList.remove('is-active'); });
      marker.classList.add('is-active');
      activeMarker = marker;
      showAtlasInfo(marker, data);
    });

    marker.addEventListener('focus', function () {
      atlasMarkers.forEach(function (m) { m.classList.remove('is-active'); });
      marker.classList.add('is-active');
      activeMarker = marker;
      showAtlasInfo(marker, data);
    });

    marker.addEventListener('mouseleave', function () {
      marker.classList.remove('is-active');
      hideAtlasInfo();
    });

    marker.addEventListener('blur', function () {
      marker.classList.remove('is-active');
      hideAtlasInfo();
    });
  });

  /* ============================================
     Testimonial Letters — Fold/Unfold
     ============================================ */
  const letters = document.querySelectorAll('.letter');

  letters.forEach(function (letter) {
    const foldBtn = letter.querySelector('.letter__fold');
    const content = letter.querySelector('.letter__content');

    foldBtn.addEventListener('click', function () {
      const isOpen = letter.classList.contains('is-open');

      letters.forEach(function (other) {
        if (other !== letter) {
          other.classList.remove('is-open');
          other.querySelector('.letter__fold').setAttribute('aria-expanded', 'false');
          other.querySelector('.letter__content').hidden = true;
        }
      });

      if (isOpen) {
        letter.classList.remove('is-open');
        foldBtn.setAttribute('aria-expanded', 'false');
        content.hidden = true;
      } else {
        letter.classList.add('is-open');
        foldBtn.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      }
    });
  });

  /* ============================================
     Scroll Reveal for Sections
     ============================================ */
  const revealElements = document.querySelectorAll(
    '.passport-strip__header, .atlas__header, .journals__header, ' +
    '.moments-gallery__header, .testimonial-letters__header, ' +
    '.upcoming-journeys__header, .membership-circle__container'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  function updateReveal() {
    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('is-visible');
      }
    });
  }

  /* ============================================
     Parallax on Opening Photo
     ============================================ */
  const openingPhoto = document.querySelector('.opening-spread__photo img');

  function handleParallax() {
    if (!openingPhoto) return;
    const scrollY = window.scrollY;
    const openingHeight = openingSection ? openingSection.offsetHeight : 0;
    if (scrollY < openingHeight) {
      const offset = scrollY * 0.15;
      openingPhoto.style.transform = 'scale(1.05) translateY(' + offset + 'px)';
    }
  }

  /* ============================================
     Throttled Scroll Handler
     ============================================ */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScrollBrand();
        updatePhilosophy();
        updateReveal();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Initial state */
  handleScrollBrand();
  updatePhilosophy();
  updateReveal();

  /* ============================================
     Passport Strip — Auto-scroll hint on mobile
     ============================================ */
  const passportTrack = document.querySelector('.passport-strip__track');

  if (passportTrack && window.matchMedia('(max-width: 768px)').matches) {
    let scrollDirection = 1;
    let autoScrollPaused = false;

    passportTrack.addEventListener('touchstart', function () {
      autoScrollPaused = true;
    }, { passive: true });

    passportTrack.addEventListener('touchend', function () {
      setTimeout(function () { autoScrollPaused = false; }, 3000);
    }, { passive: true });
  }

})();
