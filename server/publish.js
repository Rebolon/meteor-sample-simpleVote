Meteor.startup(function funcMeteorStartupPublish() {
  Meteor.publish("all-subjects", function () {
      return Subjects.find();
  });
});