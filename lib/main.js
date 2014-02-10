Log.info('lib');

// fonctions communes
(function (){
  var Main = {
    User: {
      isAdmin: function (user) {
        var isAdmin = 0;
        
        if (!user) {
          console.log("Utilisateur non connecté");
          return isAdmin;
        }

        if (Match.test(parseInt(user), Number)) {
            user = Meteor.users.findOne(user);
        }

        if (!Match.test(user, Object)) {
            throw new Meteor.Error(422, 'wrong parameter');
        }

        user.profile.role.forEach(function (oneRole) {
          if ("admin" === oneRole) {
            isAdmin = true;
          }
        });
        
        return isAdmin;
      }
    }
  };
  
  Rebolon = typeof Rebolon !== "undefined" ? Rebolon : {};
  _.extend(Rebolon, Main);
})();
