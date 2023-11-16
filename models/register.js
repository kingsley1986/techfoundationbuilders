const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const registerschema = new mongoose.Schema({
  parent_firstname: {
    type: String,
    required: true,
  },
  parent_lastname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  cellnumber: {
    type: String,
    required: true,
  },

  childs_fullname: {
    type: String,
    required: true,
  },
  child_age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  interviewdate: {
    type: Date,
    required: true,

  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Register", registerschema);
