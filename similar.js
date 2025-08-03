

const openorclosebtntop = document.getElementById('menuopenorclose');
const themenuofsmall = document.getElementById('idmenuforsmallwindow');

let isMenuOpen = false;

function topmenufunc() {
  if (!isMenuOpen) {
    themenuofsmall.classList.remove('slide-up');
    themenuofsmall.style.display = 'flex';
    themenuofsmall.classList.add('slide-down');
    openorclosebtntop.classList.remove('fa-bars');
    openorclosebtntop.classList.add('fa-xmark');
    isMenuOpen = true;
  } else {
    themenuofsmall.classList.remove('slide-down');
    themenuofsmall.classList.add('slide-up');
    openorclosebtntop.classList.remove('fa-xmark');
    openorclosebtntop.classList.add('fa-bars');

    setTimeout(() => {
      themenuofsmall.style.display = 'none';
    }, 500); // match animation duration
    isMenuOpen = false;
  }
}

function checkWindowSize() {
  if (window.innerWidth > 1035) {
    themenuofsmall.classList.remove('slide-down', 'slide-up');
    themenuofsmall.style.display = 'none';
    openorclosebtntop.classList.remove('fa-xmark');
    openorclosebtntop.classList.add('fa-bars');
    isMenuOpen = false;
  }
}

window.addEventListener('resize', checkWindowSize);


