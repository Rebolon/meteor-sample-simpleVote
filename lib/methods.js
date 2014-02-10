Meteor.methods({
  "addSubject": function(data) {
    var subject = {label: null, count: 1},
        id;
    
    if (!data
        || !Match.test(data, Object)
        || !data.value.trim().length) {
      if (this.isSimulation) {
        Session.set('error', 'Le champ ne doit pas être vide');
        return;
      }
      throw new Meteor.Error(422, 'wrong parameter');
    }
    
    subject.label = data.value;
    
    if (!Subjects.find({label: data.value}).count()) {
      id = Subjects.insert(subject);
      return id;
    }
    
    if (this.isSimulation) {
      Session.set('error', 'label déjà présent');
      return;
    }
    throw new Meteor.Error(400, 'label déjà présent');
  },
  
  "rmSubject": function(id) {
    if (Rebolon.User.isAdmin(this.userId)) {
      var item = Subjects.findOne(id);
      
      if (!item) {
        if (this.isSimulation) {
          Session.set('error', 'sujet inconnu');
          return;
        }
        
        throw new Meteor.Error(404, 'sujet inconnu');
      }
      
      Subjects.remove({_id: id});
    }
  },
  
  "voteUpSubject": function(id) {
    var item = Subjects.findOne(id);
    
    if (!item) {
      if (this.isSimulation) {
        Session.set('error', 'sujet inconnu');
        return;
      }
      
      throw new Meteor.Error(404, 'sujet inconnu');
    }
    
    Subjects.update({_id: id}, {$inc: {count: 1}});
  },
  
  "voteDownSubject": function(id) {
    var item = Subjects.findOne(id);
    
    if (!item) {
      if (this.isSimulation) {
        Session.set('error', 'sujet inconnu');
        return;
      }
      
      throw new Meteor.Error(404, 'sujet inconnu');
    }
    
    if (item.count === 0) {
      if (this.isSimulation) {
        Session.set('error', 'on ne peut voter - si on est déjà à 0');
        return;
      }
      
      throw new Meteor.Error(501, 'on ne peut voter - si on est déjà à 0');
    }
    
    Subjects.update({_id: id}, {$inc: {count: -1}});
  }
});
