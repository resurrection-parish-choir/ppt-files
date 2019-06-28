'use strict';
// Material Imports
const { MDCSelect } = mdc.select;

material.archive = {};

// Ready Event
material.archive.ready = function() {
  var
    yearSelect = $('#year-select'),
    seasonSelect = $('#season-select'),
    archiveList = $('#main-content .mdc-list'),
    selectedYear,
    selectedSeason,
    handler;

  handler = {
    initialize: function() {
      yearSelect = new MDCSelect(yearSelect[0]);
      seasonSelect = new MDCSelect(seasonSelect[0]);

      handler.attachEvents();
    },
    attachEvents: function() {
      yearSelect.listen('MDCSelect:change', event => {
        selectedYear = yearSelect.value;
      });
      seasonSelect.listen('MDCSelect:change', event => {
        selectedSeason = seasonSelect.value;
      });

      $('.action-button')
        .on('click', event => {
          handler.createList();
        })
      ;
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
      fetch(selectedYear+'.json')
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(data => {
                archiveList.empty();
                for (let item of data[selectedSeason]) {
                  archiveList.append(handler.createListItem(item));
                }
              })
            ;
          }
        })
      ;
    }
  };
  handler.initialize();

}

// Attach Ready Event
$(document)
  .ready(function() {
    material.archive.ready();
    material.ready();
  })
;
