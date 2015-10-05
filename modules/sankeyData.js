'use strict'

var dfwiki = require('./dfwiki');
var _ = require('underscore');

var getSankeyJson = function (allNodes) {
  var nodes = [];
  var links = [];
  var nodePositions = {};

  _.each(_.keys(allNodes), function (title, index) {
    nodes.push({name: title});
    nodePositions[title] = index;
  });
  //console.log(allNodes);

  _.each(allNodes, function (node, title) {
    _.each(node.children, function(child) {
      links.push({
        source: nodePositions[node.title],
        target: nodePositions[child.title],
        value: 1
      });
    })
  });

  return ({
    nodes: nodes,
    links: links
  });
}

module.exports.ValidateData = function(categoryName) {
  module.exports.SankeyData(categoryName, function(err, sankeydata) {
    sankeydata.nodes.forEach(function (node, index) {
      if (seenIds[node.id]) {
        console.error('Duplicate node at index ',index);
        console.error('Seen: ',seenIds[node.id]);
        console.error('This:', node);
      }
      seenIds[node.id] = node;
    });
    sankeydata.links.forEach(function (link, index) {
      if(!seenIds[link.source]) {
        console.log(link.source)
        console.error('Link source id not found');
        console.dir(link);
      }
      if(!seenIds[link.target]) {
        console.log(link.target)
        console.error('Link target id not found');
        console.dir(link);
      }
    });
    console.log('done!')
    console.log(sankeydata);
  })
}

//'Category:DF2014:Items'
//'Category:DF2014:Workshops'
//callback is of the form fun (err, data)
module.exports.SankeyData = function(categoryName, callback) {
  dfwiki.expandCategory(categoryName, function (err, allNodes) {
    callback(null, getSankeyJson(allNodes));
  });
}
