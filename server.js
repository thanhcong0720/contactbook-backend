const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

mongoose
  .connect(config.db.uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"));

app.listen(config.app.port, (req, res) => {
  console.log(`Listening on port ${config.app.port}`);
});
