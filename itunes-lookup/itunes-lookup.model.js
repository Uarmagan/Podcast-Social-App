const mongoose = require('mongoose');
const { Schema } = mongoose;

const podcastSchema = new Schema({
    podcastId:Number,
    podcastTitle: String,
    artist:String,
    feedUrl:String,
    artworkUrl:String,
    genres:[String],
    lastUpdated: { type: Date }
});

mongoose.model('podcast', podcastSchema);