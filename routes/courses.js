const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const mongoose = require("mongoose");

// Get all Blog posts

router.get("/", async (req, res) => {
  Course.find(function (err, courses) {
    console.log(courses);
    if (err) {
      console.log(err);
    } else {
      res.render("courses/index", {
        courses: courses,
        layout: false,
      });
    }
  });
});

// New blogpost routes
router.get("/new", async (req, res, next) => {
  renderNewPage(res, new Course());
});

// Create blogpost routes
router.post("/create", async (req, res, next) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  });
  try {
    const newCourse = await course.save();
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
    renderNewPage(res, course, true);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  Course.findById(req.params.id, function (err, course) {
    if (!course) {
      console.log("Noooooooooo");
      return next(new Error("Could not load Document"));
    } else {
      res.render("courses/edit", {
        course: course,
        layout: false,
      });
    }
  });
});

router.post("/:id/update", async (req, res, next) => {
  Course.findById(req.params.id, function (err, course) {
    if (req.body.title && req.body.url && req.body.description) {
      let course = {};
      course.title = req.body.title;
      course.url = req.body.url;
      course.description = req.body.description;
      let query = { _id: req.params.id };
      Course.updateOne(query, course, (err, course) => {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          res.redirect("/courses");
        }
      });
    }

    // res.s
  });
});

router.get("/:id/delete", async (req, res) => {
  Course.findById(req.params.id, function (err, course) {
    const ObjectId = mongoose.Types.ObjectId;

    let query = { _id: new ObjectId(req.params.id) };
    Course.deleteOne(query, function (err) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.redirect("/courses");
      }
    });
  });
});

//Handles the redirects
async function renderNewPage(res, course, hasError = false) {
  try {
    const params = {
      course: course,
      layout: false,
    };
    if (hasError) params.errorMessage = "Error Creating Post";
    res.render("courses/new", params);
  } catch {
    res.redirect("/courses");
  }
}

module.exports = router;
