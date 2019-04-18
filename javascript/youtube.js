// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'pYvrBs-iSOk',
    playerVars: {
      autoplay: 0,
      fs: 0,
      rel: 0,
      controls: 0,
      enablejsapi: 1,
      modestbranding: 1,
      origin: 'https://files.resurrectionparishchoir.gq'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': material.music.onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setVolume(100);
  event.target.setPlaybackQuality('small');
}
