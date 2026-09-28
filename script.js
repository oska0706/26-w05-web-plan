const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = primaryNav ? primaryNav.querySelectorAll('a') : [];
const desktopQuery = window.matchMedia('(min-width: 801px)');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function setMenuState(isOpen) {
  if (!menuButton || !primaryNav) return;

  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? '메뉴 닫기' : '메뉴 열기';
  primaryNav.classList.toggle('is-open', isOpen);
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;

    setMenuState(false);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
      block: 'start'
    });
    window.history.pushState(null, '', targetId);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

desktopQuery.addEventListener('change', (event) => {
  if (event.matches) setMenuState(false);
});
