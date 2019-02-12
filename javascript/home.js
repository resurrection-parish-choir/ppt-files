// Material Imports
const MDCSnackbar = mdc.snackbar.MDCSnackbar;

material.home = {};

// Ready Event
material.home.ready = function() {
  var
    snackbar = $('.mdc-snackbar'),
    handler;

  handler = {
    initialize: function() {
      snackbar = new MDCSnackbar(snackbar[0]);
    },
    attachEvents: function() {
     
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

    makeList: function(key, value) {
      $('#'+key)
        .find('.mdc-list-item__primary-text')
        .text(value.hymn);
      ;
      $('#'+key)
        .find('.mdc-list-item__meta')
        .text(value.id);
      ;
    },

    getList: function() {
      fetch('/data/home.json')
        .then(response => {
          response.json()
            .then(data => {
              for (var key in data)
                handler.makeList(key, data[key]);
            })
          ;
        })
      ;
    }
  };

  handler.initialize();
  handler.attachEvents();
  handler.getList();
}

// Attach Ready Event
$(document)
  .ready(function() {
    material.home.ready();
    material.ready();
  })
;