const express = require('express');
const app = express();

const podcastListsRouter = require('./itunes-lookup/itunes-lookup.router');

app.use('/podcasts', podcastListsRouter);

const PORT = 8000;
app.listen(8000, (req,res) => {
  console.log("Server has started");
});
