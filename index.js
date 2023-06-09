const express = require("express");
require("dotenv").config();
const PORT = 8001;
const app = express();
const { db, query } = require("./database");
const cors = require("cors");
const { authRoutes, productRoutes } = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
