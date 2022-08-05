const express = require("express");
require("dotenv").config();
const app = express();
const route = require("./routes");
const cors = require("cors");
app.use(cors());
/*const mysql = require("mysql");
const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB, //ravenbooks
});*/

// middle
app.use(express.json());

//routing
app.use("/", route); // parses incoming requests with JSON payloads



const listener = app.listen(process.env.PORT || 4000, () => {
    console.log('App is listening on port ' + listener.address().port)
})