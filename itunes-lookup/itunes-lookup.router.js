const scrapingService = require('./itunes-scraping.service');
const express = require('express');
const request = require('request-promise');
const router = express.Router();
const fetch = require('node-fetch')
//const mongoose = require('mongoose');
//const podcastModel = mongoose.model('podcast');

module.exports = router;

// router.route('/')
//     .get(getListOfPodcasts);

// async function getListOfPodcasts(req, res) {
//     try {
//         //console.log('Scraping...');
//         const podcastList = await scrapingService.scrapingPodcasts();
//         //console.log('Scraping Complete');
//         //console.log('Fetching specific podcast...');

//         const queryPomiseList = podcastList.slice(0, 3).map(requestPodcast);

//         const resultList = await Promise.all(queryPomiseList);
//         const objectList = resultList.map(result => {
//             const rawObject = JSON.parse(result);
//             return rawObject.results[0];
//         });

//         const upsertPromiseList = objectList.map(upsertPodcast);

//         const insertResults = await Promise.all(upsertPromiseList);

//         console.log(insertResults);
//         // We have all fetched data

        
//         res.send(insertResults);
         
//     }catch(error){
//         res.send(error.message);
//     }
// }

// function upsertPodcast(podcast) {
//     return podcastModel.findOneAndUpdate(
//         { podcastId: podcast.collectionId },
//         {
//             feedUrl: podcast.feedUrl,
//             genres: podcast.genres,
//             podcastTitle: podcast.collectionName,
//             artist: podcast.artistName,
//             artworkUrl: podcast.artworkUrl100
//             //lastUpdated: new Date()
//         },
//         {
//             upsert: true
//         }).exec();
// }

// function requestPodcast(podcast) {
//     return request(`https://itunes.apple.com/lookup?id=${podcast.id}`)
// }