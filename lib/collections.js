// Collection, disponible client/serveur
Subjects = new Meteor.Collection('Subjects' /*'msl-subjects'*/);

Subjects.allow({
  transform: function (doc) {
    var allowedFields = ['label', 'count', '_id'],
        prevDoc = doc,
        doc = _.pick(prevDoc, allowedFields);
  
    if (!Match.test(doc.count, Number)) {
      delete doc.count;
    }

    if (_.has(doc, 'label')
        && doc.label.length === 0) {
      delete doc.label;
    }
    
    return doc;
  },
  
  insert: function(userId, doc) {
    if (doc.label) {
      doc.count = 1;
      return doc;
    }
    
    return false;
  },
  
  update: function(userId, doc, fieldNames, modifier) {
    var allowedFields = ['count'],
        denyedFields = _.difference(fieldNames, allowedFields);

    if (denyedFields.length === 0) {
      return true;
    }
    
    throw new Meteor.Error(501, "HAHA je vous ai vu");
  },
  
  remove: function(userId, doc) {
    if (Rebolon.User.isAdmin(userId)) {
      return true;
    }
    
    return false;
  }
});