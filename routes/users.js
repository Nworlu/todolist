var express = require('express');
var router = express.Router();
const Lists = require('../model/list.js')

/* GET All Lists. */
router.get('/', async function(req, res, next) {
 await Lists.find({})
  .then(data=>{
    res.status(200).send(data)
    console.log(data)
  })
  .catch(err=>{
    res.status(500).send('An error occured while trying to retrieve the Lists')
  })
});

/* Get List By Id */
router.get('/id/:id', async (req,res)=>{
  let id = req.params.id
  await Lists.findById(id)
  .then(data=>{
    if(!data){
      res.status(404).send(`The List with this Id: ${id} does not exist`)
    } else{
      res.status(200).send(data)
    }
  })
  .catch(err=>{
    res.status(500).send('Some err happened while trying to retrieve the list')
  })
})

/* Get List By Name */
router.get('/name/:name', async (req,res)=>{
  let name = req.params.name
  await Lists.findOne({name:name})
  .then(data=>{
    res.send(data)
  console.log(data);
  })
})

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
