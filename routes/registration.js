const express = require("express");
const router = express.Router();
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");

const sgMail = require("@sendgrid/mail");

router.post("/register", async (req, res) => {

  console.log(req.body)
  const response_key = req.body["g-recaptcha-response"];
  console.log(response_key, "Response")
  if (!req.body["g-recaptcha-response"]) {
    return res.status(400).json({ error: "reCaptcha token is missing" });
  }

  try {
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}
        &response=${req.body["g-recaptcha-response"]}`;

    const response = await axios.post(googleVerifyUrl);
    // console.log(response);

    const { success } = response.data;

    if (success && req.body.email) {
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const output = `
      				<h3>Contact Details </h3>
      				<ul>
          				<li><h1>Parent Firstname: ${req.body.firstname}</h1></li>
          				<li><h3>Parent Lastname</h3>: ${req.body.lastname}</li>
                  <li>Country: ${req.body.country}</li>
                   <li>State: ${req.body.state}</li>
                    <li>Email: ${req.body.email}</li>
                     <li>Phone: ${req.body.cellnumber}</li>
                      <li>Child Fullname: ${req.body.childs_fullname}</li>
                       <li>Child Age: ${req.body.child_age}</li>
                        <li>Gender: ${req.body.gender}</li>
                         <li>Grade: ${req.body.grade}</li>


      				</ul>
      				<h3>Message</h3>
					  <p>Request: ${req.body.message}</p>
					  `;

        const msg = {
          to: "youngafricanstechnology@gmail.com",
          from: "youngafricanstechnology@gmail.com",
          subject: "requested",
          text: output,
          html: output,
        };
        sgMail.send(msg);
        res.json(msg);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("check body, name or success");
      res.json(msg);
    }
  } catch (e) {
    console.log(e);
    res.json(msg);
  }
});

router.get("/new", async (req, res) => {
  res.render("register", { layout: false });
});

module.exports = router;
