(function() {
  // Theme Toggle Logic
  function initTheme() {
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');
    const body = document.body;

    function setTheme(theme) {
      if (theme === 'dark') {
        body.classList.remove('light');
        body.classList.add('dark');
        if (btnDark) btnDark.classList.add('active');
        if (btnLight) btnLight.classList.remove('active');
      } else {
        body.classList.remove('dark');
        body.classList.add('light');
        if (btnLight) btnLight.classList.add('active');
        if (btnDark) btnDark.classList.remove('active');
      }
    }

    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));

    // Set default theme
    setTheme('light');
  }

  // Gallery Slider Logic
  function initGallery(galleryItems) {
    const slidesContainer = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.getElementById('prevArrow');
    const nextBtn = document.getElementById('nextArrow');

    if (!slidesContainer || !galleryItems) return;

    let currentSlide = 0;
    let slides = [];

    function buildSlides() {
      slidesContainer.innerHTML = '';
      galleryItems.forEach((item, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        if (index === 0) slideDiv.classList.add('active');

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title;
        img.className = 'slide-img';
        img.loading = 'lazy';

        const captionDiv = document.createElement('div');
        captionDiv.className = 'slide-caption';
        captionDiv.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;

        slideDiv.appendChild(img);
        slideDiv.appendChild(captionDiv);
        slidesContainer.appendChild(slideDiv);
        slides.push(slideDiv);
      });
    }

    function updateDotsAndArrows() {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });

      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        galleryItems.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.className = 'dot';
          if (idx === currentSlide) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentSlide = idx;
            updateDotsAndArrows();
          });
          dotsContainer.appendChild(dot);
        });
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % galleryItems.length;
      updateDotsAndArrows();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + galleryItems.length) % galleryItems.length;
      updateDotsAndArrows();
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch support
    let touchStartX = 0;
    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    });

    buildSlides();
    updateDotsAndArrows();
  }

  // Export to window
  window.Bokoto = {
    initTheme: initTheme,
    initGallery: initGallery
  };

  // Auto-init theme
  document.addEventListener('DOMContentLoaded', initTheme);
})();
