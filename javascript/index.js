if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        reg.installing;   // installing worker or undefined
        reg.waiting;      // waiting worker or undefined
        reg.active;       // active worker or undefined

        reg.addEventListener('updatefound', () => {
          // A wild service worker has appeared
          const newWorker = reg.installing;

          newWorker.state;
          /*
          'installing'  - install event has fired, but not yet complete
          'installed'   - install complete
          'activating'  - activate event has fired, but not yet complete
          'activated'   - fully active
          'redundant'   - discarded. Either failed install, or it's been replaced
          */

          newWorker.addEventListener('statechanged', () => {
            // new worker has changed
          });          
        });
      });
    
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      /* 
      This fires when the service worker controlling this page changes
      eg a new worker has skipped waiting and become the new active worker.
      */
    });
  });
}
