const mongoose = require("mongoose");

// Schema constructor
const Schema = mongoose.Schema;

const activityRecommendationSchema = new Schema({
    activityName: {
        type: String,
        require: true
    },
    activityDescription: {
        type: String,
        require: true
    },
    activityImage: {
        type: String,
        require: true
    },
    activityLink: {
        type: String,
        require: true
    }
});

// create destination schema
const DestinationSchema = new Schema({
    destinationId: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    activityRecommendations: [
        {
            type: activityRecommendationSchema
        }
    ]
}, { timestamps: true });

const Destination = mongoose.model('Destination', DestinationSchema);

module.exports = Destination;