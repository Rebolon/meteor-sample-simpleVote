var hooks = {
  insertElement: function(node, next) {
    if (Rebolon.Animation.doAnimation) {
      $(node).addClass('magictime animateNewVote');

      Deps.afterFlush(function() {
        // @TODO use promise / future coz too many nested calls
        $(node).width();
        Meteor.setTimeout(function() {
          $(node).removeClass('magictime animateNewVote');
        }, 500);
      });
    }

    $(node).insertBefore(next);
  },

  moveElement: function(node, next) {
    hooks.removeElement(node, next);
    hooks.insertElement(node, next);
  },

  removeElement: function(node, next) {
    if (Rebolon.Animation.doAnimation) {
      $(node).addClass('magictime animateRemovedVote');
    }

    Meteor.setTimeout(function () {
      $(node).remove();
    }, 1500);
    /* $(node).on('webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend', function() {
      console.log('animation ended node will be removed')
      $(node).remove();
    });*/
  }
};

Template.transition.rendered = function() {
  this.firstNode.parentNode._uihooks = hooks;
};