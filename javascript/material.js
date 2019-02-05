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

    const selector = '.mdc-button, .mdc-list-item, mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), function (element) {
      return new MDCRipple(element);
    })

    const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
    iconButtonRipple.unbounded = true;
    
    const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
    
  })
;

function download() {
  window.location.href = 'pdf/fifth-sunday-ot.pdf';
}
