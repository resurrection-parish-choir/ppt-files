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

      $('.download.mdc-button')
        .on('click', event => {
          var iOS = false;
          var platform = window.navigator.platform;
          if (  platform === 'iPhone' || 
                platform === 'iPad' || 
                platform === 'iPod' ) {
            iOS = true;
          }
          if (iOS) {
            $(this).attr('disabled', 'true');
            snackbar.open();
            return;
          }
          window.location.href = 'pdf/sixth-sunday-ot.pdf';
        })
      ;

      $('.mdc-snackbar__dismiss')
        .on('click', event => {
          snackbar.close();
        })
      ;
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
  handler.checkInstalled();
  handler.attachEvents();

}

// Attach Ready Event
$(document)
  .ready(material.home.ready)
;