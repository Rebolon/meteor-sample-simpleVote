Meteor.startup(function funcMeteorStartupPublish() {
  Meteor.publish("all-subjects", function() {
      return Subjects.find();
  });

  Meteor.publish("top-subjects", function(limit) {
    var limitQuery = Match.test(limit, Number)
            && limit > 3 && limit < 10 ? limit : 3;
    return Subjects.find({}, {sort: {count: -1}, limit: limitQuery});
  });
});
