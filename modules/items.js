'use strict'

var dfwiki = require('./dfwiki');
var _ = require('underscore');

var getSankeyJson = function (allNodes) {
  var links = [];
  var nodes = _.map(_.values(allNodes), function(n) {
    _.each(n.children, function(c) {
      links.push({
        source: n.pageid,
        target: c.pageid,
        value: 1
      });
    });
    return {name: n.title, id: n.pageid};
  });
  return ({
    nodes: nodes,
    links: links
  })
}

dfwiki.expandCategory('Category:DF2014:Items', function (err, allNodes) {
  console.log(getSankeyJson(allNodes));
});
