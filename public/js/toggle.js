const navbarToggleBtn = document.querySelector('.header__nav-toggle-btn');
const navbarMenu = document.querySelector('.header__nav-menu');

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});
