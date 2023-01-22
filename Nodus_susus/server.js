let express = require("express");
let app = express();
let port = 6969;
let path = require("path");

app.use("/database", express.static(path.join(__dirname, "public")));
app.use("/home", express.static(path.join(__dirname, "public/index.html")));

//Liten to port
app.listen(port, () => {
  console.log("Nodus has arrived");
});
