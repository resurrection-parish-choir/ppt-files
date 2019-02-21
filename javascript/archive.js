// Material Imports

material.archive = {};

// Ready Event
material.archive.ready = function() {
  var
    handler;

  handler = {
    attachEvents: function() {

    },

    createListItem: function(date, title, link) {
      var element = $('<li>').addClass('mdc-list-item');
      var text = $('<div>').addClass('mdc-list-item__text');
      var primaryText = $('<div>').addClass('mdc-list-item__primary-text').text(title);
      var secondaryText = $('<div>').addClass('mdc-list-item__secondary-text').text(date);
      text.append(primaryText);
      text.append(secondaryText);

      element
        .on('click', event => {
          window.location.href = link;
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
                data.forEach(element => {
                  $('#main-content .mdc-card')
                    .append(handler.createListItem(element.date, element.title, element.link))
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
