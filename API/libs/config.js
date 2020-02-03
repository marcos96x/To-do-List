const bodyParser = require("body-parser");
const cors = require("cors")

module.exports = app => {
  app.use(bodyParser.json());
  app.set("port", 3001);
  app.set("database", require("./../src/models/db")());

  app.use(cors({
    origin: "*"
  }))
};