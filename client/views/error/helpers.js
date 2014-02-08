// Helper du template error
Template.error.helpers({
  error: function () {
    return Session.get('error');
  }
});