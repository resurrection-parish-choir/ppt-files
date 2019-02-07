// Material Imports
const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCRipple = mdc.ripple.MDCRipple;
const MDCSnackbar = mdc.snackbar.MDCSnackbar;

//Namespace
window.material = {
  handler: {}
};

material.home = {};

// Ready Event
material.home.ready = () => {
  var
    drawer = $('.mdc-drawer'),
    topAppBar = $('#app-bar'),
    listItem = $('.mdc-drawer .mdc-list .mdc-list-item'),
    snackbar = $('.mdc-snackbar'),

    mainContent = $('#main-content'),
    handler;

  const rippleSelector = '.mdc-button, .mdc-list-item';

  handler = {
    initialize: () => {
      snackbar = new MDCSnackbar(snackbar[0]);
      drawer = MDCDrawer.attachTo(drawer[0]);
      topAppBar = MDCTopAppBar.attachTo(topAppBar[0]);  
    },
    attachEvents: () => {
      topAppBar.setScrollTarget(mainContent[0]);
      topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
      });

      listItem.click(event => {
        drawer.open = false;
      });

      const ripples = [].map.call($(rippleSelector), element => {
        return new MDCRipple(element);
      });
    },
    checkInstalled: () => {
      let deferredPrompt;
      const a2hs = $('#a2hs');
      a2hs.css('visibility', 'hidden');

      $(window)
        .on('beforeinstallprompt', event => {
          deferredPrompt = event.originalEvent;
          a2hs.css('visibility', 'visible');
        })
      ;
      a2hs
        .on('click', event => {
          a2hs.css('visibility', 'hidden');
          deferredPrompt.prompt();
          deferredPrompt.userChoice
            .then(choiceResult => {
              deferredPrompt = null;
            });
        })
      ;
    }
  };

  handler.initialize();
  handler.attachEvents();
  handler.checkInstalled();
}

// Attach Ready Event
$(document)
  .ready(material.home.ready)
;

function download() {
  window.location.href = 'pdf/fifth-sunday-ot.pdf';
}