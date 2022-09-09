var express = require('express');
var router = express.Router();
const Lists = require('../model/list.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {
  const newList = new Lists({
    name:req.body.name,
    date:req.body.date,
    completed:req.body.completed,
  })
  await newList.save()
  res.send(newList);
})

module.exports = router;
