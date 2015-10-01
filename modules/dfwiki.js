'use strict'

var _ = require('underscore');
var mediawiki = require('nodemw');

var dfwiki = new mediawiki({ server: 'dwarffortresswiki.org/', path: '/'});

var isCategory = function (page) { return page.title.indexOf('Category:') === 0 };
var stripCategory = function (page) { return page.title.replace('Category:','')};

//
module.exports = dfwiki;

//callback is function (root, allNodes)
//root element looks like {title, pageid, children:[]}
//allNodes object also includes the root, which maybe it shouldn't???
module.exports.expandCategory = function (categoryTitle, callback) {
  var allNodes = {};
  var queue = [];

  dfwiki.api.call({action: 'query', titles: categoryTitle}, function (err, content) {
    var root = content.query.pages.page;
    allNodes[root.title] = root;
    queue.push(root);
    iterate();
  }

  function iterate() {
    if (queue.length === 0) {
      if (callback) {
        callback(allNodes);
      }
      return;
    }

    var nextItem = queue.shift();
    if (allNodes[nextItem.title]) {
      iterate();
      return;
    }
    allNodes[nextItem.title] = nextItem;

    if (isCategory(nextItem))
    {
      dfwiki.getPagesInCategory(stripCategory(nextItem), function (err, pages) {
        if (err) {
          console.log('err: ',err);
          return err;
        }
        allNodes[nextItem.title].children = [];
        _.each(pages, function(p) {
          p.parent = nextItem.title;
          allNodes[nextItem.title].children.push(p);
          queue.push(p);
        });
        //bulk: queue = queue.concat(pages)
        //bulk: allNodes[nextItem].children = pages
        iterate();
      });
    }
    else {
      iterate();
      return;
    }
  }
}
