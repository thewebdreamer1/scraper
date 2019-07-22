const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const webParse = require('./webParse');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function(html) {
    //success!
    const wikiUrls = [];
    for (let i = 0; i < 45; i++) {
      wikiUrls.push($('big > a', html)[i].attribs.href);
    }
    return Promise.all(
      wikiUrls.map(function(url) {
        return webParse('https://en.wikipedia.org' + url);
      })
    );
  })
  .then(function(presidents) {
    console.log(presidents);
    fs.writeFile("output.json", JSON.stringify(presidents), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Data has been added to file.");
      }
    });
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });

  module.exports = rp;
