var cron = require('node-cron');
const mongoose = require('mongoose');
const podcastModel = mongoose.model('podcast');
const scrapingService = require('./itunes-scraping.service');
const request = require('request-promise');
const fetch = require('node-fetch');


//3rd day of every month
var task = cron.schedule('* * * * *', async function() {
    console.log('Started the Cron job');
    getListOfPodcasts();
    console.log('inserted');
    }, true);

module.export = task.start();

async function getListOfPodcasts(req, res) {
    try {
        //console.log('Scraping...');
        const podcastList = await scrapingService.scrapingPodcasts();
        //console.log('Scraping Complete');
        //console.log('Fetching specific podcast...');

        const queryPromiseList = podcastList.map(podcast => request(`https://itunes.apple.com/lookup?id=${podcast.id}`));

        const resultList = await Promise.all(queryPromiseList);
        const objectList = resultList.map( result => {
            const rawObject = JSON.parse(result);
            return rawObject.results[0];
        });

        const upsertPromiseList = objectList.map(podcast => {
            return podcastModel.findOneAndUpdate(
                { podcastId: podcast.collectionId },
                {
                    feedUrl: podcast.feedUrl,
                    genres: podcast.genres,
                    podcastTitle: podcast.collectionName,
                    artist: podcast.artistName,
                    artworkUrl: podcast.artworkUrl100,
                    lastUpdated: new Date()
                },
                {
                    upsert: true
                }).exec();
        });

        const insertResults = await Promise.all(upsertPromiseList);

        //console.log(insertResults);
        console.log('it worked');
        // We have all fetched data
    }catch(error){
        console.log(error.message);
    }
}