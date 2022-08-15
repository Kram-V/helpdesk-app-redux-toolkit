const path = require("path");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const conn = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// TO CONNECT WITH MONGODB
conn();

// IT ALLOWS US TO SEND JSON
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/refunds", require("./routes/refundRoutes"));

// SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Helpdesk App" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
