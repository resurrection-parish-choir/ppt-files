'use strict';
// Material Imports
const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCTextField = mdc.textField.MDCTextField;
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
    searchTextField = $('.search.mdc-text-field'),
    search = $('.search input')[0],
    listItem = $('.mdc-drawer .mdc-list .mdc-list-item'),

    pageTitle = searchTextField.find('input').attr('placeholder'),
    mainContent = $('#main-content'),
    searchOpen = false,
    handler;

  const rippleSelector = '.mdc-button, .mdc-list-item';

  handler = {
    initialize: function() {
      drawer = MDCDrawer.attachTo(drawer[0]);
      topAppBar = MDCTopAppBar.attachTo(topAppBar[0]);
      searchTextField = new MDCTextField(searchTextField[0]);

      search.disabled = true;
    },
    attachEvents: function() {
      topAppBar.setScrollTarget(mainContent[0]);
      topAppBar.listen('MDCTopAppBar:nav', () => {
        if (searchOpen) {
          search.value = '';
          search.placeholder = pageTitle;
          search.disabled = true;
          $('#app-bar').removeClass('search-focused');
          $('a.nav-icon').text('menu');
          searchOpen = false;
        }
        else {
          drawer.open = !drawer.open;
        }
      });

      listItem.click(event => {
        drawer.open = false;
      });

      const ripples = [].map.call($(rippleSelector), element => {
        return new MDCRipple(element);
      });

      $('section[role="toolbar"] a.search')
        .on('click', event => {
          search.disabled = false;
          searchTextField.focus();
        })
      ;

      $('.search.mdc-text-field input')
        .on('focus', event => {
          event.target.placeholder = '';
          $('#app-bar').addClass('search-focused');
          $('a.nav-icon').text('arrow_back');
          searchOpen = true;
        })
      ;
      
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
