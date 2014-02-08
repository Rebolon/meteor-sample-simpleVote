Template.top.helpers({
  getTop: function () {
    return "(" + Session.get('topLimit') + ")";
  },

  atLeatOneSubject: function () {
    return Subjects.find().count();
  },
  
  subjects: function () {
    return Subjects.find({}, {sort: {count: -1}});
  }
});
