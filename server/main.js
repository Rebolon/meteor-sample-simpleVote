// init app on first launch
if (!Meteor.users.find({username : "rebolon"}).count()) {
  Accounts.createUser({
    username : "rebolon",
    email : "richard.tribes@gmail.com",
    password : "default",
    profile : {
      name : "Benjamin",
      role : ["admin"]
    }
  });
}