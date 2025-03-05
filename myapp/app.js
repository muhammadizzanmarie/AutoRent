const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./router.js");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); 


app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
