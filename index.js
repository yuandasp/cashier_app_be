const express = require("express");
const PORT = 8001;
const app = express();
const { db, query } = require("./database");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
