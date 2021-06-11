const navbarToggleBtn = document.querySelector('.header__nav-toggle-btn');
const navbarMenu = document.querySelector('.header__nav-menu');

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width > 1200) {
    if (navbarMenu.classList.contains('open')) {
      navbarMenu.classList.remove('open');
    }
  }
});

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});
