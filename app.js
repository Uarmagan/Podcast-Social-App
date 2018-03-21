const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ParsedPodcasts');
require('./itunes-lookup/itunes-lookup.model');
require('./itunes-lookup/itunes-lookup.cron');




const podcastListsRouter = require('./itunes-lookup/itunes-lookup.router');

const app = express();

//app.use('/podcasts', podcastListsRouter);

const PORT = 8000;
app.listen(8000, (req,res) => {
  console.log("Server has started");
});
