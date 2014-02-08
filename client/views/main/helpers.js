Template.main.helpers({
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
  }
});