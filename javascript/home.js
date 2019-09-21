'use strict';
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
          //dialog.open();
          window.location.href = '/pdf/twenty-fifth-sunday-ot.pdf';
        })
      ;
      
      /*
      dialog.listen('MDCDialog:closed', event => {
        let action = event.detail.action;
        if (action === 'accept') {
          var password = $('#pw').val();
          var hash = CryptoJS.MD5(password, 'secret').toString();
          if (hash !== '8a2c1ee4c9faf18992a59cedd9023349') {
            passwordTextField.valid = false;
            passwordTextField.helperTextContent = 'The password entered in incorrect';
            $('#pw').val('');
            dialog.open();
          } else {
            window.location.href = '/pdf/fifth-sunday-easter.pdf';
          }
        }
      })
      */

      $('.mdc-snackbar__dismiss')
        .on('click', event => {
          snackbar.close();
        })
      ;

    },
   
    createList: function(key, value) {
      var
        title = key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' '),
        element = $('<li>').addClass('mdc-list-item'),
        text = $('<span>').addClass('mdc-list-item__text'),
        graphic = $('<span>').addClass('mdc-list-item__graphic'),
        meta = $('<span>').addClass('mdc-list-item__meta').text(value["id"]),
        icon = $('<i>').addClass('material-icons').text('info_outline'),
        primaryText = $('<span>').addClass('mdc-list-item__primary-text').text(value["hymn"]),
        secondaryText = $('<span>').addClass('mdc-list-item__secondary-text').text(title);

      graphic.append(icon);
      text.append(primaryText);
      text.append(secondaryText);
      element.append(graphic);
      element.append(text);
      element.append(meta);
      MDCRipple.attachTo(element[0]);

      return element;
    },
    getList: function() {
      fetch('/data/home.json')
        .then(response => {
          response.json()
            .then(data => {
              for (let key in data) {
                $('#content-list')
                  .append(handler.createList(key, data[key]))
                ;
              }
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
