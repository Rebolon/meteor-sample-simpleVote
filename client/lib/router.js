Session.set('loadingData', null);

Router.configure({
  layoutTemplate: 'layout'
});

NProgress.configure({
  showSpinner: false
});

var filters = {
  nProgressHook: function(pause) {
    if (this.ready()) {
      NProgress.done();
    } else {
      NProgress.start();
      pause();    
    } 
  },
  animate: function() {
    if (this.ready()) {
      console.log('filters animate - enable animation');
      Rebolon.Animation.doAnimation = true;
    }
  }
};

Router.before(filters.nProgressHook, {
  only: ['main', 'top']
});
Router.after(filters.animate, {
  only: ['main', 'top']
});

Router.map(function() {
  var mainSub = /* Meteor */ new SubsManager({
    cacheLimit: 1,
    expireIn: 3
  });
  this.route('main', {
    path: '/vote',
    waitOn: function() {
      return [
        mainSub.subscribe('all-subjects')
      ];
    },
    onStop: function() {
      console.log('disable animation from route main onStop');
      Rebolon.Animation.doAnimation = false;
    }
  });

  var topSub = /* Meteor */ new SubsManager({
    cacheLimit: 5,
    expireIn: 3
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
        topSub.subscribe('top-subjects', Session.get('topLimit'))
      ];
    },
    onData: function() {
      Session.set('loadingData', 100);
    },
    onBeforeAction: function() {
      console.log('router onBeforeAction');
      Session.set('loadingData', NProgress.status*100);
      if (!this.ready()) this.render(); // to allow rendering whereas all subs are not loaded
    },
    onAfterAction: function() {
      console.log('router onAfterAction');
    },
    onStop: function() {
      console.log('router event onStop - disable animation');
      Rebolon.Animation.doAnimation = false;
    },
    action: function() {
      console.log('action');
      Session.set('loadingData', null);
      this.render();
    }
  });
  
  this.route('down', {
    path: '/down',

    onRun: function() {
      console.log('onRun');
    },
    waitOn: function() {
      console.log('waitOn');
      Session.set('loadingData', NProgress.status*100);
      return [
        topSub.subscribe('down-subjects', Session.get('topLimit'))
      ];
    },
    onData: function() {
      Session.set('loadingData', 100);
    },
    onBeforeAction: function() {
      console.log('router onBeforeAction');
      Session.set('loadingData', NProgress.status*100);
      if (!this.ready()) this.render(); // to allow rendering whereas all subs are not loaded
    },
    onAfterAction: function() {
      console.log('router onAfterAction');
    },
    onStop: function() {
      console.log('router event onStop - disable animation');
      Rebolon.Animation.doAnimation = false;
    },
    action: function() {
      console.log('action');
      Session.set('loadingData', null);
      this.render();
    }
  });
});
