





const express = require("express");
const app = express();

app.use(express.json());

app.use(require("./routes/health"));
app.use(require("./routes/pastes"));

module.exports = app;
