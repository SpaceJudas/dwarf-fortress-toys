var sankey = require('./sankeyData.js');

//'Category:DF2014:Items'
//'Category:DF2014:Workshops'
sankey.SankeyData('Category:DF2014:Items', function(err, data) {
  console.log(JSON.stringify(data));
});
