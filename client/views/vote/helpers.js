Template.vote.helpers({
  atLeatOneSubject: function () {
    return Subjects.find().count();
  },
  
  subjects: function () {
    return Subjects.find({}, {sort: {count: -1}});
  },
  
  isAdmin: function () {
    return Rebolon.User.isAdmin(Meteor.user());
  },
  
  hasError: function () {
    return !!Session.get('error');
  },
  
  getLoadingStatus: function() {
    return NProgress.status ? 'Chargement des votes...' : 
    (Subjects.find().count() === 0 ? 'Aucun sujet en base, allez !' : '');
  }
});