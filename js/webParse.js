
const rp = require('request-promise');
const $ = require('cheerio');

const webParse = function(url) {
  return rp(url)
    .then(function(html) {
      var term = $('.infobox.vcard b', html).first().parents('td').text();
      return {
        name: $('.firstHeading', html).text(),
        birthday: $('.bday', html).text(),
        image: $('a.image img',html).attr('src').replace('//','https://'),
        term: term
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = webParse;
