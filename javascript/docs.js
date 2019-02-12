// Material Imports
const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCRipple = mdc.ripple.MDCRipple;

//Namespace
window.material = {
  handler: {}
};

// Ready Event
material.ready = function() {
  var
    drawer = $('.mdc-drawer'),
    topAppBar = $('#app-bar'),
    listItem = $('.mdc-drawer .mdc-list .mdc-list-item'),

    mainContent = $('#main-content'),
    handler;

  const rippleSelector = '.mdc-button, .mdc-list-item';

  handler = {
    initialize: function() {
      drawer = MDCDrawer.attachTo(drawer[0]);
      topAppBar = MDCTopAppBar.attachTo(topAppBar[0]);  
    },
    attachEvents: function() {
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

      $('.mdc-drawer a:not("#a2hs")')
        .on('click', event => {
          let url = $(event.target).attr('data-href');
          if (url) {
            $('body')
              .on('MDCDrawer:closed', () => {
                window.location.href = url;
              })
            ;
          }
        })
      ;

    },
    checkInstalled: function() {
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