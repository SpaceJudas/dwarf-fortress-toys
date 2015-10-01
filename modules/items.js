'use strict'

var dfwiki = require('./dfwiki');
var _ = require('underscore');

function transformCategoryToJson() {
  dfwiki.expandCategory('Category:DF2014:Items', function (root, allNodes) {
    _.map(allNodes, function(node) {
      console.log(node);
      return node;
    })
  });
}

transformCategoryToJson();
