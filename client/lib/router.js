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
        waitOn: function() {
            var handle = Meteor.subscribe('all-subjects');
            progress.call(this, handle);
        },
        fastRender: true
    });

    this.route('top', {
        path: '/',
        waitOn: function() {
            var handle = Meteor.subscribe('top-subjects', Session.get('topLimit'));
            progress.call(this, handle);
        },
        fastRender: true
    });
});
