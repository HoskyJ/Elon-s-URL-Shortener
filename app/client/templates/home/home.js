/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
UsersURLs = new Mongo.Collection('usersURLs');

Template.Home.events({
  'click .shorten': function(e, tmpl) {
    e.preventDefault();

    // Grab the url from the input it is stored in and put it into
    // an object to pass in to the url-shortener/shorten method
    var url = $('.url-to-shorten').val();

    UrlShortener.shorten(url, function(err, res) {
      if (err) {
        sAlert.error("That is a bad url");
        console.log(err);
      } else {
        Session.set('shortUrl', res.path);
        $('.url-to-shorten').val('');
        //Change 'show' session to true to display loaded text.
        //(imitation of in-process sentences like "loading packages").
        event.preventDefault();
        Session.set('show', true);
      }
    });
    }

});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  shortUrl: function() {
    return Session.get('shortUrl');
},
show: function() {
      return Session.get('show');
    }
});
/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
  Session.set('shortUrl', '');
};

Template.Home.destroyed = function () {
};
