'use strict';
// Material Imports
const { MDCSlider } = mdc.slider;
const { MDCTab } = mdc.tab;
const { MDCTabIndicator } = mdc.tabIndicator;
const { MDCTabScroller } = mdc.tabScroller;
const { MDCTabBar } = mdc.tabBar;
const { MDCList } = mdc.list;

var slider = $('.mdc-slider');
material.music = {};

// Ready Event
material.music.ready = function() {
  var
    tabScroller = $('.mdc-tab-scroller'),
    tabBar = $('.mdc-tab-bar'),
    songTitle = $('h2.demo-card__title'),
    list = $('.mdc-list--two-line'),
    handler;

  handler = {
    initialize: function() {
      slider = new MDCSlider(slider[0]);
      tabScroller = new MDCTabScroller(tabScroller[0]);
      tabBar = new MDCTabBar(tabBar[0]);
      list = new MDCList(list[0]);
    },

    attachEvents: function() {
      list.singleSelection = true;
      
      $('.mdc-fab')
        .on('click', event => {
          if (player.getPlayerState() == YT.PlayerState.PLAYING ||
              player.getPlayerState() == YT.PlayerState.BUFFERING) {
            player.pauseVideo();
          } else {
            player.playVideo();
          }
        })
      ;
    },

    changeTrack: function(track) {
      songTitle.text(track.title);
      player.cueVideoById(track.code);
      player.playVideo();
      $('.mdc-fab__icon').text('play_arrow');
    },

    createTab: function(letter) {
      var
        _tab = $('<button>').addClass('mdc-tab mdc-tab--min-width').attr('role', 'tab'),
        _tabContent = $('<span>').addClass('mdc-tab__content'),
        _contentText = $('<span>').addClass('mdc-tab__text-label').text(letter),
        _indicator = $('<span>').addClass('mdc-tab-indicator'),
        _indicatorContent = $('<span>').addClass('mdc-tab-indicator__content mdc-tab-indicator__content--underline'),
        _tabRipple = $('<span>').addClass('mdc-tab__ripple')
      ;
      if (letter === 'A') {
        _tab.addClass('mdc-tab--active');
        _indicator.addClass('mdc-tab-indicator--active')
      }

      _indicator.append(_indicatorContent);
      _tabContent.append(_contentText);
      _tabContent.append(_indicator);
      _tab.append(_tabContent);
      _tab.append(_tabRipple);

      _tab
        .on('click', event => {
          handler.getPlaylist(letter);
        })
      ;

      return _tab;
    },

    createTabBar: function() {
      for (var i=65; i<=90; i++){
        $('.mdc-tab-scroller__scroll-content')
          .append(handler.createTab(String.fromCharCode(i)))
        ;
      }
      const tabs = [].map.call(document.querySelectorAll('.mdc-tab'), el => {
        return new MDCTab(el);
      })
      const tabIndicator = [].map.call(document.querySelectorAll('.mdc-tab-indicator'), el => {
        return new MDCTabIndicator(el);
      })
      handler.getPlaylist('A');
    },

    createPlaylist: function(item, index) {
      var
        element = $('<li>').addClass('mdc-list-item'),
        text = $('<span>').addClass('mdc-list-item__text'),
        primaryText = $('<span>').addClass('mdc-list-item__primary-text').text(item.title),
        secondaryText = $('<span>').addClass('mdc-list-item__secondary-text').text(item.author);
      ;
      text.append(primaryText);
      text.append(secondaryText);

      element
        .on('click', event => {
          handler.changeTrack(item);
        })
      ;

      MDCRipple.attachTo(element[0]);
      return element.append(text);
    },

    getPlaylist: function(letter) {
      fetch(letter+'.json')
        .then(response => {
          $('#main-content .mdc-list').empty();
          if (response.status === 200) {
            response.json()
              .then(data => {
                data.forEach((item, index) => {
                  $('#main-content .mdc-list')
                    .append(handler.createPlaylist(item, index))
                  ; 
                });
              })
            ;
          } else {
            $('#main-content .mdc-list')
              .append(handler.createPlaylist({title: 'No songs found', author: ''}))
            ;
          }
        })
      ;
    },

  };

  handler.createTabBar();
  handler.initialize();
  handler.attachEvents();
}

material.music.onPlayerStateChange = function(event) {
  var
    elapsedTime = $('#track-elapsed'),
    totalTime = $('#track-total'),
    playerTicks,
    handler;

  handler = {

    attachEvents: function() {
      slider.listen('MDCSlider:input', () => {
        clearTimeout(playerTicks);
        player.seekTo(handler.setCurrentProgress());
      });
    },

    handleChange: function() {
      if (event.data == YT.PlayerState.ENDED) {
        $('.mdc-fab__icon').text('replay');
      } else if (event.data == YT.PlayerState.PAUSED) {
        $('.mdc-fab__icon').text('play_arrow');
      } else if (event.data == YT.PlayerState.PLAYING) {
        $('.mdc-fab').removeClass('hidden');
        $('.mdc-fab__icon').text('pause');
        totalTime.text(handler.secondsToClock(player.getDuration()));
        playerTicks = setInterval(function () {
          elapsedTime.text(handler.secondsToClock(player.getCurrentTime()));
          slider.value = handler.getCurrentProgress();
        }, 1000);
      } else if (event.data == YT.PlayerState.CUED) {
        $('.mdc-fab').addClass('hidden');
        slider.value = 0;
        elapsedTime.text('00:00');
        totalTime.text('00:00');
      } else {
        clearTimeout(playerTicks);
      }
    },

    getCurrentProgress: function() {
      var playerTotalDuration = player.getDuration();
      var playerCurrentTime = player.getCurrentTime();
      return (playerCurrentTime/playerTotalDuration)*100;
    },

    setCurrentProgress: function() {
      var playerTotalDuration = player.getDuration();
      return (slider.value*playerTotalDuration)/100;
    },

    secondsToClock: function(duration) {
      var rawTime = Math.floor(duration);
      var min = Math.floor(rawTime % 3600 / 60);
      var sec = Math.floor(rawTime % 3600 % 60);
      
      var minDisplay = min < 10 ? "0"+min : ""+min;
      var secDisplay = sec < 10 ? "0"+sec : ""+sec;
      return minDisplay+":"+secDisplay;
    }
  }
  handler.handleChange();
  handler.attachEvents();
}

// Attach Ready Event
$(document)
  .ready(function() {
    material.music.ready();
    material.ready();
  })
;
