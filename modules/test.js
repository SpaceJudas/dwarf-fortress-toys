var sankey = require('./sankeyData.js');
var _ = require('underscore');

//'Category:DF2014:Items'
//'Category:DF2014:Workshops'
sankey.SankeyData('Category:DF2014:Items', function(err, data) {
  countLeaves(data);
});

function countLeaves(data) {
  var linkDict = {};
  _.each(data.links, function(e) {
    if (!linkDict[e.source]) {
      linkDict[e.source] = {};
    }
    if (!linkDict[e.source][e.target]) {
      linkDict[e.source][e.target] = {};
    }
    linkDict[e.source][e.target] = e;
  });

  var leafCount = 0;
  _.each(data.nodes, function(e, i) {
    if (!linkDict[i]) {
      leafCount++;
    }
  });
  console.log(leafCount);
}
