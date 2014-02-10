Template.main.events({
  'click button': function() {
    Rebolon.Alert.resetError();
  },
  
  'focus #fld-subject-label': function() {
    Rebolon.Alert.resetError();
  },
  
  'click .btn-remove-subject' : function () {
	  Meteor.call('rmSubject', this._id);
  },
  
  'click .btn-vote-up': function () {
    Meteor.call('voteUpSubject', this._id);
  },
  
  'click .btn-vote-down': function () {
	  Meteor.call('voteDownSubject', this._id);
  },
  
  'click #btn-add-subject': function () {
    var el = document.querySelector('#fld-subject-label'),
        data = {};
        
    data.value = el.value || '';
    Meteor.call('addSubject', data, Rebolon.Collection.checkError); 
  },
});
