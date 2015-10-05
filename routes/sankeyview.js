var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sankeyview', { jsonfile: 'energy.json', title:'items on a sankey' });
});

router.get('/workshops', function(req, res, next) {
  res.render('sankeyview', { jsonfile: 'workshops.json', title:'items on a sankey' });
});

router.get('/items', function(req, res, next) {
  res.render('sankeyview', { jsonfile: 'items.json', title:'items on a sankey' });
});

module.exports = router;
