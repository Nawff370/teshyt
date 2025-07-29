

const BookButton = document.getElementById('booknowbutton')
BookButton.addEventListener('click', function() {
    BookButton.classList.add('top-bookbuttonclicked')
})



const openorclosebtntop = document.getElementById('menuopenorclose')

const themenuofsmall = document.getElementById('idmenuforsmallwindow')
function topmenufunc() {
    // Get the real computed display value
    const chh = window.getComputedStyle(themenuofsmall).display;

    if (chh === 'none') {
        openorclosebtntop.classList.remove("fa-bars");
        openorclosebtntop.classList.add("fa-xmark");
        themenuofsmall.style.display = "flex";
    } else {
        openorclosebtntop.classList.remove("fa-xmark");
        openorclosebtntop.classList.add("fa-bars");
        themenuofsmall.style.display = "none";
    }
}

function checkWindowSize() {
      const myDiv = document.getElementById('idmenuforsmallwindow')
      if (window.innerWidth > 1035) {
        openorclosebtntop.classList.remove("fa-xmark");
        openorclosebtntop.classList.add("fa-bars");
        myDiv.style.display = 'none'
      }
    }

    window.addEventListener('resize', checkWindowSize)