const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const bookRoutes = require("./bookRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", bookRoutes);

// app.listen(5003, () => console.log("Book Service running on port 5003"));
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});