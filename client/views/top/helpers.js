Template.top.helpers({
  getTop: function () {
    return "(" + Session.get('topLimit') + ")";
  },
  
  getLoadingStatus: function() {
    var text = _.isNumber(Session.get('loadingData')) ? 'Chargement des votes... ' + Session.get('loadingData').toFixed(2) + "%": 
      (Subjects.find().count() === 0 ? 'Aucun sujet en base, allez !' : '');
    return text;
  }
});

Template.topList.helpers({
  atLeatOneSubject: function () {
    return Subjects.find().count();
  },
  
  subjects: function () {
    return Subjects.find({}, {sort: {count: -1}});
  }
});
