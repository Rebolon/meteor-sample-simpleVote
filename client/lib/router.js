Session.set('loadingData', null);

Router.configure({
    layoutTemplate: 'layout'
});

var filters = {
    nProgressHook: function(pause) {
console.log('filters');
        if (this.ready()) {
            NProgress.done();
        } else {
            NProgress.start();
            pause();    
        } 
    }
};

Router.before(filters.nProgressHook, {
  only: 
    ['main', 'top']
});

Router.map(function() {
    this.route('main', {
        path: '/vote',
        waitOn: function() {
          return [
            Meteor.subscribe('all-subjects')
          ];
        }
    });

    this.route('top', {
        path: '/',
        
        onRun: function() {
          console.log('onRun');
        },
        waitOn: function() {
          console.log('waitOn');
          Session.set('loadingData', NProgress.status*100);
          return [
            Meteor.subscribe('top-subjects', Session.get('topLimit'))
          ];
        },
        onData: function() {
          console.log('onData');
          Session.set('loadingData', 100);
        },
        onBeforeAction: function() {
          console.log('onBeforeAction');
          Session.set('loadingData', NProgress.status*100);
          if (!this.ready()) this.render(); // to allow rendering whereas all subs are not loaded
        },
        onAfterAction: function() {
          console.log('onAfterAction');
        },
        onStop: function() {
          console.log('onStop');
        },
        action: function() {
          console.log('action');
          Session.set('loadingData', null);
          this.render();
        }
    });
});
