const express = require("express");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.get("/scrape", (req, res) => {
  const url = "https://movie.douban.com/subject/26628282/";
  const json = {
    title: "",
    release: "",
  };

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);

      let title, release;

      title = $("h1").children().first().text();
      release = $("h1").children().last().text();

      json.title = title;
      json.release = release;
    }

    fs.writeFile("output.json", JSON.stringify(json, null, 4), (err) => {
      console.log(
        "File successfully written! - Check your project directory for the output.json file"
      );
    });

    res.send("Check your console!");
  });
});

app.listen("9000");

console.log("Magic happens on port http://localhost:9000");

exports = module.exports = app;
