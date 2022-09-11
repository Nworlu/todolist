var express = require('express');
var router = express.Router();
const Lists = require('../model/list.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Chuka is calm');
});

router.post('/', async function(req, res, next) {
  const newList = new Lists({
    name:req.body.name,
    date:req.body.date,
    completed:req.body.completed,
    importance:req.body.importance,
  })
  await newList.save()
  res.send(newList);
})

module.exports = router;
