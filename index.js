const express = require("express");
const mainRouter = require("./backend/routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Listning on port 3000");
});
