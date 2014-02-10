Meteor.startup(function funcMeteorStartupPublish() {
  var Future = Npm.require('fibers/future');

  Meteor.publish("all-subjects", function() {
      // possible to use Meteor._wrapAsync in place of that code ?
      var future = new Future(),
        timeoutCb = function() {
            console.log('timeout called');
            future.return(Subjects.find());
        };

      Meteor.setTimeout(timeoutCb, 1000);

      return future.wait();
  });

  Meteor.publish("top-subjects", function(limit) {
    var future = new Future(),
        limitQuery = Match.test(limit, Number) 
            && limit > 3 && limit < 10 ? limit : 3; 
        timeoutCb = function() {
            future.return(Subjects.find({}, {sort: {count: -1}, limit: limitQuery}));
        };

    Meteor.setTimeout(timeoutCb, 1000);

    return future.wait();
  });
});
