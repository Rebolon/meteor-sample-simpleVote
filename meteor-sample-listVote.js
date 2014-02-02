// Exemple simpe : pas de sécurité, autopublish, utilisation de minimongo
// Autre possibilité : sécurisation en supprimant le package insecure
// Et encore : passage par Meteor.methods pour les accès en écriture dans la base => Ajax like

// Collection, disponible client/serveur
Subjects = new Meteor.Collection('Subjects' /*'msl-subjects'*/);

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
    
    hasError: function () {
      return !!Session.get('error');
    }
  });

  Template.main.events({
    'click button': function() {
      resetError();
    },
    
    'focus #fld-subject-label': function() {
      resetError();
    },
    
    'click .btn-vote-up': function () {
      Subjects.update({_id: this._id}, {$inc: {count: 1}});
    },
    
    'click .btn-vote-down': function () {
      if (this.count === 0) {
        Session.set('error', 'on ne peut voter - si on est déjà à 0');
        return;
      }
      
      Subjects.update({_id: this._id}, {$inc: {count: -1}});
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
        el.value = '';
      } else {
        Session.set('error', 'label déjà présent');
      }
    },
  });
}

