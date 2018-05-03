// Udacity Project: Feed Reader Testing
// Alvaro Fernandez
/* jshint esversion: 6 */

/* NOTE This is the spec file that Jasmine will read and contains
all of the tests that will be run against your application. */

/* NOTE We're placing all of our tests within the $() function,
since some of these tests may require DOM elements. We want
to ensure they don't run until the DOM is ready. */
$(function() {

  /* NOTE This suite is all about the RSSfeeds definitions,
  the allFeeds variable in our application. */
  describe('RSS Feeds', function() {

    /* Checks if the allFeeds variable has been defined and that it is not empty. */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Check if feeds from 'allfeeds' have a url defined and it's not empty */
    it('urls are defined and not empty', function() {
      for (const feed of allFeeds) {
        // Check if url it's defined for each element
        expect(feed.url).toBeTruthy();
      }
    });

    /* Check if feeds from 'allfeeds' have a name defined and it's not empty */
    it('names are defined and not empty', function() {
      allFeeds.forEach(function(feed){
        // Check if name it's defined for each element
        expect(feed.name).toBeTruthy();
      });
    });
  });


  /* NOTE The menu test suit will check if menu is hidden and
  visibility when the icon it's clicked */
  describe('The menu', function() {

    // We define the variables globally to use them later.
    let menu = $('body');
    let menuToggle = $('.menu-icon-link')[0];

    // Check if the menu element is hidden by default.
    it('element is hidden by default', function() {
      expect(menu.hasClass('menu-hidden')).toBeTruthy();
    });

    /* Checks that the menu toggles visibility when user
    clicks the icon */
    it('visibility changes when icon its clicked', function() {
      // When the menu it's toggle, body class should be empty
      menuToggle.click();
      expect(menu.hasClass('')).toBeTruthy();
      // When the menu it's toggle again, body class should be menu-hidden
      menuToggle.click();
      expect(menu.hasClass('menu-hidden')).toBeTruthy();
    });

  });

  /* NOTE: "Initial Entries" Will check if the loadFeed function
  loads the feeds properly */
  describe('Initial Entries', function () {

    // We declare the feeds variable for later use.
    let feeds;

    /* Because loadFeed is an asynchronous function we use
    beforeEach functionality and the special done() function to
    make the test once the loadFeed function finished */
    beforeEach(function(done) {

      // loads the feeds with id = 0.
      loadFeed(0, done);
    });

    /* Test that the loadFeed function introduce elements inside
    the feeds container. */
    it('loadFeed finished', function(done) {
      // Stores the feed entries in the variable.
      feeds = $('.feed .entry');
      /* Checks that the number of elements inside the feed container it's greater than 0 */
      expect(feeds.length).toBeGreaterThan(0);
      done();
    });
  });


  /* NOTE: New feed selection test will check for new entries
  when the feed it's updated or changed */
  describe('New Feed Selection', function() {

    // We defined the oldArticle variable where the old entry
    // will be sotred
    let oldArticle;

    /* loadFeed it's asynchronous so we have to wait the function
    to finish before running the test. */
    beforeEach(function(done) {
      // Loads the feeds with id = 0.
      loadFeed(0, function() {
        // Store one article (of the first feed) in the oldArticle variable
        oldArticle = $('.entry-link')[0];
      });
      // Load a new feed different from the previous one.
      loadFeed(1, done);
    });

    /* Run the test to check that the top new article it's different from the top new article. */
    it('loads new feed and changes content correctly', function(done) {
      // Store the new article in a variable.
      let newArticle = $('.entry-link')[0];
      // The new article should be different from the oldArticle.
      expect(newArticle.innerHTML).not.toBe(oldArticle.innerHTML);
      done();
    });

  });
}());
