const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const homeController = require("./controllers/home");
const payrollController = require("./controllers/payroll");

var PORT = process.env.PORT ?? 7000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/payroll", payrollController);
app.use("/", homeController);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
