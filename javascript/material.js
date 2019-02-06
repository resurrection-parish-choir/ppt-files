const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCRipple = mdc.ripple.MDCRipple;
const MDCSnackbar = mdc.snackbar.MDCSnackbar;

$(document)
  .ready(function () {
    
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

    var iOS = false;
    platform = navigator.platform;
    if( platform==='iPad' || platform==='iPhone' || platform==='iPod' ) {
      iOS = true;
    }

    if (iOS) {
      $('.mdc-button')
        .attr('disabled', 'true')
      ;
      setTimeout(function (){
        snackbar.open();
      }, 2000);
    }

    let deferredPrompt;
    const a2hs = document.querySelector('#a2hs');
    a2hs.style.display = 'none';

    window.addEventListener('beforeinstallprompt', event => {
      deferredPrompt = event;
      a2hs.style.display = 'block';
    });

    a2hs.addEventListener('click', event => {
      a2hs.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice
        .then(choiceResult => {
          deferredPrompt = null;
        });
    })


    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    topAppBar.setScrollTarget(document.getElementById('main-content'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });

    const listEl = document.querySelector('.mdc-drawer .mdc-list');
    listEl.addEventListener('click', (event) => {
      drawer.open = false;
    });

    const selector = '.mdc-button, .mdc-list-item';
    const ripples = [].map.call(document.querySelectorAll(selector), function (element) {
      return new MDCRipple(element);
    })

  })
;

function download() {
  window.location.href = 'pdf/fifth-sunday-ot.pdf';
}

