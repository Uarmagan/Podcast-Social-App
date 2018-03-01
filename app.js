const express = require('express');
const mongoose = require('mongoose');

require('./itunes-lookup/itunes-lookup.model');

mongoose.connect('mongodb://localhost/ParsedPodcasts');

const podcastListsRouter = require('./itunes-lookup/itunes-lookup.router');

const app = express();

app.use('/podcasts', podcastListsRouter);

const PORT = 8000;
app.listen(8000, (req,res) => {
  console.log("Server has started");
});
