require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bodyParser = require("body-parser");

const webRoutes = require("./routes/web");
const messageRoutes = require("./routes/message");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", webRoutes);
app.use("/", messageRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});