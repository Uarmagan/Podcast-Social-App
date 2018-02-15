const scrapingService = require('./itunes-scraping.service');
const express = require('express');
const router = express.Router();

module.exports = router;

router.route('/')
    .get(getListOfPodcasts);

async function getListOfPodcasts(req, res) {
    try{
        const arr = await scrapingService.scrapingPodcasts();
        res.json(arr);
    }catch(error){
        res.send(error.message);
    }
}
