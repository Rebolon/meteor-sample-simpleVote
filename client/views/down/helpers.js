Template.down.helpers({
  getDown: function () {
    return "(" + Session.get('downLimit') + ")";
  },
  
  getLoadingStatus: function() {
    var text = _.isNumber(Session.get('loadingData')) ? 'Chargement des votes... ' + Session.get('loadingData').toFixed(2) + "%": 
      (Subjects.find().count() === 0 ? 'Aucun sujet en base, allez !' : '');
    return text;
  }
});

Template.downList.helpers({
  atLeatOneSubject: function () {
    return Subjects.find().count();
  },
  
  subjects: function () {
    return Subjects.find({}, {sort: {count: 1}});
  }
});
