Log.info('client/lib');

// fonctions client
(function () {
  Session.setDefault("error", "");
  Session.setDefault("topLimit", 3);
  
  var Main = {
    Alert: {
      resetError: function() {
        Session.set('error', '');
      }
    },
    Collection: {
      checkError: function(err, _id) {
        if (err) {
          Session.set('error', err.reason);
          return;
        }
        
        document.querySelector('#fld-subject-label').value = '';
        return _id;
      }
    }
  };
  
  Rebolon = typeof Rebolon !== "undefined" ? Rebolon : {};
  _.extend(Rebolon, Main);
})();
