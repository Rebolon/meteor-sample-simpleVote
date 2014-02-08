Log.info('client/lib');

// fonctions côtés client
(function () {
  Session.setDefault("error", "");
  
  var Main = {
    Alert: {
      resetError: function () {
        Session.set('error', '');
      }
    }
  };
  
  Rebolon = typeof Rebolon !== "undefined" ? Rebolon : {};
  _.extend(Rebolon, Main);
})();