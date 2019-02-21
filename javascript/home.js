// Material Imports
const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const MDCDialog = mdc.dialog.MDCDialog;
const MDCTextFieldHelperText = mdc.textField.MDCTextFieldHelperText;

material.home = {};

// Ready Event
material.home.ready = function() {
  var
    snackbar = $('.mdc-snackbar'),
    dialog = $('.mdc-dialog'),
    passwordTextField = $('.password.mdc-text-field'),
    helperText = $('.mdc-text-field-helper-text'),
    handler;

  handler = {
    initialize: function() {
      snackbar = new MDCSnackbar(snackbar[0]);
      dialog = new MDCDialog(dialog[0]);
      passwordTextField = new MDCTextField(passwordTextField[0]);
      helperText = new MDCTextFieldHelperText(helperText[0]);
    },
    attachEvents: function() {
     
      $('.download.mdc-button')
        .on('click', event => {
          dialog.open();
        })
      ;

      dialog.listen('MDCDialog:closed', event => {
        let action = event.detail.action;
        if (action === 'accept') {
          var password = $('#pw').val();
          var hash = CryptoJS.MD5(password, 'secret').toString();
          if (hash !== '8a2c1ee4c9faf18992a59cedd9023349') {
            passwordTextField.valid = false;
            passwordTextField.helperTextContent = 'The password entered in incorrect';
            dialog.open();
          } else {
            window.location.href = '/pdf/seventh-sunday-ot.pdf';
          }
        }
      })

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
