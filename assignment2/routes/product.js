const express = require("express");
const router = express.Router();


router.get("/products", (req, res) => {
  res.send([{ id: 123, name: "Raushan", netWorth: "1bn" }]);
});

module.exports = router;