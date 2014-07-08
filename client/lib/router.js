Session.set('loadingData', null);

Router.configure({
  layoutTemplate: 'layout'
});

NProgress.configure({
  showSpinner: false
});

filters = {
  nProgressHook: function(pause) {
    console.log('filters', 'nProgressHook');
    
    if (this.ready()) {
      NProgress.done();
      Session.set('loadingData', 100);
    } else {
      NProgress.start();
      pause();    
    } 
  },
  animate: function() {
    console.log('filters', 'animate');
    
    if (this.ready()) {
      Rebolon.Animation.doAnimation = true;
    }
  }
};

_.extend(filters, {
  onBeforeAction: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'onBeforeAction');},
  onAfterAction: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'onAfterAction');},
  onData: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'onData');},
  onRun: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'onRun');},
  onStop: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'onStop');},
  waitOn: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'waitOn'); return [];},
  action: function(type) {var type = typeof type != 'undefined' && typeof type != 'function' ? type : 'filters'; console.log(type, 'action');}
});

Router.onBeforeAction(filters.onBeforeAction);
Router.onAfterAction(filters.onAfterAction);
Router.onData(filters.onData);
Router.onRun(filters.onRun);
Router.onStop(filters.onStop);
Router.waitOn(filters.waitOn);

Router.onBeforeAction(filters.nProgressHook, {
  only: ['vote', 'top', 'down']
});
Router.onAfterAction(filters.animate, {
  only: ['vote', 'top', 'down']
});

Router.map(function() {
  /**
   * / => home
   */
  this.route('home', {
    path: '/',

    onRun: function() {
      filters.onRun('home');
    },
    waitOn: function() {
      filters.waitOn('home');
    },
    onData: function() {
      filters.onData('home');
    },
    onBeforeAction: function() {
      filters.onBeforeAction('home');
    },
    onAfterAction: function() {
      filters.onAfterAction('home');
    },
    onStop: function() {
      filters.onStop('home');
    },
    action: function() {
      filters.action('home');
      
      this.redirect('/top');
    }
  });
  
  /**
   * /vote => vote
   */
  var mainSub = /* Meteor */ new SubsManager({
    cacheLimit: 1,
    expireIn: 3
  });
  this.route('vote', {
    path: '/vote',
    waitOn: function() {
      filters.waitOn('vote');
      
      return [
        mainSub.subscribe('all-subjects')
      ];
    },
    onStop: function() {
      filters.onStop('vote');
      
      Rebolon.Animation.doAnimation = false;
    },
    onBeforeAction: function() {filters.onBeforeAction('vote');},
    onAfterAction: function() {filters.onAfterAction('vote');},
    onData: function() {filters.onData('vote');},
    onRun: function() {filters.onRun('vote');},
    action: function() {
      filters.action('vote');
      
      this.render();
    }
  });

  /**
   * /top => top
   */
  var topSub = /* Meteor */ new SubsManager({
    cacheLimit: 5,
    expireIn: 3
  });
  this.route('top', {
    path: '/top',

    onRun: function() {
      filters.onRun('top');
    },
    waitOn: function() {
      filters.waitOn('top');
      
      Session.set('loadingData', NProgress.status*100);
      return [
        topSub.subscribe('top-subjects', Session.get('topLimit'))
      ];
    },
    onData: function() {
      filters.onData('top');
      
      Session.set('loadingData', 100);
    },
    onBeforeAction: function() {
      filters.onBeforeAction('top');
      
      Session.set('loadingData', NProgress.status*100);
      if (!this.ready()) this.render(); // to allow rendering whereas all subs are not loaded
    },
    onAfterAction: function() {
      filters.onAfterAction('top');
    },
    onStop: function() {
      filters.onStop('top');
      
      Rebolon.Animation.doAnimation = false;
    },
    action: function() {
      filters.action('top');
      
      Session.set('loadingData', null);
      this.render();
    }
  });
  
  /**
   * /down => down
   */
  var downSub = /* Meteor */ new SubsManager({
    cacheLimit: 5,
    expireIn: 3
  });
  this.route('down', {
    path: '/down',

    onRun: function() {
      filters.onRun('down');
    },
    waitOn: function() {
      filters.waitOn('down');
      
      Session.set('loadingData', NProgress.status*100);
      return [
        downSub.subscribe('down-subjects', Session.get('downLimit'))
      ];
    },
    onData: function() {
      filters.onData('down');
      
      Session.set('loadingData', 100);
    },
    onBeforeAction: function() {
      filters.onBeforeAction('down');
      
      Session.set('loadingData', NProgress.status*100);
      if (!this.ready()) this.render(); // to allow rendering whereas all subs are not loaded
    },
    onAfterAction: function() {
      filters.onAfterAction('down');
    },
    onStop: function() {
      filters.onStop('down');
      
      Rebolon.Animation.doAnimation = false;
    },
    action: function() {
      filters.action('down');
      
      Session.set('loadingData', null);
      this.render();
    }
  });
});
