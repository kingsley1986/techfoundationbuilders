const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    console.log("kdfjkdjfkdjfkdjkj")
    res.render("contactus", {layout: false})
})

module.exports = router;