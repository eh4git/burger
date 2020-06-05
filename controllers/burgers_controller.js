var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

router.get("/", function(req,res) {
    res.redirect("/burger");
});

// Create all our routes and set up logic within those routes where required.
router.get("/burger", function(req, res) {
    burger.all(function(burger_data) {
    //  console.log(burger_data)
      var hbsObject = {
        burgers: burger_data
      };
      // console.log("hbs Object: "+hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"],
      [req.body.burger_name, req.body.devoured],
     function(result) {
       console.log("Post is being hit")
      console.log("id result.insertID: "+ result.insertId)
      res.json({id:result.insertId});
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
   burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
     burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  


module.exports = router;