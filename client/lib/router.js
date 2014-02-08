Router.configure({
    layoutTemplate: 'layout'
});

var progress = function(handle) {
    if (handle.ready()) {
        NProgress.done();
    } else {
        NProgress.start();
        this.stop();
    }
};

Router.map(function() {
    this.route('main', {
        path: '/vote',
        before: function() {
            var handle = Meteor.subscribe('all-subjects');
            progress.call(this, handle);
        }
    });

    this.route('top', {
        path: '/',
        before: function() {
            var handle = Meteor.subscribe('top-subjects', Session.get('topLimit'));
            progress.call(this, handle);
        }
    });
});
