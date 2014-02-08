Template.main.events({
  'click button': function() {
    Rebolon.Alert.resetError();
  },
  
  'focus #fld-subject-label': function() {
    Rebolon.Alert.resetError();
  },
  
  'click .btn-remove-subject' : function () {
    /**
       * Attention 
       * sécurité inutile car : 
       *   1/ le btn ne s'affiche pas 
       *   2/ stt c'est facilement contournable via la console en copiant/collant le code entouré 
       *  donc : remove insecure ! et ajout de Allow/Deny
       */
    if (Rebolon.User.isAdmin(Meteor.user())) {
      Subjects.remove({_id: this._id});
    }
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
    var el = document.querySelector('#fld-subject-label'),
        data = {label: null, count: 1};
    
    if (!el
        || !el.value.trim().length) {
      Session.set('error', 'Le champ ne doit pas être vide');
      return;
    }
    
    data.label = el.value;
    
    if (!Subjects.find({label: data.label}).count()) {
      Subjects.insert(data);
    } else {
      el.value = '';
      Session.set('error', 'label déjà présent');
    }
  },
});
