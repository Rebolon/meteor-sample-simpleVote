Meteor.startup(function funcMeteorStartupPublish() {
  var Future = Npm.require('fibers/future');

  Meteor.publish("all-subjects", function() {
      return Subjects.find();
  });

  Meteor.publish("top-subjects", function(limit) {
    var limitQuery = Match.test(limit, Number)
            && limit > 3 && limit < 10 ? limit : 3;
    return Subjects.find({}, {sort: {count: -1}, limit: limitQuery});
  });
  
  Meteor.publish("down-subjects", function(limit) {
    var limitQuery = Match.test(limit, Number)
            && limit > 3 && limit < 10 ? limit : 3;
    return Subjects.find({}, {sort: {count: 1}, limit: limitQuery});
  });
});
