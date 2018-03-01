const scrapingService = require('./itunes-scraping.service');
const express = require('express');
const request = require('request-promise');
const router = express.Router();
const fetch = require('node-fetch')
var fs = require('fs');
const mongoose = require('mongoose');
const podcastModel = mongoose.model('podcast');

module.exports = router;

router.route('/')
    .get(getListOfPodcasts);

router.route('/:id')
    .get( async (req,res) => {
        let podcast = await getSpecificPodcast(req.params.id);
        res.json(podcast);
    });

async function getListOfPodcasts(req, res) {
    try{
        console.log('Scraping...');
        const podcastList = await scrapingService.scrapingPodcasts();
        console.log('Scraping Complete');
        console.log('Fetching specific podcast...');
        const response = await request('https://itunes.apple.com/lookup?id=' + podcastList[0].id);
        console.log('Got specific podcaset data');
        const json = JSON.parse(response);
        const {collectionId, collectionName, artistName, feedUrl, artworkUrl100, genres} = json.results[0];
        console.log('Inserting result into database');
        const resultOfInsert = await podcastModel.create({
                feedUrl,
                genres,
                podcastId: collectionId, 
                podcastTitle: collectionName,
                artist: artistName,
                artworkUrl: artworkUrl100
            });
        res.send(resultOfInsert);
        return; 
    }catch(error){
        res.send(error.message);
    }
}

async function populateDB(listOfPodcasts){
    
    // return podcastModel.create({
    //     feedUrl,
    //     genres,
    //     podcastId: collectionId, 
    //     podcastTitle: collectionName,
    //     artist: artistName,
    //     artworkUrl: artworkUrl100
    // })
    // .catch((err, pod) => {
    //     console.log(err.message);
    // });
}
