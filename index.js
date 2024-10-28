const express = require("express");
const fs = require("fs");
const { format } = require("date-fns");
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hello Render World");
});

app.get("/read", (request, response) => {
  let data = [];
  let filenames = fs.readdirSync("./Date&Time/");
  filenames.forEach((file, ind) => {
    data.push(`file-${ind + 1}: ${file}`);
  });
  response.json(data);
});

app.get("/post", (request, response) => {
  let currentDate = format(new Date(), "dd-MM-yyyy-HH-mm-SS");

  fs.writeFile(`./Date&Time/${currentDate}.txt`, currentDate, (error) => {
    if (!error) {
      response.json(`New text file created ${currentDate}.txt`);
    } else {
      response.json("Error: ", error);
    }
  });
});

app.listen(4444, () => {
  console.log(`Server is running on http://localhost:4444`);
});
