const express = require("express");
const router = express.Router();

const payrollService = require("../services/payroll.js");

router.post("/", async (req, res) => {
  const { country, salary, currency } = req.body;

  const payrollCalculated = await payrollService(country, salary, currency);

  res.send(payrollCalculated);
});

module.exports = router;
