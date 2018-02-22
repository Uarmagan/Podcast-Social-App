const scrapingService = require('./itunes-scraping.service');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
var fs = require('fs');

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
        const podcastList = await scrapingService.scrapingPodcasts();
        res.json(podcastList);
    }catch(error){
        res.send(error.message);
    }
}

function getSpecificPodcast(id){
    const url = 'https://itunes.apple.com/lookup?id='+id;
    const request = async () => {
        const response = await fetch(url);
        const json = await response.json();
        return json.results[0];
    }
    
    const podcastData = request();
    return podcastData;
}
