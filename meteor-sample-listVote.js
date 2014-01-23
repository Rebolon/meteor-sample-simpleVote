// Exemple simpe : pas de sécurité, autopublish, utilisation de minimongo
// Autre possibilité : sécurisation en supprimant le package insecure
// Et encore : passage par Meteor.methods pour les accès en écriture dans la base => Ajax like

// Collection, disponible client/serveur
Subjects = new Meteor.Collection('Subjects' /*'msl-subjects'*/);

// fonctions communes
isAdmin = function (user) {
    var isAdmin = 0;
    
    if (!user) {
      console.log("Utilisateur non connecté");
      return isAdmin;
    }
    
    user.profile.role.forEach(function (oneRole) {
      if ("admin" === oneRole) {
        isAdmin = true;
      }
    });
     
    return isAdmin;
  };

// config de accounts
Accounts.config({
  sendVerificationEmail : 0,
  forbidClientAccountCreation : 1
});

if (Meteor.isClient) {
  // fonctions côtés client
  resetError = function () {
    Session.set('error', '');
  };
  
  // Template main
  Session.setDefault("error", "");
  
  // Helper du template error
  Template.error.helpers({
    error: function () {
      return Session.get('error');
    }
  });
  
  // Template main
  Template.main.helpers({
    atLeatOneSubject: function () {
      return Subjects.find().count();
    },
    
    subjects: function () {
      return Subjects.find({}, {sort: {count: -1}});
    },
    
    isAdmin: function () {
      return isAdmin(Meteor.user());
    },
    
    hasError: function () {
      return !!Session.get('error');
    }
  });

  Template.main.events({
    'click .btn-remove-subject' : function () {
      /**
       * Attention 
       * sécurité inutile car : 
       *   1/ le btn ne s'affiche pas 
       *   2/ stt c'est facilement contournable via la console en copiant/collant le code entouré 
       *  donc : remove insecure ! et ajout de Allow/Deny
       */
      if (isAdmin) {
        Subjects.remove({_id: this._id});
      }
      
      resetError();
    },
    
    'click .btn-vote-up': function () {
      Subjects.update({_id: this._id}, {$inc: {count: 1}});
      
      resetError();
    },
    
    'click .btn-vote-down': function () {
      if (this.count === 0) {
        Session.set('error', 'on ne peut voter - si on est déjà à 0');
        return;
      }
      
      Subjects.update({_id: this._id}, {$inc: {count: -1}});
      
      resetError();
    },
    
    'click #btn-add-subject': function () {
      var el = document.querySelector('#fld-subject-label');
      
      if (!el
         || !el.value.trim().length) {
        Session.set('error', 'Le champ ne doit pas être vide');
        return;
      }
      
      if (!Subjects.find({label: el.value}).count()) {
        Subjects.insert({'label': el.value, 'count': 1});
        
        resetError();
      } else {
        Session.set('error', 'label déjà présent');
      }
    },
  });
}

if (Meteor.isServer) {
  // init app on first launch
  if (!Meteor.users.find({username : "rebolon"}).count()) {
    Accounts.createUser({
      username : "rebolon",
      email : "richard.tribes@gmail.com",
      password : "default",
      profile : {
        name : "Benjamin",
        role : ["admin"]
      }
    });
  }
}