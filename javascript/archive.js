'use strict';
// Material Imports

material.archive = {};

// Ready Event
material.archive.ready = function() {
  var
    handler;

  handler = {
    attachEvents: function() {

    },

    createListItem: function(item) {
      var
        element = $('<li>').addClass('mdc-list-item'),
        text = $('<span>').addClass('mdc-list-item__text'),
        primaryText = $('<span>').addClass('mdc-list-item__primary-text').text(item.title),
        secondaryText = $('<span>').addClass('mdc-list-item__secondary-text').text(item.date);

      text.append(primaryText);
      text.append(secondaryText);

      element
        .on('click', event => {
          window.location.href = item.link;
        })
      ;

      MDCRipple.attachTo(element[0]);
      return element.append(text);
    },

    createList: function() {
      fetch('/data/archive.json')
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(data => {
                data.forEach(item => {
                  $('#main-content .mdc-card')
                    .append(handler.createListItem(item))
                  ;
                });
              })
            ;
          }
        })
      ;
    }
  };
  handler.createList();
  handler.attachEvents();

}

// Attach Ready Event
$(document)
  .ready(function() {
    material.archive.ready();
    material.ready();
  })
;
