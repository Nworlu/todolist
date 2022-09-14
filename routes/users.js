var express = require("express");
var router = express.Router();
const Lists = require("../model/list.js");

/* GET All Lists. */
router.get("/", async function (req, res, next) {
  await Lists.find({})
    .then((data) => {
      res.status(200).send(data);
      console.log(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send("An error occured while trying to retrieve the Lists");
    });
});

/* Get List By Id */
router.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  await Lists.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send(`The List with this Id: ${id} does not exist`);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Some error occured while trying to retrieve the list");
    });
});

/* Get List By Name */
router.get("/name/:name", async (req, res) => {
  let name = req.params.name;
  await Lists.findOne({ name: name }).then((data) => {
    res.send(data);
    console.log(data);
  });
});

router.post("/", async function (req, res, next) {
  const newList = new Lists({
    name: req.body.name,
    date: req.body.date,
    completed: req.body.completed,
    importance: req.body.importance,
  });
  await newList.save();
  res.send(newList);
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newList = await Lists.findByIdAndUpdate(id, {
      name: req.body.name,
      completed: req.body.completed,
      importance: req.body.importance,
    });
    res.send(newList);
  } catch (error) {
    res.send(error);
  }
});
// http://localhost:4000/users/631e451ad33d48b0f4ea310c

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const newList = await Lists.findByIdAndDelete(id);
    res.send(newList);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
