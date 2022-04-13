import express from "express";

let app = express();

app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.get("/api/pictureandaddress", cors(), (req, res) => {
  const pic = req.params.pic; // handle picture (or pic address)
  const address = req.params.add;
  // TODO: save to db and combine them
});
