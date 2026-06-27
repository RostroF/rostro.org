// Top nav: hamburger dropdown + slide away when the footer comes into view.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  var nav = document.querySelector('.site-nav');
  var footer = document.querySelector('.site-footer');

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Hamburger dropdown
  if (toggle && menu) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        menu.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Slide the top nav up and out once the footer (the bottom bar) appears.
  if (nav && footer && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          nav.classList.add('nav-hidden');
          closeMenu();
        } else {
          nav.classList.remove('nav-hidden');
        }
      });
    }, { threshold: 0 });
    obs.observe(footer);
  }
})();
