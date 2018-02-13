const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const categories = [
  {
    name: 'arts',
    id: 1301
  }, {
    name: 'business',
    id: 1321
  }, {
    name: 'comedy',
    id: 1303
  }, {
    name: 'games-hobbies',
    id: 1323
  }, {
    name: 'government-organizations',
    id: 1325
  }, {
    name: 'health',
    id: 1307
  }, {
    name: 'kids-family',
    id: 1305
  }, {
    name: 'music',
    id: 1310
  }, {
    name: 'music',
    id: 1311
  }, {
    name: 'religion-spirituality',
    id: 1314
  }, {
    name: 'science-medicine',
    id: 1315
  }, {
    name: 'society-culture',
    id: 1324
  }, {
    name: 'sports-recreation',
    id: 1316
  }, {
    name: 'tv-film',
    id: 1309
  }, {
    name: 'technology',
    id: 1318
  }
];




app.get('/', async function(req, res) {
  try {
    const promiseArray = [];
    const podcasts = [];

    const urlList = buildCategoriesUrlList(categories);
    urlList.forEach(url => {
      promiseArray.push(fetchpods(url));
    });
    
    const webPages = await Promise.all(promiseArray);
    webPages.forEach(webpage => {
      const $ = cheerio.load(webpage);
      const $columns = $('#selectedcontent .column');
      
      $columns.toArray().forEach(column => {
        const podcastListElement = column.children[1];
        const firstColPodcastLinks = podcastListElement.children.filter(element => element.type === 'tag');
        const oneColumnPods = firstColPodcastLinks.map(element => buildPodcastData($(element)));
        podcasts.push(...oneColumnPods);
      });
    });

    res.send(podcasts);
  } catch (error) {
    res.send(error.message);
  }
});

function fetchDifferentCategories(){

}

function buildPodcastData($element) {
  const podUrl = $element.children().attr('href');
  const splitUrl = splitUrlOnSlash(podUrl);
  const name = $element.text().trim();
  const id = splitUrl[6].match(/[0-9]\d+/)[0];
  return {id, name, podUrl};
}

function buildCategoriesUrlList(categories){
  const urlList = [];
  categories.forEach((category) => {
    let link = `https://itunes.apple.com/us/genre/podcasts-${category.name}/id${category.id}?mt=2`
    urlList.push(link);
  });
  return urlList;
}

function splitUrlOnSlash(podUrl) {
  return podUrl.split('/');
}

function fetchpods(url) {
  const options = {
    uri: url,
    //transform: body => cheerio.load(body)
  };

  return request(options);
}

app.listen(8000);
